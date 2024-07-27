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
import { useState, useRef, useContext } from "react";
import FetchingContext from "@/app/context";
import { useSession } from "next-auth/react";

export default function Add({ grade }) {
  const { data: session } = useSession();
  console.log("Session:", session);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);

  const { classes, setClasses } = useContext(FetchingContext);

  const onCloseRef = useRef(null);

  const years =
    grade === "lycee"
      ? ["1", "2", "3"]
      : grade === "cem"
      ? ["1", "2", "3", "4"]
      : ["1", "2", "3", "4", "5"];

  const handleSubmit = async () => {
    if (!selectedYear) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/classes/${grade}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: selectedYear.currentKey }),
      });

      const data = await res.json();
      // console.log(data.classs);
      setSelectedYear(null);
      setLoading(false);
      if (res.ok) {
        const updatedClasses = [...classes];
        updatedClasses[selectedYear.currentKey - 1].push(data.classs);
        setClasses(updatedClasses);
        onCloseRef.current();
      }
    } catch (error) {
      setLoading(false);
      console.error("Add class error:", error);
    }
  };

  if (!session || session.user.role !== "admin") return null;

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
          {(onClose) => {
            onCloseRef.current = onClose;
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Class
                </ModalHeader>
                <ModalBody className="w-full flex flex-col items-center">
                  <Select
                    label="Year"
                    placeholder="Select a Year"
                    className="max-w-xs"
                    onSelectionChange={(e) => setSelectedYear(e)}
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
                    isLoading={loading}
                    color="primary"
                    onPress={() => {
                      if (selectedYear) {
                        handleSubmit();
                      }
                    }}
                  >
                    Add
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
