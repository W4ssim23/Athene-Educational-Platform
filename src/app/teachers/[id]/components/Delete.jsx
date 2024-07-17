"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";

//toast notification

export default function Delete({ data }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (onClose) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/teachers/${data.id}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        onClose();
        window.location.href = "/teachers";
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Delete Teacher
          </ModalHeader>
          <ModalBody className="flex flex-col items-center">
            <div className="flex flex-col gap-6 items-center justify-center ">
              <p className="text-red font-bold text-[20px]">
                Are you sure you want to delete
              </p>
              <Avatar
                fallback
                src={data.pfp}
                className="w-20 h-20 text-large"
              />
              <p className="text-large font-[600] text-blueTitle">
                {data.lastName} {data.firstName}
              </p>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center gap-6">
            <Button color="primary" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => handleDelete(onClose)}
              isLoading={loading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
}
