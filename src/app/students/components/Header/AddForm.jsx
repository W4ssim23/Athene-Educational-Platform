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
import FetchingContext from "@/app/context";

//toast message

export default function AddForm() {
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

  //because we are not obliged to fill the email now :
  const [emailError, setEmailError] = useState(null);

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
    if (!selectedGrade) {
      setGradeError("Grade is required");
      return;
    }

    if (!selectedClass) {
      setClassError("Class is required");
      return;
    }

    if (
      data.email &&
      (!data.email.includes("@") || !data.email.includes("."))
    ) {
      setEmailError("Wrong email format");
      return;
    }

    const selectedClassObj = classes.find(
      (classs) => classs.name === selectedClass
    );

    if (!selectedClassObj) {
      setClassError("Selected class not found");
      return;
    }

    try {
      const response = await fetch("/api/students/addone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          parentName: data.parentName || "Unknown",
          address: data.address || "Unknown",
          email: data.email || "mail@ath.dz",
          grade: selectedGrade,
          classs: selectedClass,
          classId: selectedClassObj.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setStudents([...students, result.student]);
        onCloseRef.current();
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a Student
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full sm:flex sm:gap-4">
                  <Input
                    label="First Name"
                    variant="bordered"
                    {...register("firstName", {
                      validate: (value) =>
                        value.length >= 2 ||
                        "Must be at least 2 characters long",
                    })}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors?.firstName?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    label="Last Name"
                    variant="bordered"
                    {...register("lastName", {
                      validate: (value) =>
                        value.length >= 2 ||
                        "Must be at least 2 characters long",
                    })}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors?.lastName?.message ?? ""}
                  />
                </div>
                <div className="w-full sm:flex sm:gap-4">
                  <Input
                    label="Parent Name"
                    variant="bordered"
                    {...register(
                      "parentName"
                      // , {
                      //   validate: (value) =>
                      //     value.length >= 2 ||
                      //     "Must be at least 2 characters long",
                      // }
                    )}
                    // isInvalid={!!errors.parentName}
                    errorMessage={errors?.parentName?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    label="Address"
                    variant="bordered"
                    {...register(
                      "address"
                      // , {
                      //   validate: (value) =>
                      //     value.length >= 2 ||
                      //     "Must be at least 2 characters long",
                      // }
                    )}
                    // isInvalid={!!errors.address}
                    errorMessage={errors?.address?.message ?? ""}
                  />
                </div>
                <div className="w-full sm:flex sm:gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    variant="bordered"
                    {...register("phone", {
                      validate: (value) => {
                        if (value.length >= 10) return true;
                        if (value.length === 0) return "Phone number required";
                        return "Phone number not valid";
                      },
                    })}
                    isInvalid={!!errors.phone}
                    errorMessage={errors?.phone?.message ?? ""}
                  />
                  <Input
                    className="mt-3 sm:mt-0"
                    label="Email"
                    variant="bordered"
                    {...register(
                      "email"
                      // , {
                      //   validate: (value) => {
                      //     if (value.includes("@") && value.includes("."))
                      //       return true;
                      //     if (value.length === 0) return "Email required";
                      //     return "Email not valid";
                      //   },
                      // }
                    )}
                    isInvalid={emailError}
                    errorMessage={emailError}
                  />
                </div>
                <Select
                  label="Grades"
                  placeholder="Select a Grade"
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
                  variant="bordered"
                  {...register("gender", {
                    validate: (value) =>
                      value.length > 0 || "Gender is required",
                  })}
                  isInvalid={!!errors.gender}
                  errorMessage={errors?.gender?.message ?? ""}
                >
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
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
