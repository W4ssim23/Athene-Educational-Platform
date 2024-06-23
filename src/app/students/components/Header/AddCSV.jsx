"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { useRef } from "react";

export default function AddCsv() {
  const [file, setFile] = useState(null);
  const onCloseRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [ableToUpload, setAbleToUpload] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
    if (!ableToUpload) setAbleToUpload(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      //sending csv logic
      //   should get its own api with errors handling (file errors)
      //
      // closing :
      onCloseRef.current();
      setUploading(false);
    } catch (e) {
      setUploading(false);
      console.error(e);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add with CSV
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={["CSV"]}
                maxSize={1}
              />
            </ModalBody>
            <ModalFooter className="flex justify-center gap-6">
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onClick={submit}
                isLoading={uploading}
                isDisabled={!ableToUpload}
              >
                Upload
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}
