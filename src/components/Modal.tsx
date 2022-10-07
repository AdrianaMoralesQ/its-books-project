import { BooksContext, ModalTypes } from 'context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ImStarFull } from 'react-icons/im';
import styled from 'styled-components';
import { BookClub } from 'types';
import { ExistingPoll } from './Poll';
import { PreviouslyRead } from './PreviouslyRead';
import {
  Account,
  Button,
  Features,
  List,
  ModalContent,
  ModalWrapper
} from './styled';

const Join = () => {
  const {
    setIsModalVisible,
    setModalType,
    updateClub,
    selectedClub,
    selectedUser
  } = useContext(BooksContext);
  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
    if (selectedClub) {
      const updatedClub: BookClub = {
        ...selectedClub,
        members: [...selectedClub.members, selectedUser]
      };
      updateClub([updatedClub] as BookClub[]);
    }
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

const Visit = () => {
  const { setIsModalVisible, setModalType } = useContext(BooksContext);
  function closeModal() {
    setModalType(undefined);
    setIsModalVisible(false);
  }
  const { push, query } = useRouter();

  const handleVisit = () => {
    push('/dashboard');
    closeModal();
  };
  return (
    <>
      <h1>Welcome to it's books! </h1>
      <h3>
        You can view a limited version of our site if you're not logged in,
      </h3>
      <h3>but you will need to create an account to unlock all features.</h3>
      <p>
        It's Books! is a virtual platform that allows you to create and join
        book clubs.
      </p>
      <p>
        From the Dashboard you'll be able to navigate to the different clubs by
        clicking on them!
      </p>
      <p>
        By navigating to a specific club, you'll be able to see what they're
        reading,
      </p>
      <p>and how they rated previously read books!</p>
      <Features>
        <Account>
          <h3> If you create an account with us you'll be able to:</h3>
        </Account>
        <p>Create your own Book Clubs and invite your friends!</p>
        <p>Rate your previously read books!</p>
        <p>Vote and suggest which books your club will read next!</p>
        <p>Edit the Book Clubs you own!</p>
      </Features>
      <Button onClick={handleVisit}>Continue as Visitor</Button>
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
        {modalType === ModalTypes.VISIT && <Visit />}
      </ModalContent>
    </ModalWrapper>
  );
};
