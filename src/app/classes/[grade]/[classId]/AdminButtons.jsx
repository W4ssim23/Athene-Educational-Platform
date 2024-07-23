"use client";

import { useSession } from "next-auth/react";

//will check if the user is an admin or not

export default function AdminButtons({ params }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  if (!session) return null;

  if (!(user.role === "admin")) return null;

  return (
    <div className="w-full flex justify-between">
      <div className="w-full flex items-end justify-end">
        <Settings params={params} />
      </div>
    </div>
  );
}

import Plus from "./icons/Plus";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef } from "react";

function Settings({ params }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            startContent={<Plus />}
            className="cursor-pointer h-12 sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
          >
            Settings
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="AddingStudent">
          <DropdownItem
            key="module"
            onClick={() => {
              onOpen();
            }}
          >
            Add Module
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <AddModule params={params} />
      </Modal>
    </div>
  );
}
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useContext } from "react";
import FetchingContext from "@/app/context";

function AddModule({ params }) {
  const [error, setError] = useState("");
  const [validName, setValidName] = useState(false);
  const [valid, setValid] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teacherIds, setTeacherIds] = useState("");
  const [teacherPfps, setTeacherPfps] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { modules, setModules } = useContext(FetchingContext);

  const onCloseRef = useRef(null);

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
      // console.log(data);
      setTeachers(
        data.teachers.map(
          (teacher) => teacher.firstName + " " + teacher.lastName
        )
      );
      setTeacherIds(data.teachers.map((teacher) => teacher.id));
      setTeacherPfps(data.teachers.map((teacher) => teacher.pfp));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddModule = async () => {
    if (valid && validName) {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/classes/${params.grade}/${params.classId}/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: moduleName,
              teacherName: teachers[Number(teacherName)],
              teacherId:
                teacherIds[teachers.indexOf(teachers[Number(teacherName)])],
              teacherPfp:
                teacherPfps[teachers.indexOf(teachers[Number(teacherName)])],
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log("Failed to add module:", data);
          setLoading(false);
        } else {
          console.log("Module added:", data);
          setModules([...modules, data.module]);
          setLoading(false);
          onCloseRef.current();
        }
      } catch (error) {
        console.error("Error adding module:", error);
        setError(error.message);
      }
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Module
            </ModalHeader>
            <ModalBody>
              <Input
                label="Module Name"
                variant="bordered"
                isInvalid={!validName}
                errorMessage={error}
                onChange={(e) => {
                  setModuleName(e.target.value);
                  if (e.target.value.length < 3) {
                    setError("Module name must be at least 3 characters long");
                    setValidName(false);
                  } else {
                    setError("");
                    setValidName(true);
                  }
                }}
              />
              <Select
                label="Teacher"
                placeholder="Select a teacher"
                isLoading={isLoading}
                isInvalid={!valid}
                errorMessage={error}
                onChange={(e) => {
                  setTeacherName(e.target.value);
                  if (e.target.value === "") {
                    setError("Required");
                    setValid(false);
                  } else {
                    setError("");
                    setValid(true);
                  }
                }}
              >
                {teachers.map((teacher, index) => (
                  <SelectItem key={index} value={teacher}>
                    {teacher}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                onPress={() => {
                  handleAddModule();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}
