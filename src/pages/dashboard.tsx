import { BookClubs } from 'components/BookClubs';
import {
  ClubWrapper,
  Header,
  Wrapper,
  Button,
  AllClubs
} from 'components/styled';
import { BooksContext } from 'context';
import { ImPlus } from 'react-icons/im';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const Dashboard = () => {
  const {
    selectedUser,
    selectedUserObject,
    clubs: bookClubs
  } = useContext(BooksContext);

  const { push } = useRouter();

  const bookClubsIOwn = bookClubs.filter(
    //  returns where the owner and my id match
    (bookClub) => bookClub.owner === selectedUser
  );
  const bookClubsIBelongTo = bookClubs.filter(
    //  returns where the owner and my id match
    (bookClub) => bookClub.members.includes(selectedUser)
  );
  // returns when the club matches my id
  const allTheOthers = bookClubs.filter(
    (club) => !club.members.includes(selectedUser)
  );
  // Auth0 user
  const { user } = useUser();
  // takes you to create page
  const handleCreateClub = () => {
    push('/create');
  };
  // if not logged in asks user to login
  if (!selectedUserObject) return <div>please log in</div>;

  return (
    <Wrapper>
      <Header>
        {/* <h1>Hi, {selectedUserObject?.name}!</h1> */}
        <h1>Hi {user?.name}!</h1>
        <h2>{`Welcome to your dashboard. Happy reading!`}</h2>
        <Button onClick={handleCreateClub}>
          <ImPlus /> Create a Club
        </Button>
      </Header>
      <AllClubs>
        <ClubWrapper>
          <h2>Your book clubs: {bookClubsIOwn.length}</h2>
          <BookClubs bookClubs={bookClubsIOwn} />
        </ClubWrapper>
        <ClubWrapper>
          <h2>Clubs you belong to: {bookClubsIBelongTo.length}</h2>
          <BookClubs bookClubs={bookClubsIBelongTo} />
        </ClubWrapper>
        <ClubWrapper>
          <h2>Other book clubs: {allTheOthers.length}</h2>
          <BookClubs bookClubs={allTheOthers} />
        </ClubWrapper>
      </AllClubs>
    </Wrapper>
  );
};
export default Dashboard;
