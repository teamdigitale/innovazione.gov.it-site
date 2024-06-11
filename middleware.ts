// Vercel middleware to password protect the staging deployment
export default function middleware(req: Request) {
  const basicAuthPasswords = process.env.BASIC_AUTH_PASSWORDS;
  if (basicAuthPasswords === undefined) {
    return new Response(null, {
      headers: {
        'x-middleware-next': '1',
      },
    });
  }

  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const pwdLines = basicAuthPasswords.split(/\s+/);

    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = atob(auth).split(':');

    for (const line of pwdLines) {
      const [u, p] = line.split(':');

      if (user === u && pwd === p) {
        return new Response(null, {
          headers: {
            'x-middleware-next': '1',
          },
        });
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
