"use client";

//will check if the user is an admin or not

export default function AdminButtons() {
  return (
    <div className="w-full flex justify-between">
      <div className="w-full flex items-end justify-end">
        <Settings />
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
import { useState } from "react";

function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choice, setChoice] = useState(false);
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
              if (choice) setChoice(false);
            }}
          >
            Add Module
          </DropdownItem>
          <DropdownItem
            key="teacher"
            onClick={() => {
              onOpen();
              if (!choice) setChoice(true);
            }}
          >
            Add Teacher
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        {!choice && <AddModule />}
        {choice && <AddTeacher />}
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

function AddModule() {
  const [error, setError] = useState("");
  const [valid, setValid] = useState(true);
  const [moduleName, setModuleName] = useState("");
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Teacher
            </ModalHeader>
            <ModalBody>
              <Input
                label="Module Name"
                variant="bordered"
                isInvalid={!valid}
                errorMessage={error}
                onChange={(e) => {
                  console.log(e.target.value);
                  setModuleName(e.target.value);
                  if (e.target.value.length < 3) {
                    setError("Module name must be at least 3 characters long");
                    setValid(false);
                  } else {
                    setError("");
                    setValid(true);
                  }
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (valid) onClose();
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

function AddTeacher() {
  const [error, setError] = useState("");
  const [valid, setValid] = useState(true);
  const [teacherName, setTeacherName] = useState("");

  const teachers = [
    "Zouitene Ouassim ",
    "Kanye West",
    "Trump Donald",
    "Lionel Messi",
    "Cristiano Ronaldo",
  ];

  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Teacher
            </ModalHeader>
            <ModalBody className="flex items-center">
              <Select
                label="Teacher"
                placeholder="Select a teacher"
                className="max-w-xs"
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
                {teachers.map((teacher) => (
                  <SelectItem key={teacher}>{teacher}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (valid) onClose();
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
