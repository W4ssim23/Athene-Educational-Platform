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
import { useRef, useState } from "react";
import { filterEmptyValues } from "@/lib";

//toast message

export default function AddForm({ student }) {
  const grades = ["lycee", "cem", "prm"];
  //will fetch classes based on the selected grade this is temporary
  const classes = ["1S1", "2m2", "1p1"];
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  //   const [classes, setClasses] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const onSubmit = async (data) => {
    // Filter out empty values
    if (data.grade === student.grade) {
      data.grade = undefined;
    }
    if (data.class === student.class) {
      data.class = undefined;
    }
    if (data.gender.toLowerCase() === student.gender.toLowerCase()) {
      data.gender = undefined;
    }

    const filteredData = filterEmptyValues(data);

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
        console.log("Student updated successfully:", result);
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
                  defaultSelectedKeys={[student.grade ?? ""]}
                  variant="bordered"
                  {...register("grade", {
                    validate: (value) => {
                      if (value.length === 0) return "Grade is required";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.grade}
                  errorMessage={errors?.grade?.message ?? ""}
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
                  defaultSelectedKeys={[student.className ?? ""]}
                  variant="bordered"
                  {...register("class", {
                    validate: (value) => {
                      if (value.length === 0) return "Class is required";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.class}
                  errorMessage={errors?.class?.message ?? ""}
                >
                  {classes.map((aclass) => (
                    <SelectItem key={aclass} value={aclass}>
                      {aclass}
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
