import { MongoClient } from 'https://deno.land/x/mongo@v0.13.0/mod.ts';

import {
  DATABASE_CONNECTION_STRING,
  DATABASE_NAME,
} from '../configuration/index.ts';

export type { ObjectId } from './schemas/ObjectId.ts';
export type { Score } from './schemas/Score.schema.ts';

export const collections = {
  Score: 'Score',
};

class Database {
  public client: MongoClient;

  constructor() {
    this.client = {} as MongoClient;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(DATABASE_CONNECTION_STRING);
    this.client = client;
  }

  get database() {
    return this.client.database(DATABASE_NAME);
  }
};

const client = new Database();
client.connect();
export const { database } = client;
