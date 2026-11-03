import { cookies, headers } from 'next/headers';
import { AnonymousUser } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';

const anonymousCookieName = 'authjs.anonymous-session-token';
const secureAnonymousCookieName = `__Secure-${anonymousCookieName}`;

const shouldUseSecureCookie = async () => {
  const headersList = await headers();

  return (
    headersList.get('x-forwarded-proto') === 'https' ||
    (await cookies()).has(secureAnonymousCookieName)
  );
};

export const anonymousSignIn = async (user: Partial<AnonymousUser> = { cartId: null }) => {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const useSecureCookies = await shouldUseSecureCookie();
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';

  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }

  const cookieJar = await cookies();
  const jwt = await encode({
    salt: `${cookiePrefix}${anonymousCookieName}`,
    secret,
    token: {
      user,
    },
  });

  cookieJar.set(`${cookiePrefix}${anonymousCookieName}`, jwt, {
    path: '/',
    secure: useSecureCookies,
    sameSite: 'lax',
    httpOnly: true,
  });
};

export const getAnonymousSession = async () => {
  const cookieJar = await cookies();
  // Hosting proxies can expose different protocol headers to the proxy and server actions.
  // Read the cookie that exists, preferring the secure session after an HTTPS update.
  const jwt = cookieJar.get(secureAnonymousCookieName) ?? cookieJar.get(anonymousCookieName);

  if (!jwt) {
    return null;
  }

  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }

  try {
    const session = await decode({
      secret,
      salt: jwt.name,
      token: jwt.value,
    });

    return session;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to decode anonymous session cookie', err);

    return null;
  }
};

export const clearAnonymousSession = async () => {
  const cookieJar = await cookies();

  [secureAnonymousCookieName, anonymousCookieName].forEach((name) => {
    cookieJar.delete({
      name,
      path: '/',
      secure: name === secureAnonymousCookieName,
      sameSite: 'lax',
      httpOnly: true,
    });
  });
};

export const updateAnonymousSession = async (user: AnonymousUser) => {
  const session = await getAnonymousSession();

  if (!session) {
    return null;
  }

  await anonymousSignIn(user);
};
