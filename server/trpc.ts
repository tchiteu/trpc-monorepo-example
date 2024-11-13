import { initTRPC, TRPCError } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export type Context = Awaited<ReturnType<typeof createContext>>;

export const createContext = async ({ req }: CreateHTTPContextOptions) => {
  if (req.headers.authorization === 'fake1234') {
    return {
      session: {
        user: {
          name: 'Dev Maluico',
          age: 25,
          email: 'devmaluico@rotaexata.com.br'
        }
      }
    }

  }

  return {};
}

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;
export const appProcedure = publicProcedure.use(async (opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: opts.ctx
  })
});
