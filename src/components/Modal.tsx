import { BooksContext, ModalTypes } from 'context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ImStarFull } from 'react-icons/im';
import styled from 'styled-components';
import { BookClub } from 'types';
import { ExistingPoll } from './Poll';
import { PreviouslyRead } from './PreviouslyRead';
import { Button } from './styled';

const ModalWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 999;
  position: fixed;
  filter: opacity(0.9);
  background-color: #68a0a6;
  top: 0;
  left: 0;
`;

const ModalContent = styled.div`
  min-height: 50vh;
  width: 50vw;
  text-align: center;
  margin: auto;
  margin-top: 2rem;
  border: 2px solid #183e4b;
  border-radius: 6px;
  background-color: #183e4b;
  color: white;
  padding: 1rem;
`;

const Join = () => {
  const { setIsModalVisible, setModalType } = useContext(BooksContext);
  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
  }
  return (
    <>
      <h1>Want to join this club? </h1>
      <h3>
        Pressing the submit button below will send a request to the club owner.
      </h3>
      <h3>The owner will need to accept your request to join this club. </h3>
      <h3>Happy reading!</h3>
      <Button onClick={closeModal}>
        {' '}
        <ImStarFull /> Send request{' '}
      </Button>
    </>
  );
};

const Vote = () => {
  const { clubs, updateClub, setIsModalVisible, setModalType } =
    useContext(BooksContext);
  const { query } = useRouter();

  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  const [poll, setPoll] = useState(selectedClub?.poll || []);
  console.log({ poll });
  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
  }

  const handleSubmitRating = () => {
    if (selectedClub && poll) {
      const updatedClub: BookClub = { ...selectedClub, poll };
      updateClub([updatedClub]);
      closeModal();
    }
  };

  return (
    <>
      <h1>Rate your previously read books:</h1>
      <h3>Click on a book to vote for it.</h3>
      <h3>You can only vote once per poll. </h3>
      <ExistingPoll books={poll} setNewPoll={setPoll} />
      <Button onClick={handleSubmitRating}>Submit</Button>
    </>
  );
};

const Rate = () => {
  const { clubs, updateClub, setIsModalVisible, setModalType } =
    useContext(BooksContext);
  const { query } = useRouter();

  const selectedClub = clubs.find((club) => {
    return club._id === query.id;
  });
  const [previouslyRead, setPreviouslyRead] = useState(
    selectedClub?.previouslyRead || []
  );

  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
  }

  const handleSubmitRating = () => {
    if (selectedClub && previouslyRead) {
      const updatedClub: BookClub = { ...selectedClub, previouslyRead };
      updateClub([updatedClub]);
      closeModal();
    }
  };

  return (
    <>
      <h1>Rate your previously read books:</h1>
      <h3>Click on a book to add a star to it's rating.</h3>
      <h3>You can only rate a book once. </h3>
      <PreviouslyRead
        books={previouslyRead}
        setPreviouslyRead={setPreviouslyRead}
      />
      <Button onClick={handleSubmitRating}>Submit</Button>
    </>
  );
};

export const Modal = () => {
  const { isModalVisible, setIsModalVisible, modalType, setModalType } =
    useContext(BooksContext);

  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
  }

  if (!isModalVisible) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <div className="clickable" onClick={closeModal}>
          X
        </div>
        {modalType === ModalTypes.JOIN && <Join />}
        {modalType === ModalTypes.RATE && <Rate />}
        {modalType === ModalTypes.VOTE && <Vote />}
      </ModalContent>
    </ModalWrapper>
  );
};
