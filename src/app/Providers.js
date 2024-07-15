"use client";

import { FetchingProvider } from "./context";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  return (
    <SessionProvider>
      <FetchingProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </FetchingProvider>
    </SessionProvider>
  );
};
