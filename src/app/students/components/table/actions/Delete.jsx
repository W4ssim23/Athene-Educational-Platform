"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";

export default function Delete({ data }) {
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Student
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex flex-col gap-6 items-center justify-center ">
                <p className=" text-red font-bold text-[20px]">
                  Are you sure u want to delete
                </p>
                <Avatar src={data.pfp} className="w-20 h-20 text-large" />
                <p className="text-large font-[600] text-blueTitle">
                  {data.lastName} {data.firstName}
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-6">
              <Button color="primary" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onClick={onClose}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}
