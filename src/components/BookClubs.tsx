import { ImStarFull } from 'react-icons/im';
import { BookClub } from 'types';
import { Banner, Button, PinkWrapper, Title } from './styled';
import { useRouter } from 'next/router';
import { getUsersByIDArray, isMember, isOwner } from 'utils';
import { BooksContext, ModalTypes } from 'context';
import { useContext } from 'react';
import { MemberNames } from './Members';

// This is the Book Club component.
// it takes props ([bookClubs]) which is an array of the BookClub object.

type BookClubProps = {
  bookClubs: BookClub[];
  isOwner?: boolean;
  isMember?: boolean;
};
// Book clubs component maps over book clubs
export const BookClubs = ({ bookClubs }: BookClubProps) => {
  const { push, query } = useRouter();
  const {
    users,
    selectedUser,
    selectedUserObject,
    clubs,
    deleteClub,
    setIsModalVisible,
    setModalType,
    setSelectedClub
  } = useContext(BooksContext);
  // finds a specific club using query

  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  // checks if specific user is part of the array of members.
  // Is used to filter what members vs.what owners and non - logged in users can view.
  const isAMember = (members: string[]) => {
    return members.includes(selectedUser);
  };
  // checks if selected user is owner of club.
  // Is used to filter what members vs.what owners and non - logged in users can view.
  const isOwned = isOwner(selectedUserObject, selectedClub);
  // navigates to specific club based on id
  const handleNavigateToClub = (id: string) => {
    push(`/club?id=${id}`);
  };

  return (
    <div>
      {bookClubs.map((club, i) => (
        <PinkWrapper key={`tamal-color${i}`}>
          <h3
            className="clickable"
            onClick={() => handleNavigateToClub(club._id)}
          >
            {club.name}
          </h3>
          <p>
            Currently reading: <Title> {club.currentlyReading.name}</Title> by{' '}
            {club.currentlyReading.author}
          </p>
          {isAMember(club.members) && (
            <>
              <h3>Members : </h3>
              <MemberNames members={getUsersByIDArray(users, club.members)} />
            </>
          )}
          <Banner>
            {!isAMember(club.members) && (
              <Button
                onClick={() => {
                  setModalType(ModalTypes.JOIN);
                  setIsModalVisible(true);
                  setSelectedClub(club);
                }}
              >
                <ImStarFull /> Join
              </Button>
            )}
            {isOwned && (
              <Button onClick={() => deleteClub([club])}>Delete</Button>
            )}
          </Banner>
        </PinkWrapper>
      ))}
    </div>
  );
};
