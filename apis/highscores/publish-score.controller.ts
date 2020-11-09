import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { collections, database } from '../../database/index.ts';
import response, { Response } from '../../utilities/response.ts';

/**
 * Publish a highscore
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response|any> {
  try {
    // create a Score record
    const Score = database.collection(collections.Score);
    const now = `${Date.now()}`;
    await Score.insertOne({
      name: 'test',
      score: 1,
      created: now,
      updated: now,
    });

    const results = await Score.find({});

    return response(ctx, 200, 'OK', results);
  } catch (error) {
    console.log(error);
    return response(
      ctx,
      500,
      'INTERNAL_SERVER_ERROR',
    );
  }
}
