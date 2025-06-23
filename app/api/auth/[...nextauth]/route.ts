import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToMONGO } from "@/utils/database";
import { User } from "@/models/User";
import { verifyPassword } from "@/utils/password";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMONGO();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email: credentials.email });
        if (
          !user ||
          !credentials ||
          typeof credentials.password !== "string" ||
          !(await verifyPassword(credentials.password, user.password))
        ) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

const { auth, handlers } = handler;
export { auth };
export const { GET, POST } = handlers;
