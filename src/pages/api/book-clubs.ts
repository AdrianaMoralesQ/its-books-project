// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ObjectId, OptionalId, WithId, InsertOneResult } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Errors } from 'server/errors';
import { mongoClient } from 'server/mongo';
import { isValidMethod } from 'server/utils';
import {
  Book,
  BookClub,
  MongoDeleteResponse,
  MongoResponse,
  MongoUpdateResponse
} from 'types';

export type DeleteClubsResponse = MongoDeleteResponse;
export type UpdateClubsResponse = MongoUpdateResponse;
export type DeleteClubsInput = BookClub[];
export type UpdateClubsInput = BookClub[];
export type AddBookClubInput = BookClub;
export type AddBookClubResponse = { data: InsertOneResult<WithId<BookClub>> };

export type Data =
  | MongoResponse<BookClub>
  | { error: string }
  | DeleteClubsResponse
  | UpdateClubsResponse
  | AddBookClubResponse;

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

  if (req.method === 'POST') {
    const { body: parsedBody }: { body: AddBookClubInput } = req;

    const { _id, ...orphanBook } = parsedBody;
    const { _id: __, ...bookToInsert } = orphanBook.currentlyReading;

    const newBookRes = await db
      .collection<OptionalId<Book>>('books')
      .insertOne(bookToInsert);

    const clubToInsert = { ...orphanBook, _id: newBookRes.insertedId };

    const dbRes = await db.collection<OptionalId<BookClub>>('clubs').insertOne({
      ...clubToInsert,
      currentlyReading: {
        ...orphanBook.currentlyReading,
        _id: newBookRes.insertedId
      }
    });
    newBookRes.insertedId;

    client.close();
    res.status(200).json({ data: dbRes });
  }

  if (req.method === 'PATCH') {
    const { body }: { body: BookClub[] } = req;
    const modifiedClubs = body;

    const result = await Promise.all(
      modifiedClubs.map((book) => {
        const { _id, ...rest } = book;
        return db
          .collection<WithId<BookClub[]>>('clubs')
          .updateOne({ _id: new ObjectId(book._id) }, { $set: { ...rest } });
      })
    );
    client.close();
    res.status(200).json({ data: result });
  }

  if (req.method === 'DELETE') {
    const { body: clubsToDelete }: { body: DeleteClubsInput } = req;

    const result = await Promise.all(
      clubsToDelete.map((club) => {
        return db.collection<WithId<BookClub[]>>('clubs').deleteMany({
          _id: new ObjectId(club._id)
        });
      })
    );
    client.close();
    res.status(200).json({ data: result });
  }

  if (req.method === 'GET') {
    const collection = await db
      .collection<BookClub[]>('clubs')
      .find({})
      .toArray();
    client.close();
    res.status(200).json({ data: collection });
  }
}
