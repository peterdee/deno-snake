import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import response, { Response } from '../../utilities/response.ts';

/**
 * Handle the index route
 * @param {RouterContext} ctx - Oak Context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response | any> {
  return response(ctx);
};
