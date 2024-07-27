"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRef, useState, useContext, useEffect } from "react";
import { filterEmptyValues } from "@/lib";
import FetchingContext from "@/app/context";

//toast message

export default function AddForm({ student }) {
  const grades = ["lycee", "cem", "primaire"];

  const [gradesClasses, setGradesClasses] = useState({
    cem: [],
    lycee: [],
    primaire: [],
  });
  const [classes, setClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [gradeError, setGradeError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classError, setClassError] = useState(null);

  const { students, setStudents } = useContext(FetchingContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setClassesLoading(true);
      try {
        const response = await fetch("/api/classes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch classes");
          return;
        }

        const data = await response.json();
        setGradesClasses({
          cem: data.classes.cem || [],
          lycee: data.classes.lycee || [],
          primaire: data.classes.primaire || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setClassesLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const onSubmit = async (data) => {
    const sendData = data;
    // Filter out empty values
    if (selectedGrade && selectedGrade !== student.grade) {
      sendData.grade = selectedGrade;
    }
    if (selectedClass && selectedClass !== student.className) {
      sendData.className = selectedClass;
      const selectedClassObj = classes.find(
        (classs) => classs.name === selectedClass
      );
      sendData.classId = selectedClassObj.id;
    }
    if (sendData.gender.toLowerCase() === student.gender.toLowerCase()) {
      sendData.gender = undefined;
    }

    const filteredData = filterEmptyValues(sendData);

    if (Object.keys(filterEmptyValues(data)).length === 0) {
      onCloseRef.current();
      return;
    }
    filteredData.id = student.id;
    console.log("Filtered data:", filteredData);

    try {
      const response = await fetch("/api/students/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const result = await response.json();
      if (response.ok) {
        // Update the student in the students list
        const updatedStudents = students.map((s) =>
          s.id === student.id ? { ...s, ...filteredData } : s
        );
        setStudents(updatedStudents);
        onCloseRef.current();
      } else {
        console.error("Error updating student:", result.message);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Student
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=" w-full sm:flex sm:gap-4">
                  <Input
                    label="First Name"
                    placeholder={student.firstName ?? ""}
                    variant="bordered"
                    {...register("firstName", {
                      validate: (value) => {
                        if (value.length >= 2 || value.length === 0)
                          return true;
                        return "Must be at least 2 characters long";
                      },
                    })}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors?.firstName?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    label="Last Name"
                    placeholder={student.lastName ?? ""}
                    variant="bordered"
                    {...register("lastName", {
                      validate: (value) => {
                        if (value.length >= 2 || value.length === 0)
                          return true;
                        return "Must be at least 2 characters long";
                      },
                    })}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors?.lastName?.message ?? ""}
                  />
                </div>
                <div className=" w-full sm:flex sm:gap-4">
                  <Input
                    label="Prent Name"
                    placeholder={student.parentName ?? ""}
                    variant="bordered"
                    {...register("parentName", {
                      validate: (value) => {
                        if (value.length >= 2 || value.length === 0)
                          return true;
                        return "Must be at least 2 characters long";
                      },
                    })}
                    isInvalid={!!errors.parentName}
                    errorMessage={errors?.parentName?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    placeholder={student.address ?? ""}
                    label="Address"
                    variant="bordered"
                    {...register("address", {
                      validate: (value) => {
                        if (value.length >= 2 || value.length === 0)
                          return true;
                        return "Must be at least 2 characters long";
                      },
                    })}
                    isInvalid={!!errors.address}
                    errorMessage={errors?.address?.message ?? ""}
                  />
                </div>
                <div className=" w-full sm:flex sm:gap-4">
                  <Input
                    label="Phone"
                    placeholder={student.phone ?? ""}
                    type="tel"
                    variant="bordered"
                    {...register("phone", {
                      validate: (value) => {
                        if (value.length >= 10 || value.length === 0)
                          return true;
                        return "Phone number not valid";
                      },
                    })}
                    isInvalid={!!errors.phone}
                    errorMessage={errors?.phone?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    label="Email"
                    placeholder={student.email ?? ""}
                    variant="bordered"
                    {...register("email", {
                      validate: (value) => {
                        if (
                          (value.includes("@") && value.includes(".")) ||
                          value.length === 0
                        )
                          return true;
                      },
                    })}
                    isInvalid={!!errors.email}
                    errorMessage={errors?.email?.message ?? ""}
                  />
                </div>
                <Select
                  label="Grades"
                  placeholder="Select a Grade"
                  // defaultSelectedKeys={[student.grade ?? ""]}
                  variant="bordered"
                  isLoading={classesLoading}
                  onChange={(e) => {
                    if (e.target.value === selectedGrade) return;
                    setSelectedGrade(e.target.value);
                    setClasses(gradesClasses[e.target.value]);
                    setGradeError(null);
                  }}
                  isInvalid={!!gradeError}
                  errorMessage={gradeError ?? ""}
                >
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Class"
                  placeholder="Select a Class"
                  // defaultSelectedKeys={[student.className ?? ""]}
                  variant="bordered"
                  isLoading={classesLoading}
                  onChange={(e) => {
                    if (e.target.value === selectedClass) return;
                    setSelectedClass(e.target.value);
                    setClassError(null);
                  }}
                  isInvalid={!!classError}
                  errorMessage={classError ?? ""}
                >
                  {(classes || []).map((aclass) => (
                    <SelectItem key={aclass.name} value={aclass.name}>
                      {aclass.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Gender"
                  placeholder="Select a Gender"
                  defaultSelectedKeys={[student.gender.toLowerCase()]}
                  variant="bordered"
                  {...register("gender", {
                    validate: (value) => {
                      if (value.length === 0) return "Gender is required";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.gender}
                  errorMessage={errors?.gender?.message ?? ""}
                >
                  <SelectItem value="male" key={"male"}>
                    Male
                  </SelectItem>
                  <SelectItem value="female" key={"female"}>
                    Female
                  </SelectItem>
                </Select>
                <button
                  ref={submitButtonRef}
                  className="hidden"
                  type="submit"
                ></button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitButtonRef.current.click()}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}
