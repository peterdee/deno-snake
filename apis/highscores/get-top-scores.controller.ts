import { Context } from 'https://deno.land/x/oak/mod.ts';

import response, { Response } from '../../utilities/response.ts';

export default async function (ctx: Context): Promise<Response|any> {
  return response(ctx);
}
