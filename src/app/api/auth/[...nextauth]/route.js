import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;
        console.log("executing authorize function");

        try {
          // console.log(
          //   "Credentials",
          //   "username: ",
          //   username,
          //   "password: ",
          //   password
          // );
          await connectMongoDB();
          const user = await User.findOne({ username });
          // console.log("User: ", user);

          if (!user) {
            // console.log("User Not found");
            return null;
          }
          // console.log("User Found: ", user);

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            // console.log("Passwords do not match");
            return null;
          }
          // console.log("Passwords match");

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
  // async redirect({ url, baseUrl }) {
  //   // If the request comes from the API, don't redirect
  //   if (url.includes("/api/auth")) {
  //     return url;
  //   }
  //   return baseUrl;
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
