import 'dotenv/config';

import express from 'express';

import { getAdminUsers } from './routes/admin-users';

const app = express();

const port = Number(process.env.ADMIN_BFF_PORT ?? 3101);

app.disable('x-powered-by');

app.use(express.json());

app.get('/api/admin/users', getAdminUsers);

app.listen(port, '127.0.0.1', () => {
  console.log(`Admin BFF listening on http://127.0.0.1:${port}`);
});
