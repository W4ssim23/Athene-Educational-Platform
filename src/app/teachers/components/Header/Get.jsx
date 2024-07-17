import Link from "next/link";
import Plus from "./Plus";
import { Button } from "@nextui-org/react";

export default function Get() {
  //when pressed downloads a csv file with the students data
  return (
    <Link href="/api/teachers/get">
      <Button
        startContent={<Plus />}
        className="cursor-pointer h-12 sm:w-36 w-32 gap-3 sm:flex hidden justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
      >
        Get
      </Button>
    </Link>
  );
}
