import * as api from 'context/api';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { Book, BookClub, Response, User, UserID } from 'types';

const headers = { 'Content-Type': 'application/json' };

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
  //added:
  // setNewPoll: Book[];
  // newPoll: Book[];
  // books: Book[];
  //
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
  modalType: ModalTypes | undefined;
  setModalType: (type: ModalTypes | undefined) => void;
};

type BooksProviderProps = any;
export enum ModalTypes {
  JOIN = 'JOIN',
  RATE = 'RATE',
  VOTE = 'VOTE'
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
  // const [newPoll, setNewPoll] = useState<Book | null>();

  const { back, push } = useRouter();

  const selectedUserObject = users.find((user) => selectedUser === user._id);

  const getClubs = async () => {
    const res = await api.getClubs();
    if (res) {
      setClubs(res);
    }
    return res;
  };

  const deleteClub = async (clubsToDelete: api.DeleteProps) => {
    const res = await api.deleteClub(clubsToDelete);
    if (res) {
      await getClubs();
    }
  };

  const addClub = async (clubToAdd: api.AddProps) => {
    setIsLoading(true);
    const insertedID = await api.createBookClub(clubToAdd);
    if (insertedID) {
      await getClubs();
      setIsLoading(false);
      push(`club?id=${insertedID}`);
    }
  };

  async function getUsers() {
    const req = await fetch('/api/users');
    const { data }: Response<User[]> = await req.json();
    setUsers(data);
  }

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

  useEffect(() => {
    if (users?.length > 0) {
      setSelectedUser(users[4]._id);
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
