"use client";

import AdminButtons from "./AdminButtons";
import { useState, useEffect, useContext } from "react";
import FetchingContext from "@/app/context";
import { useSession } from "next-auth/react";

export default function Aclass({ params }) {
  const { grade, classId } = params;

  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const { modules, setModules } = useContext(FetchingContext);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/classes/${grade}/${classId}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(session?.user.role);
          if (session?.user.role === "teacher") {
            const filteredModules = data.modules.filter(
              (module) => module.teacherId === session.user.id
            );
            setModules(filteredModules);
          } else if (session) {
            setModules(data.modules);
          } else {
            setModules([]);
          }
        } else {
          console.log("Failed to fetch modules");
          setModules([]);
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [grade, classId, session]);

  if (loading || !session) return <SkeletonModuleList />;

  return (
    <main className=" min-h-screen w-full flex flex-col gap-8 ">
      <AdminButtons params={params} />
      <ModuleList params={params} modules={modules} />
    </main>
  );
}

import { Avatar } from "@nextui-org/react";
import Devoir from "./icons/Devoir";
import Courses from "./icons/Courses";
import SmallButton from "@/app/components/ui/SmallButton";
import Link from "next/link";
import { set } from "mongoose";

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
          <Avatar
            fallback
            src={module.teacherPfp}
            className="w-[65px] h-[65px] outline-white outline outline-[4px] absolute top-[-25px]  rounded-full"
          />
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

const SkeletonModuleCard = () => {
  return (
    <div
      className="animate-pulse w-[90%] max-w-[290px] md:max-w-[280px] rounded-[20px] outline outline-gray-300 
      shadow-md flex flex-col justify-between transition ease-in-out delay-50 hover:-translate-y-1
      hover:scale-105 duration-300"
    >
      <div className="h-[70px] rounded-t-[20px] bg-gray-300"></div>
      <div className="relative h-[140px] bg-gray-200 rounded-b-[20px] flex flex-col justify-end p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="flex gap-3">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonModuleList = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-9 h-screen">
      <div className="flex gap-5 flex-wrap justify-center sm:justify-start">
        {[...Array(6)].map((_, index) => (
          <SkeletonModuleCard key={index} />
        ))}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
      </div>
    </div>
  );
};
