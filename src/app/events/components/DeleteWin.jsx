"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState, useRef, useContext } from "react";
import FetchingContext from "@/app/context";

export default function Delete({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const onCloseRef = useRef(null);
  const { events, setEvents } = useContext(FetchingContext);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: data.id }),
      });

      const result = await response.json();

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== data.id));
        onCloseRef.current();
      } else {
        alert(result.message);
        onCloseRef.current();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Event
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex flex-col gap-6 items-center justify-center ">
                <p className="text-red font-bold text-[17px]">
                  Are you sure you want to delete
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
        );
      }}
    </ModalContent>
  );
}
