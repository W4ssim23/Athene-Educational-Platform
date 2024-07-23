"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Attached from "../Attached";
import { Send, dots, excel, pdf, file } from "@/assets";

export default function Course({ params }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/${params.courseId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setCourse(data.course);
        } else {
          console.log("Failed to fetch course");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.grade, params.classId, params.moduleId, params.courseId]);

  if (!session || loading || !course) return <SkeletonCourse />;

  return (
    <main className="min-h-screen w-full ">
      <AttachmentPage course={course} user={user} />
    </main>
  );
}

const AttachmentPage = ({ course, user }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="font-poppins m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="w-full text-[30px] text-primary font-[700]">
        {`${course.className} >> ${course.moduleName} >> ${course.courseName}`}
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
        <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
          <div className="p-5 flex justify-start items-center w-full border-b-[1.5px]">
            <div className="w-[90%] max-w-[500px] h-fit rounded-md border border-[#DEDEDE] flex mb-[10px]">
              <Image
                className="w-[120px] h-[90px] rounded-l-md p-3"
                src={
                  course.courseFile === "pdf"
                    ? pdf
                    : course.courseFile === "xlsx"
                    ? excel
                    : file
                }
                alt=""
              />
              <div className="p-4 flex flex-col justify-center items-start">
                <p className="font-[600] text-[17px] text-primary">
                  {course.courseName}
                </p>
                <p className="font-[500] text-[#A7A7A7]">{course.courseType}</p>
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
      <div className="flex gap-2 items-center">
        <Avatar
          fallback
          src={data.studentPfp}
          className="min-w-[45px] min-h-[45px]"
        />
        <div className="flex flex-col">
          <p className="text-[14px] text-gray-600">{data.studentName}</p>
          <p className="font-[500] text-[#263238]">{data.comment}</p>
        </div>
      </div>
    </div>
  );
};

const SkeletonCourse = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <SkeletonAttachmentPage />
    </main>
  );
};

const SkeletonAttachmentPage = () => {
  return (
    <div className="font-poppins m-[15px] h-[100vh] w-full sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="w-full text-[30px] bg-gray-200 h-[40px] rounded-md"></div>
      <div className="relative flex flex-col rounded-xl bg-white pt-5 gap-3 h-screen overflow-y-scroll px-4 sm:px-14 py-6">
        <div className="p-5 flex items-center justify-between select-none border-b-[1.5px]">
          <SkeletonAttachment />
          <div className="w-[25px] h-[25px] bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-5 bg-gray-100 rounded-md h-[120px]"></div>
        <div className="flex gap-5 flex-col">
          <div className="h-[23px] bg-gray-200 rounded-md"></div>
          <div className="relative flex px-4 justify-start items-center gap-3 py-4 sm:py-2 max-w-[550px] w-[95%] h-[65px] sm:w-[75%] rounded-full bg-gray-200">
            <div className="bg-gray-300 w-[48px] h-[48px] rounded-full"></div>
            <div className="flex-1 h-[20px] bg-gray-300 rounded-md"></div>
            <div className="w-[25px] h-[25px] bg-gray-300 rounded-md"></div>
          </div>
        </div>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex px-6 justify-start items-center gap-3 max-w-[550px] w-[95%] h-[70px] sm:w-[75%] rounded-full bg-gray-200 relative border-[1px] border-gray-300"
          >
            <div className="bg-gray-300 w-[45px] h-[45px] rounded-full"></div>
            <div className="flex flex-col gap-1">
              <div className="w-[100px] h-[14px] bg-gray-300 rounded-md"></div>
              <div className="w-[150px] h-[14px] bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonAttachment = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="bg-gray-300 w-[50px] h-[50px] rounded-full"></div>
      <div className="flex flex-col">
        <div className="bg-gray-300 h-[18px] w-[150px] mb-2 rounded-lg"></div>
        <div className="bg-gray-300 h-[14px] w-[100px] rounded-lg"></div>
      </div>
    </div>
  );
};
