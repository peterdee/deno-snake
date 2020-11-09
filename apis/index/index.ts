import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts';

import index from './index.controller.ts';

const router = new Router();
router.get('/', index);
router.get('/api', index);

export default router;
