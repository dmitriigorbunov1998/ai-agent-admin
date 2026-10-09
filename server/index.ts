import 'dotenv/config';

import express from 'express';

import { clioAdminProxy } from './lib/clio-admin-proxy';

const app = express();

const port = Number(process.env.ADMIN_PROXY_PORT ?? 3101);

app.disable('x-powered-by');

app.use(
  express.json({
    limit: '1mb',
  }),
);

app.use('/api/v1/admin', clioAdminProxy);

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
  });
});

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('Admin proxy error:', error);

    response.status(502).json({
      error: 'CLIO_GATEWAY_UNAVAILABLE',
    });
  },
);

app.listen(port, '127.0.0.1', () => {
  console.log(`Clio Admin Proxy listening on http://127.0.0.1:${port}`);
});
