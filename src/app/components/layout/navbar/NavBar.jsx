"use client";

import {
  Student,
  Teacher,
  User,
  Class,
  Calendar,
  Studentselected,
  Teacherselected,
  Userslected,
  Calendarslected,
  Classselected,
  bells,
  bellsselected,
  Absence,
  Absenceg,
  Chat,
  ChatSelected,
} from "@/assets";

import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import { usePathname } from "next/navigation";

export default function NavBar({ role = "admin" }) {
  function getFirstElement(path) {
    if (path === "/") {
      return null;
    }
    const elements = path.split("/").filter(Boolean);
    return elements.length > 0 ? elements[0] : null;
  }

  const pathname = usePathname();
  let pg = getFirstElement(pathname);

  if (pg === "login") {
    return;
  }

  return (
    <>
      <SideBar pg={pg} items={ItemsConfig[role]} />
      <BottomBar pg={pg} items={ItemsConfig[role]} />
    </>
  );
}

const Adminlist = [
  {
    title: "Students",
    theLink: "/students",
    svg: Student,
    svgSelected: Studentselected,
    key: 0,
  },
  {
    title: "Teachers",
    theLink: "/teachers",
    svg: Teacher,
    svgSelected: Teacherselected,
    key: 1,
  },
  {
    title: "Classes",
    theLink: "/classes",
    svg: Class,
    svgSelected: Classselected,
    key: 2,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 3,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 4,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 5,
  },
];
const Studentlist = [
  {
    title: "Classes",
    theLink: "/classes",
    svg: Class,
    svgSelected: Classselected,
    key: 0,
  },
  {
    title: "Notifications",
    theLink: "/notifications",
    svg: bells,
    svgSelected: bellsselected,
    key: 1,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 2,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 3,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 4,
  },
];
const Teacherlist = [
  {
    title: "Classes",
    theLink: "/classes/teacher",
    svg: Class,
    svgSelected: Classselected,
    key: 0,
  },
  {
    title: "Notifications",
    theLink: "/notifications",
    svg: bells,
    svgSelected: bellsselected,
    key: 1,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 2,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 3,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 4,
  },
];

const ItemsConfig = {
  admin: Adminlist,
  teacher: Teacherlist,
  student: Studentlist,
  parent: Studentlist,
};
