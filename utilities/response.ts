import { Context, RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { RESPONSE_STATUSES, RESPONSE_MESSAGES } from '../configuration/index.ts';
import type { Response } from './types.ts';

export type { Response };

/**
 * Send response to the frontend
 * @param {Context|RouterContext} ctx - context
 * @param {number} status - response status
 * @param {string} info - response info
 * @param {*} data - data object (optional)
 * @param {string} misc - additional information (optional)
 * @returns {Response} 
 */
export default (
  ctx: Context | RouterContext,
  status = RESPONSE_STATUSES.ok,
  info = RESPONSE_MESSAGES.ok,
  data: any = null,
  misc = RESPONSE_MESSAGES.noAdditionalInformation,
): Response => {
  // create response object
  const response: Response = {
    datetime: Date.now(),
    info,
    misc,
    request: `${ctx.request.url} [${ctx.request.method}]`,
    status,
  };
  if (data) {
    response.data = data;
  }

  // send response
  ctx.response.status = status;
  ctx.response.body = response;
  return response;
};
