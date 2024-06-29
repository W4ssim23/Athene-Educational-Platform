"use client";
import Plus from "@/app/students/components/Header/Plus";
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

export default function Add({ grade }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedYear, setSelectedYear] = useState(null);

  const years =
    grade === "lycee"
      ? ["1", "2", "3"]
      : grade === "cem"
      ? ["1", "2", "3", "4"]
      : ["1", "2", "3", "4", "5"];

  return (
    <div className="flex flex-col items-end">
      <Button
        onPress={onOpen}
        startContent={<Plus />}
        className="cursor-pointer h-12 sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
      >
        Add Class
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Class
              </ModalHeader>
              <ModalBody className="w-full flex flex-col items-center">
                <Select
                  label="Year"
                  placeholder="Select an Year"
                  className="max-w-xs"
                  onSelectionChange={(e) => {
                    // console.log(e);
                    setSelectedYear(e);
                  }}
                >
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (selectedYear) {
                      setSelectedYear(null);
                      onClose();
                    }
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
