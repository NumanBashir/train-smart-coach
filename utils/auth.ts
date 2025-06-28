import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToMONGO } from "@/utils/database";
import { User } from "@/models/User";
import { verifyPassword } from "@/utils/password";
const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMONGO();

        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email });
        const isValid =
          user &&
          typeof credentials.password === "string" &&
          (await verifyPassword(credentials.password, user.password));

        if (!user || !isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          password: user.password,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return "/home";
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const {
  handlers: { GET, POST },
  auth, // for use in server/middleware
} = NextAuth(authOptions);
