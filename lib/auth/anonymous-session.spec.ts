import { beforeEach, describe, expect, it, vi } from 'vitest';

const { cookieValues, cookieJar, requestHeaders } = vi.hoisted(() => {
  const values = new Map<string, string>();

  return {
    cookieValues: values,
    requestHeaders: new Headers(),
    cookieJar: {
      get: (name: string) => {
        const value = values.get(name);

        return value === undefined ? undefined : { name, value };
      },
      has: (name: string) => values.has(name),
      set: vi.fn((name: string, value: string) => values.set(name, value)),
      delete: vi.fn(({ name }: { name: string }) => values.delete(name)),
    },
  };
});

vi.mock('next/headers', () => ({
  cookies: () => Promise.resolve(cookieJar),
  headers: () => Promise.resolve(requestHeaders),
}));

import {
  anonymousSignIn,
  clearAnonymousSession,
  getAnonymousSession,
  updateAnonymousSession,
} from '~/auth/anonymous-session';

const cookieName = 'authjs.anonymous-session-token';
const secureCookieName = `__Secure-${cookieName}`;
const cartId = '91054152-ca47-40a2-8da8-7e895eb8c3a3';

beforeEach(() => {
  vi.stubEnv('AUTH_SECRET', 'anonymous-session-regression-test-secret');
  cookieValues.clear();
  requestHeaders.delete('x-forwarded-proto');
  vi.clearAllMocks();
});

describe('anonymous cart session across hosting proxies', () => {
  it('saves the cart when a proxy-created session reaches an HTTPS server action', async () => {
    await anonymousSignIn();
    expect(cookieValues.has(cookieName)).toBe(true);

    requestHeaders.set('x-forwarded-proto', 'https');
    expect((await getAnonymousSession())?.user?.cartId).toBeNull();

    await updateAnonymousSession({ cartId, cartIds: { '1908487': cartId } });
    expect(cookieValues.has(secureCookieName)).toBe(true);

    // The cart render must prefer the updated secure cookie over the original empty session.
    requestHeaders.delete('x-forwarded-proto');
    expect((await getAnonymousSession())?.user).toEqual({
      cartId,
      cartIds: { '1908487': cartId },
    });
  });

  it('keeps using the secure cookie when a later request has no HTTPS header', async () => {
    requestHeaders.set('x-forwarded-proto', 'https');
    await anonymousSignIn();

    requestHeaders.delete('x-forwarded-proto');
    await updateAnonymousSession({ cartId });

    expect((await getAnonymousSession())?.user?.cartId).toBe(cartId);
    expect(cookieValues.has(cookieName)).toBe(false);
    expect(cookieJar.set).toHaveBeenLastCalledWith(
      secureCookieName,
      expect.any(String),
      expect.objectContaining({ secure: true, path: '/' }),
    );
  });

  it('clears both cookie names so logout cannot restore the older guest cart', async () => {
    await anonymousSignIn({ cartId });
    requestHeaders.set('x-forwarded-proto', 'https');
    await updateAnonymousSession({ cartId });

    await clearAnonymousSession();

    expect(cookieValues.size).toBe(0);
    expect(await getAnonymousSession()).toBeNull();
  });
});
