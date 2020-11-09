import { Router } from 'https://deno.land/x/oak/mod.ts';

import getTopScores from './get-top-scores.controller.ts';

export const router = new Router();
router.get('/api/highscores', getTopScores);
