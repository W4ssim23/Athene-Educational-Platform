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

  if (loading) return <div>Loading...</div>;

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
