import { Router } from 'https://deno.land/x/oak/mod.ts';

import controller from './index.controller.ts';

export const router = new Router();
router.get('/', controller);
router.get('/api', controller);
