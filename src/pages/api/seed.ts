// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mockBookClubs, mockBooks, mockUsers } from 'mockData/books';
import { OptionalId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Errors } from 'server/errors';
import { mongoClient } from 'server/mongo';
import { Book, MongoResponse, User } from 'types';

type Data = MongoResponse<Book> | { error: string };

const books = mockBooks.map((b) => {
  const { _id, ...rest } = b;
  return rest;
});
const bookClubs = mockBookClubs.map((b) => {
  const { _id, ...rest } = b;
  return rest;
});
const users = mockUsers.map((b) => {
  const { _id, ...rest } = b;
  return rest;
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cl = await mongoClient();

  if (!cl) {
    res.status(500).json({ ...Errors.mongo });
    return;
  }
  const { client, db } = cl;

  const { query } = req;

  if (db && query.type === 'books') {
    const collection = db.collection<OptionalId<Book>>('books');
    const dbRes = await collection.insertMany(books);

    client.close();
    res.status(200).json({ data: dbRes as any });
    return;
  }
  if (db && query.type === 'clubs') {
    const collection = db.collection<OptionalId<Book>>('clubs');
    const dbRes = await collection.insertMany(bookClubs);
    client.close();
    res.status(200).json({ data: dbRes as any });
    return;
  }
  if (db && query.type === 'users') {
    const collection = db.collection<OptionalId<User>>('users');
    const dbRes = await collection.insertMany(users);
    client.close();
    res.status(200).json({ data: dbRes as any });
    return;
  }
  client.close();
  res.status(404).json({ error: 'No valid type specified' });
}
