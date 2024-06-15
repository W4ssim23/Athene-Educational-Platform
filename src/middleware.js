// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// export const config = { matcher: ["/chat", "/"] }; // Specify the protected routes
