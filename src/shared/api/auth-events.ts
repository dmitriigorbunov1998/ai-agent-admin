const AUTH_UNAUTHORIZED_EVENT = 'clio:auth-unauthorized';

export function emitAuthUnauthorized() {
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}

export function subscribeToAuthUnauthrized(listener: () => void) {
  window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener);

  return () => {
    window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, listener);
  };
}
