import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router, publicProcedure } from './trpc.js';

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
