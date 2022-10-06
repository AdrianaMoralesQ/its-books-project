import { Loading } from 'components/Loading';
import { MemberNames } from 'components/Members';
import { ExistingPoll } from 'components/Poll';
import { PreviouslyRead } from 'components/PreviouslyRead';
import {
  BlueWrapper,
  Button,
  Content,
  Currently,
  Header,
  PinkWrapper,
  Title,
  Wrapper
} from 'components/styled';
import { BooksContext, ModalTypes } from 'context';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ImPencil } from 'react-icons/im';
import { getUsersByIDArray, isMember, isOwner } from 'utils';
import { useUser } from '@auth0/nextjs-auth0';
import { Book } from 'types';

const Club = () => {
  const {
    clubs,
    users,
    selectedUserObject,
    setSelectedClub,
    setIsModalVisible,
    setModalType
  } = useContext(BooksContext);
  const { push, query } = useRouter();

  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  setSelectedClub(selectedClub);

  const isOwned = isOwner(selectedUserObject, selectedClub);

  const isAMember = isMember(selectedUserObject, selectedClub);

  // console.log({ isAMember, isOwned, selectedClub, selectedUserObject });
  const handleEditClub = () => {
    push('/create?isEditing=true');
  };
  const { user } = useUser();
  const handlePoll = () => {
    push('/poll');
  };
  if (!selectedClub) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Header>
        <h1>{selectedClub.name}</h1>
        {/* {isOwned && ( */}
        <Button onClick={handleEditClub}>
          <ImPencil /> Edit
        </Button>
        {/* )} */}
        {/* {isAMember ||
          (isOwned && ( */}
        <>
          <h2>
            Owner: {getUsersByIDArray(users, [selectedClub.owner])[0].name}
          </h2>
          <h2>Members:</h2>
          <MemberNames
            members={getUsersByIDArray(users, selectedClub.members)}
          />
        </>
        {/* ))} */}
        <Currently>
          <h3>
            Currently reading:{' '}
            <Title>{selectedClub.currentlyReading.name}</Title> by{' '}
            {selectedClub.currentlyReading.author}
          </h3>
        </Currently>
      </Header>
      <Content>
        <PinkWrapper>
          <h3>Poll:</h3>
          <ExistingPoll books={selectedClub.poll || []} />
          {/* {isAMember ||
            (isOwned && ( */}
          <>
            <Button
              onClick={() => {
                setModalType(ModalTypes.VOTE);
                setIsModalVisible(true);
              }}
            >
              Vote
            </Button>
            <Button onClick={handlePoll}>New Poll</Button>
          </>
          {/* // ))} */}
        </PinkWrapper>
        <BlueWrapper>
          <h3>Previously read:</h3>
          <PreviouslyRead books={selectedClub.previouslyRead} />
          {/* {isAMember ||
            (isOwned && ( */}
          <Button
            onClick={() => {
              setModalType(ModalTypes.RATE);
              setIsModalVisible(true);
            }}
          >
            Rate them!
          </Button>
          {/* ))} */}
        </BlueWrapper>
      </Content>
    </Wrapper>
  );
};

export default Club;
function setIsModalVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}
