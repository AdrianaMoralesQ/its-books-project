import { ImStarFull } from 'react-icons/im';
import { BookClub } from 'types';
import { Banner, Button, PinkWrapper, Title } from './styled';
import { useRouter } from 'next/router';
import { getUsersByIDArray, isMember, isOwner } from 'utils';
import { BooksContext, ModalTypes } from 'context';
import { useContext } from 'react';
import { MemberNames } from './Members';

/*
This is the Book Club component
it takes props ([bookClubs]) which is an array of the BookClub object.
 */
type BookClubProps = {
  bookClubs: BookClub[];
  isOwner?: boolean;
  isMember?: boolean;
};
/* Book clubs component maps over book clubs */
export const BookClubs = ({ bookClubs }: BookClubProps) => {
  const { push, query } = useRouter();
  const {
    users,
    selectedUser,
    selectedUserObject,
    clubs,
    deleteClub,
    setIsModalVisible,
    setModalType
  } = useContext(BooksContext);

  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  const isAMember = (members: string[]) => {
    return members.includes(selectedUser);
  };

  const isOwned = isOwner(selectedUserObject, selectedClub);

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
          {isAMember(club.members) ||
            (isOwned && (
              <>
                <h3>Members : </h3>
                <MemberNames members={getUsersByIDArray(users, club.members)} />
              </>
            ))}
          <Banner>
            {!isAMember(club.members) && (
              <Button
                onClick={() => {
                  setModalType(ModalTypes.JOIN);
                  setIsModalVisible(true);
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
