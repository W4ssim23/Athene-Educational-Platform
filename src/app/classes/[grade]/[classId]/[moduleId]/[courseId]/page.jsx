"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Attached from "../Attached";
import { Send, dots, excel, pdf, file } from "@/assets";

// Mock Data
const mockCourse = {
  courseName: "Introduction to React",
  courseDate: "2024-07-03",
  title: "React Basics",
  type: "Lecture",
  file: "/path/to/file.pdf",
  comments: [
    {
      student: { nom: "Doe", prénom: "John" },
      comment: "This lecture was really helpful!",
    },
    {
      student: { nom: "Smith", prénom: "Jane" },
      comment: "Looking forward to the next one!",
    },
  ],
};

export default function Course() {
  const { data: session } = useSession();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  if (!session) return <p>Loading...</p>;

  return (
    <main className="min-h-screen w-full ">
      <AttachmentPage course={mockCourse} user={user} />
    </main>
  );
}

const AttachmentPage = ({ course, user }) => {
  const [show, setShow] = useState(false);

  const getFileType = (filename) => {
    const extension = filename.split(".").pop();
    return extension;
  };

  return (
    <div className="font-poppins m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="w-full text-[30px] text-primary font-[700]">
        {"Class >> Module >> Course"}
      </div>
      <div className="relative flex flex-col rounded-xl bg-white pt-5 gap-3 h-screen overflow-y-scroll px-4 sm:px-14 py-6">
        <div className="p-5 flex items-center justify-between select-none border-b-[1.5px]">
          <Attachment data={course} />
          {user.role !== "student" && (
            <div
              className={`w-[25px] h-[25px] flex justify-center items-center transition ease-in-out cursor-pointer ${
                show ? "translate-x-4" : ""
              }`}
              onClick={() => setShow(!show)}
            >
              <Image src={dots} alt="" />
            </div>
          )}
          {show && (
            <div className="absolute flex flex-row-reverse transition ease-out gap-3 right-[100px]">
              {/* drop down */}
              {/* elements of edit and delete to add */}
            </div>
          )}
        </div>
        <a href={course.file} target="_blank" rel="noopener noreferrer">
          <div className="p-5 flex justify-start items-center w-full border-b-[1.5px]">
            <div className="w-[90%] max-w-[500px] h-fit rounded-md border border-[#DEDEDE] flex mb-[10px]">
              <Image
                className="w-[120px] h-[90px] rounded-l-md p-3"
                src={
                  getFileType(course.file) === "pdf"
                    ? pdf
                    : getFileType(course.file) === "xlsx"
                    ? excel
                    : file
                }
                alt=""
              />
              <div className="p-4 flex flex-col justify-center items-start">
                <p className="font-[600] text-[17px] text-primary">
                  {course.title}
                </p>
                <p className="font-[500] text-[#A7A7A7]">{course.type}</p>
              </div>
            </div>
            <br />
          </div>
        </a>
        <div className="flex gap-5 flex-col">
          <p className="font-[600] text-[#A7A7A7] text-[18px] sm:text-[23px] opacity-80">
            Comments Added to the Course
          </p>
          {user.role === "student" && (
            <div className="relative flex px-4 justify-start items-center gap-3 py-4 sm:py-2 max-w-[550px] w-[95%] h-[65px] sm:w-[75%] rounded-full bg-[#F3F4FF]">
              <div>
                <Avatar src={user.pfp} className="w-[48px] h-[48px]" />
              </div>
              <div className="flex-1">
                <input
                  placeholder="Add Comment"
                  type="text"
                  id="addEventInput"
                  className="text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 w-full"
                />
              </div>
              <div className="cursor-pointer">
                <Image className="w-[25px] h-[25px]" src={Send} alt="" />
              </div>
            </div>
          )}
        </div>
        {course.comments.map((comment, index) => (
          <div key={index}>
            <Comment data={comment} />
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

const Attachment = ({ data }) => {
  return (
    <div className="flex gap-3">
      <div className="bg-primary rounded-full w-[50px] h-[50px] p-2">
        <Attached />
      </div>
      <div className="flex flex-col font-poppins">
        <p className="font-[600] text-[#363B64] text-[18px]">
          {data.courseName}
        </p>
        <p className="text-[14px] text-[#A7A7A7]">{data.courseDate}</p>
      </div>
    </div>
  );
};

const Comment = ({ data }) => {
  return (
    <div className="flex px-6 justify-start font-poppins items-center gap-3 max-w-[550px] w-[95%] h-[70px] sm:w-[75%] rounded-full bg-white relative border-[1px] border-[#DEDEDE]">
      <div className="flex gap-2">
        <div className="h-[45px] w-[45px] bg-pfpclr rounded-full"></div>
        <div className="flex flex-col">
          <p className="text-[14px] text-gray-600">
            {data.student.nom + " " + data.student.prénom}
          </p>
          <p className="font-[500] text-[#263238]">{data.comment}</p>
        </div>
      </div>
    </div>
  );
};
