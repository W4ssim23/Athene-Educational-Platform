"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";
import { useRef, useState, useContext } from "react";
import FetchingContext from "@/app/context";
import Link from "next/link";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// remaianing job : check the lenght of the fields , if the spelling is correct , if the class exists

export default function AddCsv() {
  const [file, setFile] = useState(null);
  const onCloseRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [ableToUpload, setAbleToUpload] = useState(false);

  const { students, setStudents } = useContext(FetchingContext);

  const handleFileChange = (file) => {
    setFile(file);
    if (!ableToUpload) setAbleToUpload(true);
  };

  const validateStudentData = (students) => {
    return students.every((student) => {
      const {
        firstName,
        lastName,
        parentName,
        address,
        phone,
        email,
        grade,
        className,
        gender,
      } = student;
      return (
        firstName &&
        lastName &&
        parentName &&
        address &&
        phone &&
        email &&
        grade &&
        className &&
        gender
      );
    });
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        if (file.type === "text/csv") {
          const parsedData = Papa.parse(data, { header: true });
          resolve(parsedData.data);
        } else if (
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel"
        ) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } else {
          reject("Unsupported file type");
        }
      };
      if (file.type === "text/csv") {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const studentss = await readFile(file);

      if (!validateStudentData(studentss)) {
        throw new Error("Invalid student data in file");
      }

      const response = await fetch("/api/students/addcsv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentss),
      });

      if (!response.ok) {
        throw new Error("Failed to upload students");
      }

      //updating students list
      const result = await response.json();
      // console.log("Student registered successfully:", result);
      setStudents([...students, ...result.students]);

      // closing modal and reset states
      onCloseRef.current();
      setFile(null);
      setAbleToUpload(false);
      setUploading(false);

      alert("Students registered successfully.");
    } catch (e) {
      setUploading(false);
      console.error(e);
      alert("An error occurred: " + e.message);
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
                types={["CSV", "XLSX"]}
                maxSize={1}
              />
              <Link href="/api/students/addcsv/example">
                <p className="text-primary cursor-pointer">
                  Get a file example?
                </p>
              </Link>
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
