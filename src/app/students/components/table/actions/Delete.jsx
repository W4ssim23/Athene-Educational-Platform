"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";
import { useState, useRef, useContext } from "react";
import FetchingContext from "@/app/context";

//toast message

export default function Delete({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const onCloseRef = useRef(null);
  const { students, setStudents } = useContext(FetchingContext);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/students/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentIds: [data.id] }),
      });

      const result = await response.json();

      if (response.ok) {
        setStudents(students.filter((student) => student.id !== data.id));
        onCloseRef.current();
      } else {
        alert(result.message);
        onCloseRef.current();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred while deleting the student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Student
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex flex-col gap-6 items-center justify-center ">
                <p className="text-red font-bold text-[20px]">
                  Are you sure you want to delete
                </p>
                <Avatar
                  fallback
                  src={data.pfp}
                  className="w-20 h-20 text-large"
                />
                <p className="text-large font-[600] text-blueTitle">
                  {data.lastName} {data.firstName}
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-6">
              <Button color="primary" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={handleDelete}
                isLoading={isLoading}
                disabled={isLoading}
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
