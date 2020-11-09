import type { ObjectId } from './ObjectId.ts';

// Score schema
export interface Score {
  _id: ObjectId;
  name: string;
  score: number;
  created: string;
  updated: string;
};
