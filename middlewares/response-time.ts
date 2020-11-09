/**
 * Response time middleware
 * @param {Context} ctx - context
 * @param {*} next - call the next middleware
 * @returns {Promise<void>}
 */
export default async function (ctx: any, next: () => void): Promise<void> {
  const start = Date.now();
  await next();
  ctx.response.headers.set('X-Response-Time', `${Date.now() - start}ms`);
}
