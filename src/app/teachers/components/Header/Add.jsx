"use client";

import AddCSV from "./AddCSV";
import AddForm from "./AddForm";
import Plus from "./Plus";
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

export default function Add() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [multiple, setMultiple] = useState(false);
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            startContent={<Plus />}
            className="cursor-pointer h-12 sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
          >
            Add
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="AddingStudent">
          <DropdownItem
            key="oneadd"
            onClick={() => {
              onOpen();
              if (multiple) setMultiple(false);
            }}
          >
            Add one Teacher
          </DropdownItem>
          <DropdownItem
            key="csvadd"
            onClick={() => {
              onOpen();
              if (!multiple) setMultiple(true);
            }}
          >
            Add via CSV
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        {!multiple && <AddForm />}
        {multiple && <AddCSV />}
      </Modal>
    </div>
  );
}
