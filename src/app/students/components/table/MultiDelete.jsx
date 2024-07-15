import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import FetchingContext from "@/app/context";

export default function MultiDelete({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const { students, setStudents } = useContext(FetchingContext);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const studentIds = Array.from(data);
      const response = await fetch("/api/students/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentIds }),
      });

      const result = await response.json();
      // console.log("Result:", result);

      if (response.ok) {
        setStudents(
          students.filter((student) => !studentIds.includes(student.id))
        );
        onClose();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting students:", error);
      alert("An error occurred while deleting the students.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        color="danger"
        variant="flat"
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Students
              </ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                  <p className="text-red font-bold text-[20px] text-center">
                    Are you sure you want to delete these students?
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
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
