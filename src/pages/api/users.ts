// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mockUsers } from 'mockData/books';
import { ObjectId, OptionalId, WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Errors } from 'server/errors';
import { mongoClient } from 'server/mongo';
import { isValidMethod } from 'server/utils';
import {
  Book,
  MongoDeleteResponse,
  MongoResponse,
  MongoUpdateResponse,
  User
} from 'types';

export type Data =
  | MongoResponse<User>
  | { error: string }
  | MongoDeleteResponse
  | MongoUpdateResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!isValidMethod(req.method)) {
    res.status(405).json({ error: Errors.METHOD_NOT_ALLOWED });
    return;
  }

  const cl = await mongoClient();

  if (!cl) {
    res.status(500).json({ ...Errors.mongo });
    return;
  }
  const { client, connection, db } = cl;

  if (!db || !client || !connection) {
    res.status(500).json({ ...Errors.mongo });
    return;
  }

  if (req.method === 'POST') {
    const { body: parsedBody }: { body: User } = req;
    const dbRes = await db
      .collection<OptionalId<User>>('users')
      .insertOne(parsedBody);

    client.close();
    res.status(200).json({ data: dbRes });
    return;
  }
  if (req.method === 'DELETE') {
    const { body: parsedBody }: { body: User } = req;
    const dbRes = await db
      .collection<WithId<User[]>>('users')
      .deleteOne({ _id: new ObjectId(parsedBody._id) });

    client.close();
    res.status(200).json({ data: dbRes });
    return;
  }
  if (req.method === 'GET') {
    const collection = await db.collection<User[]>('users').find({}).toArray();
    client.close();
    res.status(200).json({ data: collection });
    return;
  }
}
