import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';

import './index.css';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  if (import.meta.env.VITE_ENABLE_MOCKS === 'false') {
    return;
  }

  const { worker } = await import('@/mocks/browser');

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

async function bootstrap() {
  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
