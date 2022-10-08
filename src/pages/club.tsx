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
import { useContext, useState } from 'react';
import { ImPencil } from 'react-icons/im';
import { getUsersByIDArray, isMember, isOwner } from 'utils';
import { useUser } from '@auth0/nextjs-auth0';
import { Book } from 'types';
// Renders Club page
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
  const [canVote, setCanVote] = useState(true);
  // finds and sets specific club using query
  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  setSelectedClub(selectedClub);
  // will filter if club is owned
  const isOwned = isOwner(selectedUserObject, selectedClub);
  // will filter is member does not own, aka is just member of club
  const isAMember = isMember(selectedUserObject, selectedClub);
  // closes poll modal, and changes status of can vote so user cannot vote.
  const handleClose = () => {
    setCanVote(false);
  };
  // navigates to create (form) but changes params to "editing" so club owner can edit selected club, not create new one.
  const handleEditClub = () => {
    push('/create?isEditing=true');
  };
  const { user } = useUser();
  // navigates to poll component
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
        {isOwned && (
          <Button onClick={handleEditClub}>
            <ImPencil /> Edit
          </Button>
        )}
        {isAMember && (
          <>
            {/* <h2>
              Owner: {getUsersByIDArray(users, [selectedClub.owner])[0].name}
            </h2> */}
            <h2>Members:</h2>
            <MemberNames
              members={getUsersByIDArray(users, selectedClub.members)}
            />
          </>
        )}
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
          {isAMember && (
            <>
              <Button
                disabled={!canVote}
                onClick={() => {
                  setModalType(ModalTypes.VOTE);
                  setIsModalVisible(true);
                }}
              >
                Vote
              </Button>
            </>
          )}
          {isOwned && <Button onClick={handlePoll}>New Poll</Button>}
          {isOwned && <Button onClick={handleClose}>Close</Button>}
        </PinkWrapper>
        <BlueWrapper>
          <h3>Previously read:</h3>
          <PreviouslyRead books={selectedClub.previouslyRead} />
          {isAMember ||
            (isOwned && (
              <Button
                onClick={() => {
                  setModalType(ModalTypes.RATE);
                  setIsModalVisible(true);
                }}
              >
                Rate them!
              </Button>
            ))}
        </BlueWrapper>
      </Content>
    </Wrapper>
  );
};

export default Club;
