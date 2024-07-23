"use client";

import {
  Avatar,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function UploadPfP({ pfp }) {
  const [picture, setPicture] = useState(pfp);
  const [file, setFile] = useState(null);
  const { data: session, update } = useSession();
  const onCloseRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [ableToUpload, setAbleToUpload] = useState(false);

  const handleImageChange = (file) => {
    setFile(file);
    setPicture(URL.createObjectURL(file));
    if (!ableToUpload) setAbleToUpload(true);
  };

  const handleSessionUpdate = async (pfpUrl) => {
    // console.log("Updating session with new pfp:", pfpUrl);
    await update({
      ...session,
      user: {
        ...session.user,
        pfp: pfpUrl,
      },
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const data = new FormData();
      data.set("picture", file);
      data.set("id", session.user.id);
      const res = await fetch("api/profile/uploadpfp", {
        method: "POST",
        body: data,
      });

      // console.log(res);

      if (res.ok) {
        const resData = await res.json();
        if (data) {
          await handleSessionUpdate(resData.pfpUrl);
          onCloseRef.current();
        }
      }

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
              Edit Profile Picture
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <FileUploader
                handleChange={handleImageChange}
                name="Picture"
                types={["JPG", "PNG", "JPEG"]}
                maxSize={5}
              />
              <Avatar
                fallback
                src={picture}
                className="rounded-full h-[150px] w-[150px] "
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
