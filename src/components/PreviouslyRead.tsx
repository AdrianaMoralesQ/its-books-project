import { Book } from 'types';
import { RatingsWrapper, Ratings } from './styled';
import { ImStarFull } from 'react-icons/im';
import { useState } from 'react';

type Props = {
  books: Book[];
  setPreviouslyRead?: any;
};

export const PreviouslyRead = ({ books, setPreviouslyRead }: Props) => {
  const [isLiked, setisLiked] = useState<string[]>([]);
  const handleClick = (book: Book) => {
    const booksWithModifiedRatings = books.map((oneBook) => {
      const isSameBook = oneBook._id === book._id;

      if (isSameBook && book.rating && !isLiked.includes(book._id)) {
        return {
          ...oneBook,
          rating: book.rating + 1
        };
      }
      return oneBook;
    });

    setPreviouslyRead(booksWithModifiedRatings);
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
              {book.rating} {''}
              <ImStarFull />
            </p>
          </Ratings>
        );
      })}
    </RatingsWrapper>
  );
};
