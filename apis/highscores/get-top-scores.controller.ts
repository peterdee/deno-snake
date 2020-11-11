import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { database, collections, Score } from '../../database/index.ts';
import response, { Response } from '../../utilities/response.ts';
import { RESPONSE_STATUSES, RESPONSE_MESSAGES } from '../../configuration/index.ts';

/**
 * Get highscores
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response | any> {
  try {
    // get Score records
    const Score = database.collection<Score>(collections.Score);
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
