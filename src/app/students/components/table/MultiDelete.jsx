import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function MultiDelete({ data }) {
  //   console.log(data);
  //   console.log(typeof data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button
        color="danger"
        className="ml-[-10px] mb-1"
        radius="full"
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Students
                </ModalHeader>
                <ModalBody className="flex flex-col items-center">
                  <div className="flex flex-col gap-6 items-center justify-center ">
                    <p className=" text-red font-bold text-[20px] text-center">
                      Are you sure u want to delete these pookie Students ??
                    </p>
                    {/* <Avatar src={data.pfp} className="w-20 h-20 text-large" />
                <p className="text-large font-[600] text-blueTitle">
                  {data.lastName} {data.firstName}
                </p> */}
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
      </Modal>
    </div>
  );
}
