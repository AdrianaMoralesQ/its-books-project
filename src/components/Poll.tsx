import { Book } from 'types';
import { RatingsWrapper, Ratings } from './styled';
import { ImStarFull } from 'react-icons/im';
import { useState } from 'react';

type Props = {
  books: Book[];
  setNewPoll?: any;
};

export const ExistingPoll = ({ books, setNewPoll }: Props) => {
  const [isLiked, setisLiked] = useState<string[]>([]);
  const handleClick = (book: Book) => {
    const booksWithModifiedVotes = books.map((oneBook) => {
      const isSameBook = oneBook._id === book._id;

      if (isSameBook && book.votes && !isLiked.includes(book._id)) {
        return {
          ...oneBook,
          votes: book.votes + 1
        };
      }
      return oneBook;
    });

    setNewPoll(booksWithModifiedVotes);
    setisLiked([...isLiked, book._id]);
  };

  return (
    <RatingsWrapper>
      {books.map((book) => {
        return (
          <Ratings
            onClick={() => {
              handleClick(book);
            }}
          >
            <p>{book.name} </p>
            <p>
              {book.votes} {''}
              <ImStarFull />
            </p>
          </Ratings>
        );
      })}
    </RatingsWrapper>
  );
};
