"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { LogoP } from "@/assets";

export default function Logoo() {
  function isLoginPage(path) {
    if (path === "/login") {
      return true;
    }
    return false;
  }

  const pathname = usePathname();
  const pg = isLoginPage(pathname);
  if (pg) return;

  return (
    <Link href={"/"}>
      <Image
        src={LogoP}
        alt="Logo"
        className="w-[50px] h-[50px] mr-2 sm:hidden"
        priority
      />
    </Link>
  );
}
