export default function middleware(req: Request) {
  const basicAuth = req.headers['authorization']

  if (basicAuth) {
    const pwdLines = process.env.BASIC_AUTH_PASSWORDS.split(/\s+/);

    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = atob(auth).split(':');

    for (const line of pwdLines) {
      const [u, p] = line.split(':');

      if (user === u && pwd === p) {
        return new Response(null, {
          headers: {
            'x-middleware-next': '1',
          },
        })
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
