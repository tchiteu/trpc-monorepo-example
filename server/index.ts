import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router, publicProcedure, appProcedure, createContext } from './trpc.js';

const appRouter = router({
  login: publicProcedure.query(() => 'fake-token-vapo'),
  secret: appProcedure.query(() => 'Receba! 🤫')
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(3000);
