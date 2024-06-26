"use client";

import { Button, Avatar } from "@nextui-org/react";
import Plus from "../Icons/Pluss";
import { Modal, useDisclosure } from "@nextui-org/modal";
import AddForm from "./AddForm";
import { useRef } from "react";

//TO ADD MODEL OF THE ADDING FORM

function AddingElement({ role, pfp }) {
  if (!(role === "admin")) return null;

  const inputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="relative flex justify-evenly 
        items-center gap-3 py-4 sm:py-2 sm:w-[75%] w-[100%] min-h-[110px] rounded-xl overflow-hidden bg-white px-2"
      >
        <div className="absolute top-0 w-full h-[10px] left-0 sm:h-full sm:w-[10px] bg-primary"></div>
        <div className="flex flex-row items-center gap-4 p-2 sm:pl-[1.5%] rounded-full bg-bgfakeWhite h-[50px] w-[60%] sm:w-[75%] sm:min-w-[220px] sm:max-w-[650px] sm:h-[70px] sm:ml-[25px]">
          <Avatar
            src={pfp}
            size="large"
            fallback
            className="hidden sm:flex w-[45px] h-[45px] min-w-[45px] sm:w-[55px] sm:h-[55px] sm:min-w-[55px]"
          />
          <input
            id="addEventInput"
            className=" text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 min-w-[100px]"
            type="text"
            placeholder="Add Event ..."
            ref={inputRef}
          />
        </div>
        <Button
          className="cursor-pointer h-[50px] sm:h-[55px] sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
          startContent={<Plus />}
          onClick={onOpen}
        >
          Add
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <AddForm title={inputRef?.current?.value ?? ""} />
      </Modal>
    </>
  );
}

export default AddingElement;
