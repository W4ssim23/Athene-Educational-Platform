"use client";

import TeacherCard from "./TeacherCard";
import { TeachersListSkeleton } from "./Skeleton";
import { useState, useEffect, useContext } from "react";
import FetchingContext from "@/app/context";

export default function TeachersList() {
  const { teachers, setTeachers } = useContext(FetchingContext);

  const [isLoading, setIsLoading] = useState(false);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/teachers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch teachers");
        return;
      }

      const data = await response.json();
      setTeachers(data.teachers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    // if (teachers) {
    //   console.log("updated !");
    // }
  }, [teachers]);

  //add skeleton when fetch !
  // const teachers = [
  //   {
  //     id: 1,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  //   {
  //     id: 2,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  //   {
  //     id: 3,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  //   {
  //     id: 4,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  //   {
  //     id: 5,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  //   {
  //     id: 6,
  //     firstName: "John",
  //     lastName: "Doe",
  //     speciality: "Maths",
  //     pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
  //     phone: "1234567890",
  //     email: "dgg@gg.tt",
  //   },
  // ];

  if (isLoading) {
    return <TeachersListSkeleton />;
  }

  return (
    <div className="flex flex-wrap w-auto gap-7 justify-center items-center sm:justify-start">
      {teachers?.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
      {/* <TeachersListSkeleton /> */}
    </div>
  );
}
