import { addBookClubToClubs, isMember, isOwner } from '../utils';
import { Book, BookClub } from '../types/index';
import {
  mockBookClub,
  mockBookOne,
  mockBookThree,
  mockUser
} from '../__mocks__/mocks.books';
import { BookClubID } from './../types/index';

function addBookToCurrentlyReading(club: BookClub, book: Book): BookClub {
  return {
    ...club,
    currentlyReading: book
  };
}

describe('addBookToCurrentlyReading', () => {
  it('should add to currently reading', async () => {
    const expected = {
      _id: '1',
      name: 'The Book Club',
      members: ['1', '2', '3'],
      previouslyRead: [mockBookOne],
      currentlyReading: {
        ...mockBookThree
      },
      poll: null,
      owner: ''
    };

    const result = addBookToCurrentlyReading(mockBookClub, mockBookThree);
    expect(result).toEqual(expected);
  });
});

const addUserToBookClub = (userID: string, club: BookClub) => {
  return { ...club, members: [...club.members, userID] };
};

describe('addUserToBookClub', () => {
  it('should add to currently reading', async () => {
    const expected = {
      ...mockBookClub,
      members: [...mockBookClub.members, '4']
    };

    const result = addUserToBookClub('4', mockBookClub);
    expect(result).toEqual(expected);
  });
});

describe('addBookClubToClubs', () => {
  it('should add to array of clubs', async () => {
    const expected = [mockBookClub, mockBookClub];
    const result = addBookClubToClubs([mockBookClub], mockBookClub);
    expect(result).toEqual(expected);
  });
});

const updateBookClubByID = (
  club: BookClub[],
  clubID: BookClubID,
  modifiedClub: BookClub
) => club.map((club) => (club._id === clubID ? modifiedClub : club));

describe('updateBookClubByID', () => {
  it('should update book club by id', async () => {
    const mockSecondClub = { ...mockBookClub, _id: '2' };
    const mockUpdatedClub = { ...mockSecondClub, name: 'The Book Club 2' };
    const expected = [mockBookClub, { ...mockUpdatedClub }];
    const result = updateBookClubByID(
      [mockBookClub, mockSecondClub],
      '2',
      mockUpdatedClub
    );
    expect(result).toEqual(expected);
  });
});

const removeClubById = (clubs: BookClub[], clubID: BookClubID) =>
  clubs.filter((club) => club._id !== clubID);

describe('removeClubById', () => {
  it('should remove book club by id', async () => {
    const mockSecondClub = { ...mockBookClub, _id: '2' };
    const expected = [mockBookClub];
    const result = removeClubById([mockBookClub, mockSecondClub], '2');
    expect(result).toEqual(expected);
  });
});

describe('isOwner', () => {
  it('should return true if user is owner', async () => {
    const result = isOwner(mockUser, { ...mockBookClub, owner: '1' });
    expect(result).toEqual(true);
  });
  it('should return false if user is not owner', async () => {
    const result = isOwner(mockUser, { ...mockBookClub, owner: '2' });
    expect(result).toEqual(false);
  });
});

describe('isMember', () => {
  it('should return true if user is member', async () => {
    const result = isMember(mockUser, { ...mockBookClub, members: ['1'] });
    expect(result).toEqual(true);
  });
  it('should return false if user is not member', async () => {
    const result = isMember(mockUser, { ...mockBookClub, members: ['2'] });
    expect(result).toEqual(false);
  });
});
