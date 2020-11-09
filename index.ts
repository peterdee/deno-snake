import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors as cors } from 'https://deno.land/x/cors/mod.ts';

import { ENV, ENVS, PORT } from './configuration/index.ts';
import log from './utilities/log.ts';
import logger from './middlewares/logger.ts';
import responseTime from './middlewares/response-time.ts';

import { router as highscores } from './apis/highscores/index.ts';
import { router as index } from './apis/index/index.ts';

const app = new Application();

// middlewares
app.use(cors());
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
