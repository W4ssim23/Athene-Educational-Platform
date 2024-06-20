"use client";

import { useSession } from "next-auth/react";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-8 pt-[30%] sm:pt-[8%]">
        <div className="animate-pulse flex flex-col items-center gap-8">
          <div className="h-8 w-60 bg-gray-500 rounded-full"></div>
          <svg
            className="w-[140px] h-[140px] text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="h-8 w-3/4 bg-gray-500 rounded-full"></div>
          <div className="h-10 w-1/2 bg-gray-500 rounded-full mt-4"></div>
        </div>
      </main>
    );
  }
  // console.log(session.user);
  return (
    <main className="flex min-h-screen flex-col items-center sm:pt-[8%] pt-28 gap-8 ">
      <h1 className="text-4xl font-bold text-primary">Welcome Back !</h1>
      <Avatar src={session.user.pfp} className="h-[140px] w-[140px]" />
      <h2 className="text-4xl font-bold w-3/4 text-center">
        {session.user.firstName} {session.user.lastName}
      </h2>
      <Link href={"/classes"}>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-primary to-pink-500 text-white shadow-lg mt-4"
          size="lg"
        >
          Go to Classes 🚀
        </Button>
      </Link>
    </main>
  );
}
