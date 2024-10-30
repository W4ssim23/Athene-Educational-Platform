"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Attached from "../Attached";
import { Send, excel, pdf, file } from "@/assets";
import Link from "next/link";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { useRef } from "react";

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
      <AttachmentPage initCourse={course} user={user} params={params} />
    </main>
  );
}

const AttachmentPage = ({ initCourse, user, params }) => {
  const [course, setCourse] = useState(initCourse);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (comment.trim() === "") return;
    setSubmitting(true);

    console.log("Submitting comment:", comment);

    try {
      const response = await fetch(
        `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/${params.courseId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment }),
        }
      );

      if (response.ok) {
        setCourse((prev) => ({
          ...prev,
          comments: [
            ...prev.comments,
            {
              studentName: user.firstName + " " + user.lastName,
              studentPfp: user.pfp,
              comment: comment,
            },
          ],
        }));
        setComment("");
      } else {
        console.log("Failed to submit comment");
        // console.log(await response.json());
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-poppins m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="w-full text-[30px] text-primary font-[700]">
        {`${course.className} >> ${course.moduleName} >> ${course.courseName}`}
      </div>
      <div className="relative flex flex-col rounded-xl bg-white pt-5 gap-3 h-screen overflow-y-scroll px-4 sm:px-14 py-6">
        <div className="p-5 flex items-center justify-between select-none border-b-[1.5px]">
          <Attachment data={course} />
          <Deleting params={params} user={user} />
        </div>
        <Link
          href={course.courseLink}
          passHref
          target="_blank"
          rel="noopener noreferrer"
        >
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
        </Link>
        <div className="flex gap-5 flex-col">
          <p className="font-[600] text-[#A7A7A7] text-[18px] sm:text-[23px] opacity-80">
            Comments Added to the Course
          </p>
          {user.role === "student" && (
            <div className="relative flex px-4 justify-start items-center gap-3 py-4 sm:py-2 max-w-[550px] w-[95%] h-[65px] sm:w-[75%] rounded-full bg-[#F3F4FF]">
              <div>
                <Avatar fallback src={user.pfp} className="w-[48px] h-[48px]" />
              </div>
              <div className="flex-1">
                <input
                  placeholder="Add Comment"
                  type="text"
                  id="addEventInput"
                  className="text-left font-poppins font-[500] bg-transparent outline-none flex-1 w-full"
                  value={comment}
                  onChange={handleCommentChange}
                  autoComplete="off"
                />
              </div>
              <div
                className="cursor-pointer"
                onClick={handleSubmitComment}
                disabled={submitting}
              >
                {submitting && <Spinner />}
                {!submitting && (
                  <Image className="w-[25px] h-[25px]" src={Send} alt="" />
                )}
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

function Deleting({ params, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (user.role === "student") return null;

  return (
    <>
      <div className="">
        <Button
          className="cursor-pointer h-[45px] max-w-[30px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-red rounded-[40px] text-medium"
          startContent={<DeleteIcon />}
          onClick={onOpen}
        ></Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <DeleteConfermation params={params} />
      </Modal>
    </>
  );
}

function DeleteConfermation({ params }) {
  const onCloseRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDelete = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/${params.courseId}/delete`,
        {
          method: "Delete",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        onCloseRef.current();
        window.location.href = `/classes/${params.grade}/${params.classId}/${params.moduleId}`;
      } else {
        console.log("Failed to delete course");
      }
    } catch {
      console.log("Failed to delete course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Course
            </ModalHeader>
            <ModalBody>
              <h1 className="w-full h-full text-center text-red text-lg">
                You sure you want to delete this course ?
              </h1>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center gap-8">
              <Button variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                onPress={onDelete}
                isLoading={isSubmitting}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 48 48"
    >
      <path
        fill="white"
        d="M20.5 4a1.5 1.5 0 00-1.434 2h-2.925a5.5 5.5 0 00-4.577 2.45L9.197 12H7.5a1.5 1.5 0 100 3h2.264a1.5 1.5 0 00.445 0H36.33l-1.572 14.68a1.5 1.5 0 102.982.318L39.348 15H40.5a1.5 1.5 0 100-3h-1.697l-2.367-3.55A5.505 5.505 0 0031.859 6h-2.925A1.5 1.5 0 0027.5 4h-7zm-4.36 5h15.72c.837 0 1.615.416 2.08 1.113L35.196 12H12.803l1.258-1.887a1.5 1.5 0 00.002-.002A2.489 2.489 0 0116.14 9zm-5.568 8.65a1.5 1.5 0 00-1.455 1.68l2.008 18.756A5.519 5.519 0 0016.594 43h14.81a5.519 5.519 0 005.469-4.914l.373-3.48a1.5 1.5 0 10-2.982-.319l-.373 3.479A2.483 2.483 0 0131.404 40h-14.81a2.48 2.48 0 01-2.485-2.234L12.1 19.012a1.5 1.5 0 00-1.527-1.362z"
      ></path>
    </svg>
  );
}
