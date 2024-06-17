"use client";

import { usePathname } from "next/navigation";

export default function Title() {
  function getFirstElement(path) {
    if (path === "/login") {
      return null;
    }
    if (path === "/") {
      return "home";
    }
    const elements = path.split("/").filter(Boolean);
    return elements.length > 0 ? elements[0] : null;
  }

  const pathname = usePathname();
  const pg = getFirstElement(pathname);
  if (!pg) return;
  const title = TitleConfig[pg] || "A Title";
  return (
    <h1 className="text-[26px] font-bold text-blueTitle sm:text-[30px]">
      {title}
    </h1>
  );
}

const TitleConfig = {
  profile: "My Profile",
  students: "Students",
  teachers: "Teachers",
  classes: "Classes",
  notification: "Notification",
  absence: "Absence",
  chat: "Chat",
  events: "Events",
  home: "Home",
};
