import { Router } from 'https://deno.land/x/oak/mod.ts';

import checkScore from './check-score.controller.ts';
import getTopScores from './get-top-scores.controller.ts';
import publishScore from './publish-score.controller.ts';

const router = new Router();
router.get('/api/highscores', getTopScores);
router.post('/api/highscores', publishScore);
router.get('/api/highscores/check', checkScore);

export default router;
