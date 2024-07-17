import Link from "next/link";
import { Phone, Email } from "../icons";
import { Avatar, Button } from "@nextui-org/react";

function TeacherCard({ teacher }) {
  return (
    <Link href={`/teachers/${teacher.id}`}>
      <div
        className="text-center flex flex-col items-center justify-center p-2 pt-3
                sm:min-w-[160px] w-[45%] max-w-[150px] min-w-[140px]    min-h-[187px]
                shadow-xl bg-white h-1/5 rounded-xl cursor-pointer  transition ease-in-out delay-50
                hover:-translate-y-1 hover:scale-105 hover:bg-[#E4E5EC] duration-300"
      >
        <Avatar fallback src={teacher.pfp} className="h-[65px] w-[65px]" />
        <h3 className=" text-[#303972] font-bold text-base ">
          {teacher.firstName + " " + teacher.lastName}
        </h3>
        <p className="flex text-[14px] text-[#A098AE]">{teacher.speciality}</p>
        <div className="flex p-2 w-full justify-evenly">
          <SmallButton
            picture={<Phone />}
            bg="#F3F4FF"
            size="40px"
            hoverText={teacher.phone}
          />
          <SmallButton
            picture={<Email />}
            hoverText={teacher.email}
            bg="#4D44B5"
            size="40px"
          />
        </div>
      </div>
    </Link>
  );
}

export default TeacherCard;

//redifined to avoid using client
function SmallButton({ picture, bg, size, hoverText = "" }) {
  const buttonStyle = {
    width: size,
    height: size,
    backgroundColor: bg,
  };

  return (
    <div className="group relative rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all">
      <Button isIconOnly radius="full" style={buttonStyle} className="p-2">
        {picture}
      </Button>
      {/* hover : */}
      <div
        className={` ${
          hoverText == ""
            ? ""
            : "absolute top-full mt-0.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-600 text-white text-xs px-2 py-1 rounded-md"
        }`}
        style={{ zIndex: 1 }}
      >
        {hoverText}
      </div>
    </div>
  );
}
