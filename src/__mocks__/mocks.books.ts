import { Book, BookClub, User } from 'types';

export const mockBookOne: Book = {
  _id: '1',
  name: 'The Book',
  author: 'The Author',
  rating: 10,
  votes: 2
};
export const mockBookTwo: Book = {
  _id: '2',
  name: 'Second book',
  author: 'The Author',
  rating: 10,
  votes: 2
};
export const mockBookThree: Book = {
  _id: '3',
  name: 'Third book',
  author: 'The Author',
  rating: 10,
  votes: 2
};

export const mockBookClub: BookClub = {
  _id: '1',
  name: 'The Book Club',
  members: ['1', '2', '3'],
  previouslyRead: [mockBookOne],
  currentlyReading: {
    ...mockBookTwo
  },
  poll: null,
  owner: ''
};

export const mockUser: User = {
  _id: '1',
  name: 'Kitty kittens',
  bookClubs: []
};
