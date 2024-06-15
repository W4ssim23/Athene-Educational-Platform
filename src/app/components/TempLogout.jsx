"use client";
import { signOut } from "next-auth/react";

export default function TempLogout() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red text-white font-bold px-6 py-2 mt-3"
    >
      Log Out
    </button>
  );
}
