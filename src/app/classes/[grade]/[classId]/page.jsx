import AdminButtons from "./AdminButtons";

export default async function Aclass({ params }) {
  // console.log(params);

  const modules = [
    { name: "Math", id: "1", teacher: "Zouitene Ouassim" },
    { name: "Physique", id: "2", teacher: "El Hachimi Mohamed" },
    { name: "Francais", id: "3", teacher: "El Hachimi Mohamed" },
    { name: "Anglais", id: "4", teacher: "El Hachimi Mohamed" },
    { name: "Arabe", id: "5", teacher: "El Hachimi Mohamed" },
    { name: "Histoire", id: "6", teacher: "El Hachimi Mohamed" },
  ];

  return (
    <main className=" min-h-screen w-full flex flex-col gap-8 ">
      <AdminButtons />
      <ModuleList params={params} modules={modules} />
    </main>
  );
}

import Devoir from "./icons/Devoir";
import Courses from "./icons/Courses";
import { Avatar } from "@nextui-org/react";
import SmallButton from "@/app/components/ui/SmallButton";
import Link from "next/link";

const Module = ({ module, params }) => {
  return (
    <div
      className="md:w-1/3 w-[90%] transition max-w-[290px] md:max-w-[280px] rounded-[20px] outline outline-primary hover:outline-[2px] outline-[0.5px] cursor-pointer
                ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 shadow-md"
    >
      <Link href={`/classes/${params.grade}/${params.classId}/${module.id}`}>
        <div className="h-[70px] rounded-t-[20px] bg-primary relative overflow-hidden flex justify-start items-center pl-5">
          <p className="max-w-[125px] text-wrap absolute font-poppins text-[23px] font-[600] text-white leading-[25px]">
            {module.name}
          </p>
          <div className="absolute h-[100px] w-[100px] rounded-full bg-yellow top- right-[-8px]"></div>
          <div className="absolute h-[100px] w-[100px] top-4 rounded-full bg-orange right-[-3px]"></div>
        </div>
        <div className="relative h-[140px] bg-white rounded-b-[20px] flex justify-end items-end px-4 py-3">
          <p className="absolute top-[30%] left-4 text-blue-800">
            {module.teacher}
          </p>
          {/* to be changed with the actual avatar */}
          <div className="w-[65px] h-[65px] outline-white outline outline-[4px] absolute top-[-25px] bg-pfpclr rounded-full"></div>
          <div className="flex gap-3">
            {/* redirect to devoir .... directly by the & in the url */}
            <SmallButton
              picture={<Devoir />}
              hoverText={"Devoir"}
              bg={"#4D44B5"}
              size={"40px"}
            />
            <SmallButton
              picture={<Courses />}
              hoverText={"Cours"}
              bg={"#4D44B5"}
              size={"40px"}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

const ModuleList = ({ params, modules }) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-9 ">
      <div className="flex gap-5 flex-wrap justify-center sm:justify-start">
        {modules.map((module) => (
          <Module key={module.id} params={params} module={module} />
        ))}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
      </div>
    </div>
  );
};
