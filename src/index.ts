import 'dotenv/config';
import Koa from 'koa';

import { reportError } from './rollbar';

const { PORT } = process.env;
const port = PORT ? Number(PORT) : 3000;

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.on('error', (err, ctx) => {
  reportError('server error', err, ctx);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
