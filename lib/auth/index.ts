import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Provider } from "next-auth/providers";
import { prisma } from "@/lib/prisma";

/**
 * Auth.js (NextAuth v5) configuration — scaffolding only.
 * Google OAuth + Email providers are prepared; business logic is not implemented.
 */
const providers: Provider[] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

// Email provider — configure AUTH_EMAIL_* env vars, then uncomment:
// import Email from "next-auth/providers/nodemailer";
// if (process.env.AUTH_EMAIL_SERVER_HOST) {
//   providers.push(
//     Email({
//       server: {
//         host: process.env.AUTH_EMAIL_SERVER_HOST,
//         port: Number(process.env.AUTH_EMAIL_SERVER_PORT),
//         auth: {
//           user: process.env.AUTH_EMAIL_SERVER_USER,
//           pass: process.env.AUTH_EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.AUTH_EMAIL_FROM,
//     }),
//   );
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  trustHost: true,
});
