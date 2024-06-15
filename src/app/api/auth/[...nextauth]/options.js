// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "../../../models/User";
// import bcrypt from "bcrypt";

// export const options = {
//   providers: [
//     GitHubProvider({
//       profile(profile) {
//         console.log("Profile GitHub: ", profile);

//         let userRole = "GitHub User";
//         if (profile?.email == "jake@claritycoders.com") {
//           userRole = "admin";
//         }

//         return {
//           ...profile,
//           role: userRole,
//         };
//       },
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_Secret,
//     }),
//     GoogleProvider({
//       profile(profile) {
//         console.log("Profile Google: ", profile);

//         let userRole = "Google User";
//         return {
//           ...profile,
//           id: profile.sub,
//           role: userRole,
//         };
//       },
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_Secret,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user) session.user.role = token.role;
//       return session;
//     },
//   },
// };
