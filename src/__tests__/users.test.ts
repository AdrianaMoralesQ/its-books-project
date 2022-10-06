import { faker } from '@faker-js/faker';
import { User } from 'types';
import { generateArrayOfObjects, getUsersByIDArray } from '../utils';

export const mockUsers: User[] = generateArrayOfObjects<User>(3, (i) => ({
  _id: i.toString(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  bookClubs: []
}));

describe('getUsersByIDArray', () => {
  it('should return an array of users from array of userIDs', async () => {
    const expected = mockUsers.filter((u) => ['1', '2'].includes(u._id));

    const result = getUsersByIDArray(mockUsers, ['1', '2']);
    expect(result).toEqual(expected);
  });
});
