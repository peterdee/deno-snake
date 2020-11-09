import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors as cors } from 'https://deno.land/x/cors/mod.ts';
import { Snelm } from 'https://deno.land/x/snelm/mod.ts';

import { ENV, ENVS, PORT } from './configuration/index.ts';
import log from './utilities/log.ts';
import logger from './middlewares/logger.ts';
import responseTime from './middlewares/response-time.ts';

import highscores from './apis/highscores/index.ts';
import index from './apis/index/index.ts';

const app = new Application();
const helmet = new Snelm('oak');

// middlewares
app.use(cors());
app.use((ctx: any, next: () => void): void => {
  ctx.response = helmet.snelm(ctx.request, ctx.response);
  next();
});
app.use(logger);
app.use(responseTime);

// APIs
app.use(highscores.routes());
app.use(index.routes());

log(`-- DENO-SNAKE is running on port ${PORT} [${ENV.toUpperCase()}]`);
app.listen({
  hostname: (ENV === ENVS.heroku && '0.0.0.0') || '127.0.0.1',
  port: PORT,
});
