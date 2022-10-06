import { BookClub, User, UserID } from 'types';

export const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateArrayOfObjects = <T>(
  length: number,
  generator: (index: number) => T
): T[] => {
  const array: T[] = [];

  for (let i = 0; i < length; i++) {
    array.push(generator(i));
  }

  return array;
};

export function addBookClubToClubs(
  clubs: BookClub[],
  club: BookClub
): BookClub[] {
  return [...clubs, club];
}

export function getUsersByIDArray(users: User[], userIDs: UserID[]): User[] {
  const filteredUsers = users.filter((user) => {
    if (userIDs.includes(user._id)) {
      return true;
    }
    return false;
  });
  return filteredUsers;
}

export function isOwner(selectedUser?: User, club?: BookClub): boolean {
  if (!selectedUser || !club) return false;
  if (selectedUser._id === club.owner) return true;
  return false;
}

export function isMember(selectedUser?: User, club?: BookClub): boolean {
  if (!selectedUser || !club) return false;
  if (club.members.includes(selectedUser._id)) return true;
  return false;
}
