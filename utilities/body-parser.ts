import { RouterContext } from "https://deno.land/x/oak@v6.3.2/router.ts";

export interface Body {
  [key: string]: number | string;
}

/**
 * Parse request body
 * @param {RouterContext} ctx - context
 * @returns {Promise<*>}
 */
export default async function(ctx: RouterContext): Promise<any> {
  try {
    const body = ctx.request.body();
    if (!body.value) {
      return {};
    }
    const encoded = await body.value;
    const decoded = decodeURIComponent(encoded);
    const json = decoded.slice(0, decoded.lastIndexOf('}') + 1);

    try {
      return JSON.parse(json);
    } catch {
      throw new Error('INVALID_DATA');
    }
  } catch (error) {
    throw error;
  }
}
