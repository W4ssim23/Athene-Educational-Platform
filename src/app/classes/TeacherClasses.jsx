"use client";

import { useEffect, useState } from "react";
import StudyClass from "./[grade]/StudyClass";

function TeacherClasses({ claSs, user }) {
  claSs = claSs || [];
  claSs = claSs.filter((classe) => classe !== null || classe !== undefined);

  const [classes, setClasses] = useState({ lycee: [], cem: [], primaire: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/classes/teacher?id=${user.id}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setClasses(data.classes);
        } else {
          console.log("Failed to fetch classes:", response);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <GradesSkeleton />;

  return (
    <div className="min-h-[80vh] flex flex-col gap-5">
      {Boolean(classes?.lycee?.length) && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">Lycee classes :</h1>
          <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
            {classes.lycee?.map((classObj) => (
              <StudyClass
                key={classObj.classId}
                classId={classObj.classId}
                grade={classObj.grade}
                year={String(classObj.year)}
                number={classObj.number}
              />
            ))}
          </div>
        </div>
      )}
      {Boolean(classes?.cem?.length) && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">Cem classes :</h1>
          <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
            {classes.cem?.map((classObj) => (
              <StudyClass
                key={classObj.classId}
                classId={classObj.classId}
                grade={classObj.grade}
                year={String(classObj.year)}
                number={classObj.number}
              />
            ))}
          </div>
        </div>
      )}
      {Boolean(classes?.primaire?.length) && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">
            Primaire classes :
          </h1>
          <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
            {classes.primaire?.map((classObj) => (
              <StudyClass
                key={classObj.classId}
                classId={classObj.classId}
                grade={classObj.grade}
                year={String(classObj.year)}
                number={classObj.number}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;

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
