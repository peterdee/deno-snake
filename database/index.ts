import { load } from 'https://deno.land/x/denv/mod.ts';
await load('.env');

import { MongoClient } from 'https://deno.land/x/mongo@v0.13.0/mod.ts';

import { Environment } from '../configuration/types.ts';

export type { ObjectId } from './schemas/ObjectId.ts';
export type { Score } from './schemas/Score.schema.ts';

export const collections = {
  Score: 'Score',
};

const environment: Environment = Deno.env.toObject();

class Database {
  public client: MongoClient;

  constructor() {
    this.client = {} as MongoClient;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(environment.DATABASE_CONNECTION_STRING);
    this.client = client;
  }

  get database() {
    return this.client.database(environment.DATABASE_NAME);
  }
};

const client = new Database();
client.connect();
export const { database } = client;
