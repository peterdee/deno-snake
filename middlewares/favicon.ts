import response from '../utilities/response.ts';
import { RESPONSE_STATUSES } from '../configuration/index.ts';

/**
 * Handle favicon request
 * @param {Context} ctx - context
 * @param {*} next - call the next middleware
 * @returns {Promise<Response|void>}
 */
export default async function (
  ctx: any,
  next: () => void,
): Promise<any> {
  if (ctx.request.url.pathname === '/favicon.ico' && ctx.request.method === 'GET') {
    return response(ctx, RESPONSE_STATUSES.noContent);
  }
  return next();
}
