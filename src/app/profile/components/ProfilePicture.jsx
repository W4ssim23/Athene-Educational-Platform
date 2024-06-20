import { Avatar, Modal, useDisclosure } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import UploadPfP from "./UploadPfP";

export default function ProfilePicture({ pfp }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className="group  rounded-full flex items-center relative justify-center cursor-pointer
                    border-4 border-white ml-[15px] mt-[55px] h-[115px] w-[115px] p-0"
      onClick={onOpen}
    >
      <Avatar
        fallback
        src={pfp}
        className="rounded-full object-cover w-full h-full"
      />
      {/* hover : */}
      <div
        className="absolute flex justify-center items-center top-1/2 left-1/2 rounded-full w-full h-full transform -translate-x-1/2 -translate-y-1/2
                     text-white text-center bg-gray-500 bg-opacity-75px-2 py-1
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="flex justify-center items-center">
          <PencilIcon className={`h-[30px] text-white cursor-pointer`} />
        </div>
      </div>
      {/* PopUp : */}
      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="m-1 sm:m-0"
        >
          <UploadPfP pfp={pfp} />
        </Modal>
      </>
    </div>
  );
}
