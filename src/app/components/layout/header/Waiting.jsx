"use client";

import { Avatar } from "@nextui-org/avatar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Waiting() {
  const [user, setUser] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  useEffect(() => {
    if (session) {
      // console.log("Session: ", session);
      setUser(session.user);
    }
  }, [session]);

  //get a skeleton loader
  // if (!user) return null;
  {
    /*<div role="status" class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div class="flex items-center mt-4">
       <svg class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    </div>
    <span class="sr-only">Loading...</span>
</div> */
  }

  return (
    <div className="flex items-center gap-3 ">
      <div className="hidden sm:flex flex-col items-end">
        <p className="font-[600] text-blueTitle text-[14px]">
          {user?.firstName ? user?.firstName : "User"}
          {user?.lastName ? " " + user?.lastName[0] : " l"}.
        </p>
        <p className="text-[13px] text-textgray2">{user?.role ?? "role"}</p>
      </div>
      {/* <div
          onClick={() => {
            setShow(!show);
          }}
        > */}
      <Avatar
        showFallback
        src={user?.pfp}
        className={"h-[48px] w-[48px] hover:border-4 hover:border-primary"}
      />
    </div>
  );
}
