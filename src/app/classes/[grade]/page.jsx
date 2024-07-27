"use client";

import { useEffect, useState, useContext } from "react";
import GradeList from "./GradeList";
import FetchingContext from "@/app/context";
import { useSession } from "next-auth/react";

export default function Grades({ params }) {
  const { grade } = params;
  const { classes, setClasses } = useContext(FetchingContext);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  //should have a display when the list is ampty

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/classes/${grade}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setClasses(data.classes);
        } else {
          setClasses([[], [], [], [], []]);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        setClasses([[], [], [], [], []]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [grade]);

  useEffect(() => {
    console.log("updated");
  }, [classes]);

  if (loading) return <GradesSkeleton />;

  if (!session || !(session.user.role === "admin"))
    return (
      <main className="w-full min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary">
          You are not authorized to perform this action.
        </h1>
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <GradeList grade={grade} levels={classes} />
    </main>
  );
}

const GradesSkeleton = () => {
  return (
    <main className="flex min-h-screen flex-col gap-12 animate-pulse pt-24">
      <div className="flex  gap-4 w-full flex-wrap">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="p-2 flex flex-col justify-center items-center text-center font-poppins rounded-3xl shadow-md
                relative overflow-hidden cursor-pointer 
                w-[17%] min-h-[120px] sm:min-w-[170px] min-w-[150px]
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 
                bg-opacity-30 bg-gray-400"
          ></div>
        ))}
      </div>
      <div className="flex  gap-4 flex-wrap">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="p-2 flex flex-col justify-center items-center text-center font-poppins rounded-3xl shadow-md
                relative overflow-hidden cursor-pointer 
                w-[17%] min-h-[120px] sm:min-w-[170px] min-w-[150px]
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 
                bg-opacity-30 bg-gray-400"
          ></div>
        ))}
      </div>
      <div className="flex  gap-4 flex-wrap">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-2 flex flex-col justify-center items-center text-center font-poppins rounded-3xl shadow-md
                relative overflow-hidden cursor-pointer 
                w-[17%] min-h-[120px] sm:min-w-[170px] min-w-[150px]
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 
                bg-opacity-30 bg-gray-400"
          ></div>
        ))}
      </div>
    </main>
  );
};
