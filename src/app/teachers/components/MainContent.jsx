"use client";

import SearchHead from "./Header/SearchHead";
import TeachersSkeleton from "./Skeleton";
import TeachersList from "./TeachersList";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MainContent() {
  const { data: session } = useSession();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (session) {
      // console.log("Session: ", session);
      setUser(session.user);
    }
  }, [session]);

  if (!session) return <TeachersSkeleton />;

  //   console.log("User: ", user);

  if (!(user.role === "admin")) return <h1>Not allowed</h1>;

  return (
    <main className="w-full min-h-screen mt-[-11px] flex flex-col gap-8 mb-[25px] sm:mb-0">
      <SearchHead />
      <TeachersList />
    </main>
  );
}
