import { helpers, RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { database, collections, Score } from '../../database/index.ts';
import response, { Response } from '../../utilities/response.ts';
import { RESPONSE_STATUSES, RESPONSE_MESSAGES } from '../../configuration/index.ts';

/**
 * Check if highscore is in Top-10
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response | any> {
  try {
    // check the data
    const query = helpers.getQuery(ctx);
    if (!(query && query.score)) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.missingData,
      );
    }
    if (Number.isNaN(Number(query.score))) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.invalidData,
      );
    }

    // check score value
    if (Number(query.score) > 2500) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.invalidData,
      );
    }

    // get a Score record that skips the first 9
    const Score = database.collection<Score>(collections.Score);
    const [result] = await Score.aggregate([
      {
        $sort: {
          score: -1,
        },
      },
      {
        $skip: 9,
      },
      {
        $limit: 1,
      },
    ]);

    return response(
      ctx,
      RESPONSE_STATUSES.ok,
      RESPONSE_MESSAGES.ok,
      {
        isInTop: result.score < Number(query.score),
      },
    );
  } catch (error) {
    return response(
      ctx,
      RESPONSE_STATUSES.internalServerError,
      RESPONSE_MESSAGES.internalServerError,
    );
  }
}
