import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import bodyParser from '../../utilities/body-parser.ts';
import { database, collections, Score } from '../../database/index.ts';
import response, { Response } from '../../utilities/response.ts';
import { RESPONSE_STATUSES, RESPONSE_MESSAGES } from '../../configuration/index.ts';

/**
 * Publish a highscore
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response | any> {
  try {
    // check the data
    if (!ctx.request.hasBody) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.missingData,
      );
    }
    const body = await bodyParser(ctx);
    if (!(body.name && body.score)) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.missingData,
      );
    }

    // check score value
    if (Number(body.score) > 2500) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.invalidData,
      );
    }

    // create a Score record
    const Score = database.collection<Score>(collections.Score);
    const now = `${Date.now()}`;
    await Score.insertOne({
      name: body.name,
      score: Number(body.score),
      created: now,
      updated: now,
    });

    // load top-10 highscores
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
    if (error.message === RESPONSE_MESSAGES.invalidData) {
      return response(
        ctx,
        RESPONSE_STATUSES.badRequest,
        RESPONSE_MESSAGES.invalidData,
      );
    }
    return response(
      ctx,
      RESPONSE_STATUSES.internalServerError,
      RESPONSE_MESSAGES.internalServerError,
    );
  }
}
