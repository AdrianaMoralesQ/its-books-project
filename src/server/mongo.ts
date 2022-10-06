import { MongoClient } from 'mongodb';

const mongoURL = process.env.MONGODB || '';

export const mongoClient = async () => {
  try {
    const connection = new MongoClient(mongoURL);
    const client = await new MongoClient(mongoURL).connect();
    return { db: client.db('itsbooks'), client, connection };
  } catch (error) {
    console.error('error getting database', error);
  }
};
