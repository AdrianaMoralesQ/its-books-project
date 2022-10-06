import { DeleteResult, UpdateResult, WithId, Document } from 'mongodb';

export type MongoResponse<T> = {
  data: WithId<T[]>[];
};

export type ParamsFrom<T extends (...args: any) => any> = Parameters<T>; // [string, number]

export type MongoDeleteResponse = {
  data: Document | DeleteResult[];
};
export type MongoUpdateResponse = {
  data: UpdateResult[];
};
export type Response<T> = {
  data: T;
};
export type UserID = string;
export type BookClubID = string;

export type Book = {
  _id: string;
  name: string;
  author?: string;
  rating?: number;
  votes?: number;
};

export type BookClub = {
  _id: string;
  name: string;
  currentlyReading: Book;
  poll: Book[] | null;
  previouslyRead: Book[];
  members: UserID[];
  owner: UserID;
};

export type User = {
  _id: string;
  name: string;
  bookClubs?: BookClubID[];
};
export type FormEvent<T> = {
  event: T;
};
