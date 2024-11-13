import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index.js';

let fakeToken = 'fake1234';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      headers: {
        Authorization: fakeToken,
      }
    })
  ]
});

async function main() {
  fakeToken = await client.login.query();
  const response = await client.secret.query();

  console.log(response);
}

main();