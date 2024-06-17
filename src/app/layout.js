import { AuthProvider } from "./Providers";
import { Poppins } from "next/font/google";
import "./globals.css";

import NavBar from "./components/layout/navbar/NavBar";
import Header from "./components/layout/header/Header";

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
          <div className="sm:pl-[100px] lg:pl-[18%] pb-[75px] sm:pb-0 bg-bgfakeWhite">
            <div className="p-[15px] sm:p-[30px] flex flex-col gap-9">
              <Header />
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
