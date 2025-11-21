import { db } from "@/db";
import { users } from "@/db/schema";
import { Account, Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile | null;
    }) {
      if (account && profile) {
        token.googleId = profile.sub;
        const existing = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, profile.email!),
        });
        if (existing) {
          token.role = existing.role;
          token.id = existing.id;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.googleId) {
        session.user = {
          ...session.user,
          // hello: "Hello!!!!",
          googleId: token.googleId,
        };
      }
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: { user: any }) {
      if (!user.email) {
        return false;
      }
      const existing = await db.query.users.findFirst({
        where: (u, { eq }) => eq(user.email, u.email),
      });
      if (!existing) {
        await db.insert(users).values({
          email: user.email,
          name: user.name,
          image: user.image,
          role: "customer",
        });
      }
      return true;
    },
  },
};
