"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function Delete({ data }) {
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Event
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex flex-col gap-6 items-center justify-center ">
                <p className=" text-red font-bold text-[17px]">
                  Are you sure u want to delete
                </p>
                <p className="font-[600] text-[22px] text-blueTitle mb-5">
                  {data.title}
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
