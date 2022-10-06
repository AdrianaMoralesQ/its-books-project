// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ObjectId, WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Errors } from 'server/errors';
import { mongoClient } from 'server/mongo';
import { isValidMethod } from 'server/utils';
import {
  Book,
  MongoDeleteResponse,
  MongoResponse,
  MongoUpdateResponse
} from 'types';

export type DeleteBooksResponse = MongoDeleteResponse;
export type UpdateBooksResponse = MongoUpdateResponse;
export type DeleteBooksInput = Book[];
export type UpdateBooksInput = Book[];

export type Data =
  | MongoResponse<Book>
  | { error: string }
  | DeleteBooksResponse
  | UpdateBooksResponse;

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
  const { client, db } = cl;

  if (req.method === 'PATCH') {
    const { body }: { body: Book[] } = req;
    const modifiedBooks = body;

    const result = await Promise.all(
      modifiedBooks.map((book) => {
        const { _id, ...rest } = book;
        return db
          .collection<WithId<Book[]>>('books')
          .updateOne({ _id: new ObjectId(book._id) }, { $set: { ...rest } });
      })
    );

    client.close();
    res.status(200).json({ data: result });
    return;
  }

  if (req.method === 'DELETE') {
    const { body }: { body: DeleteBooksInput } = req;
    const booksToDelete = body.map((book) => ({ ...book, rating: 10 }));

    const result = await Promise.all(
      booksToDelete.map((book) => {
        return db
          .collection<WithId<Book[]>>('books')
          .deleteMany({ _id: new ObjectId(book._id) });
      })
    );

    client.close();
    res.status(200).json({ data: result });
    return;
  }

  if (req.method === 'GET') {
    const collection = await db.collection<Book[]>('books').find({}).toArray();
    client.close();
    res.status(200).json({ data: collection });
  }
}
