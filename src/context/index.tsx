import { useUser } from '@auth0/nextjs-auth0';
import * as api from 'context/api';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { Book, BookClub, Response, User, UserID } from 'types';

const headers = { 'Content-Type': 'application/json' };
// Books content contains all relevant data, props and states called throughout app.
type BooksContextData = {
  updateClub: (club: api.UpdateProps) => void;
  addClub: (club: api.AddProps) => void;
  deleteClub: (club: api.DeleteProps) => void;
  clubs: BookClub[];
  isLoading: boolean;
  users: User[];
  selectedUser: UserID;
  selectedUserObject: User | undefined;
  selectedClub: BookClub | null;
  setSelectedClub: any;
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
  modalType: ModalTypes | undefined;
  setModalType: (type: ModalTypes | undefined) => void;
};
// exports types of Modals for Modals
type BooksProviderProps = any;
export enum ModalTypes {
  JOIN = 'JOIN',
  RATE = 'RATE',
  VOTE = 'VOTE',
  VISIT = 'VISIT'
}
export const BooksContext = createContext({} as BooksContextData);

export function BooksProvider({ children }: BooksProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState<BookClub[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalTypes | undefined>();
  const [selectedUser, setSelectedUser] = useState<UserID>('4');
  const [selectedClub, setSelectedClub] = useState<BookClub | null>(null);
  const { user } = useUser();

  // For Auth0 to work. Checks if exisiting user/else creates new user.
  useEffect(() => {
    if (user && users.length > 0) {
      const userExists = users.find(
        (userFromList) => userFromList.name === user.name
      );
      if (!userExists && user.name) {
        createUser({
          name: user.name,
          bookClubs: []
        });
      }
    }
  }, [user, users]);
  // to be called to go back or push to specific url
  const { back, push } = useRouter();
  // provides specific user by filtering out selected user from users[]
  const selectedUserObject = users.find((user) => selectedUser === user._id);
  // fetches clubs
  const getClubs = async () => {
    const res = await api.getClubs();
    if (res) {
      setClubs(res);
    }
    return res;
  };
  // deletes club from DB
  const deleteClub = async (clubsToDelete: api.DeleteProps) => {
    const res = await api.deleteClub(clubsToDelete);
    if (res) {
      await getClubs();
    }
  };
  // adds club to db
  const addClub = async (clubToAdd: api.AddProps) => {
    setIsLoading(true);
    const insertedID = await api.createBookClub(clubToAdd);
    if (insertedID) {
      await getClubs();
      setIsLoading(false);
      push(`club?id=${insertedID}`);
    }
  };
  // gets users from DB
  async function getUsers() {
    const req = await fetch('/api/users');
    const { data }: Response<User[]> = await req.json();
    setUsers(data);
  }
  // creates new user and POSTs to DB
  async function createUser(user: User) {
    const req = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers
    });
    const { data }: Response<User[]> = await req.json();
    setUsers(data);
  }
  // updates clubs and updates using api handler(PATCH)
  async function updateClub(clubs: api.UpdateProps) {
    setIsLoading(true);
    const res = await api.updateBookClub(clubs);
    if (res) {
      await getClubs();
      setIsLoading(false);
      back();
    }
  }

  useEffect(() => {
    getUsers();
    getClubs();
  }, []);
  // for logged in User, takes Auth0 user and makes this specific user profile.
  useEffect(() => {
    if (users?.length > 0 && user) {
      const userExists = users.find(
        (userFromList) => userFromList.name === user.name
      );
      // for demo
      setSelectedUser(users[4]._id);
      // setSelectedUser(userExists ? userExists._id : users[4]._id);
      //
    }
  }, [users]);

  return (
    <BooksContext.Provider
      value={{
        clubs,
        updateClub,
        addClub,
        deleteClub,
        users,
        selectedUser,
        selectedUserObject,
        isLoading,
        selectedClub,
        setSelectedClub,
        setIsModalVisible,
        isModalVisible,
        modalType,
        setModalType
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
