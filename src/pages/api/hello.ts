// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mockBooks } from 'mockData/books';
import { OptionalId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Errors } from 'server/errors';
import { mongoClient } from 'server/mongo';
import { Book } from 'types';
import { randomNumberInRange } from 'utils';

type Data =
  | {
      data: {
        name: string;
      };
    }
  | { error: string };

let oneBook = mockBooks[randomNumberInRange(0, mockBooks.length - 1)];

const { _id, ...rest } = oneBook;

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

  if (db) {
    const collection = db.collection<OptionalId<Book[]>>('books');
    const dbRes = await collection.insertOne({ ...rest } as any);

    client.close();
    res.status(200).json({ data: dbRes as any });
  }
}
