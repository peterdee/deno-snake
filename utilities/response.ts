import type { Response } from './types.ts';

export type { Response };

/**
 * Send response to the frontend
 * @param {Context} ctx - context
 * @param {number} status - response status
 * @param {string} info - response info
 * @param {*} data - data object (optional)
 * @param {string} misc - additional information (optional)
 * @returns {Response} 
 */
export default (
  ctx: any,
  status = 200,
  info = 'OK',
  data: any = null,
  misc = 'NO_ADDITIONAL_INFORMATION',
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
