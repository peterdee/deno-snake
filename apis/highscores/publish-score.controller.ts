import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { database, collections, Score } from '../../database/index.ts';
import response, { Response } from '../../utilities/response.ts';
import { RESPONSE_STATUSES, RESPONSE_MESSAGES } from '../../configuration/index.ts';

/**
 * Publish a highscore
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response|any> {
  try {
    // create a Score record
    const Score = database.collection<Score>(collections.Score);
    const now = `${Date.now()}`;
    await Score.insertOne({
      name: 'test',
      score: 3,
      created: now,
      updated: now,
    });

    // load 10 highscores
    const results = await Score.aggregate([
      {
        $sort: {
          score: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    return response(
      ctx,
      RESPONSE_STATUSES.ok,
      RESPONSE_MESSAGES.ok,
      results,
    );
  } catch (error) {
    return response(
      ctx,
      RESPONSE_STATUSES.internalServerError,
      RESPONSE_MESSAGES.internalServerError,
    );
  }
}
