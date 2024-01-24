import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Check if the user is in the database

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
