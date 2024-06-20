"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, DropdownTrigger } from "@nextui-org/react";
import DropDownItems from "./DropDownItems";

export default function UsreInfo() {
  const [user, setUser] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // console.log("Session: ", session);
      setUser(session.user);
    }
  }, [session]);

  const pathname = usePathname();
  if (pathname === "/login") return;

  // get a skeleton loader
  if (!user)
    return (
      <div role="status" className=" max-w-38 rounded animate-pulse">
        <div className="flex items-center">
          <div className="hidden sm:flex flex-col items-end pr-2">
            <div className=" w-28 h-2.5  rounded-full bg-gray-500 mb-2"></div>
            <div className=" w-24 h-2.5  rounded-full bg-gray-500 "></div>
          </div>
          <svg
            className="w-[48px] h-[48px] text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <div className="flex items-center gap-3 ">
      <div className="hidden sm:flex flex-col items-end">
        <p className="font-[600] text-blueTitle text-[14px]">
          {user?.firstName ? user?.firstName : "User"}
          {user?.lastName ? " " + user?.lastName[0] : " l"}.
        </p>
        <p className="text-[13px] text-textgray2">{user?.role ?? "role"}</p>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            showFallback
            src={user?.pfp}
            className={
              "h-[48px] w-[48px] hover:border-4 hover:border-primary cursor-pointer"
            }
          />
        </DropdownTrigger>
        <DropDownItems isAdmin={user?.isAdmin} />
      </Dropdown>
    </div>
  );
}
