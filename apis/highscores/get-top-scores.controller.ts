import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import response, { Response } from '../../utilities/response.ts';

/**
 * Get top highscores
 * @param {RouterContext} ctx - context
 * @returns {Promise<Response|*>}
 */
export default async function (ctx: RouterContext): Promise<Response|any> {
  const fakeData = [
    {
      id: 1,
      name: 'Jake',
      score: 100,
    },
    {
      id: 3,
      name: 'Tony',
      score: 95,
    },
    {
      id: 2,
      name: 'Sally',
      score: 92,
    },
    {
      id: 7,
      name: 'Kimberley',
      score: 81,
    },
    {
      id: 9,
      name: 'Noah',
      score: 70,
    },
    {
      id: 10,
      name: 'Garry',
      score: 55,
    },
    {
      id: 4,
      name: 'Tyrone',
      score: 49,
    },
    {
      id: 8,
      name: 'Ricky',
      score: 22,
    },
    {
      id: 6,
      name: 'Kayle',
      score: 10,
    },
    {
      id: 5,
      name: 'Jimmy',
      score: 5,
    },
  ];

  return response(ctx, 200, 'OK', fakeData);
}
