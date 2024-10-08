import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/User";
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
        // console.log("executing authorize function");

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
    //adjust pfp , classes and other stuff for the model later
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.pfp = user.pfp;
        token.email = user.email;
        token.address = user.address;
        token.phone = user.phone;
        token.isAdmin = user.isAdmin;
        token.about = user.about;
        if (user.classId) {
          token.classId = user.classId;
        }
        if (user.grade) {
          token.grade = user.grade;
        }
        //inserting other ifs later
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.pfp = token.pfp;
        session.user.email = token.email;
        session.user.address = token.address;
        session.user.phone = token.phone;
        session.user.isAdmin = token.isAdmin;
        session.user.about = token.about;
        if (token.classId) {
          session.user.classId = token.classId;
        }
        if (token.grade) {
          session.user.grade = token.grade;
        }
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
