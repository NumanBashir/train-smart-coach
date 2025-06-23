import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToMONGO } from "@/utils/database";
import { User } from "@/models/user";
import { verifyPassword } from "@/utils/password";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMONGO();

        const user = await User.findOne({ email: credentials?.email });

        if (
          !user ||
          !credentials ||
          typeof credentials.password !== "string" ||
          !verifyPassword(credentials.password, user.password)
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
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});
