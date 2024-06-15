import { AuthProvider } from "./Providers";
import { Poppins } from "next/font/google";
import "./globals.css";

import NavBar from "./components/layout/navbar/NavBar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Athene Edu",
  description: "Athene Edu is a modern educational platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
