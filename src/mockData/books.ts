import { Book, BookClub, User, UserID } from 'types';
import { generateArrayOfObjects, randomNumberInRange } from 'utils';
import { faker } from '@faker-js/faker';

const MEMBERS_TO_GENERATE_PER_CLUB = 5;
const BOOKS_TO_GENERATE = 50;
const USERS_TO_GENERATE = 50;

export const mockBooks: Book[] = generateArrayOfObjects<Book>(
  BOOKS_TO_GENERATE,
  (i) => ({
    _id: i.toString(),
    name: `The book of ${faker.commerce.product()}`,
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    rating: randomNumberInRange(1, 10),
    votes: randomNumberInRange(1, 5)
  })
);

export const mockUsers: User[] = generateArrayOfObjects<User>(
  USERS_TO_GENERATE,
  (i) => ({
    _id: i.toString(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    bookClubs: []
  })
);

const generateMembers = () =>
  Object.values(
    generateArrayOfObjects<{ id: number }>(
      MEMBERS_TO_GENERATE_PER_CLUB,
      () => ({
        id: randomNumberInRange(0, USERS_TO_GENERATE)
      })
    ).map((d) => d.id.toString())
  );

export const mockBookClubs: BookClub[] = generateArrayOfObjects<BookClub>(
  BOOKS_TO_GENERATE,
  (i) => ({
    _id: i.toString(),
    name: `The ${faker.word.adjective()} club`,
    currentlyReading: mockBooks[i],
    poll: null,
    previouslyRead: [...mockBooks.slice(0, 5)],
    members: [i.toString(), ...generateMembers()],
    owner: i.toString()
  })
);
