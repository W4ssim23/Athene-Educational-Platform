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
import { useRef, useContext } from "react";
import FetchingContext from "@/app/context";

export default function AddForm() {
  const specialities = ["Primaire", "Cem", "Lycee"];

  const { teachers, setTeachers } = useContext(FetchingContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const onSubmit = async (data) => {
    // console.log("submition !");
    // console.log(data);
    try {
      const response = await fetch("/api/teachers/addone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // console.log("request sent");

      if (response.ok) {
        const result = await response.json();
        // console.log("Teacher registered successfully:", result);
        setTeachers([...teachers, result.teacher]);
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
              Add Teacher
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="First Name"
                  variant="bordered"
                  {...register("firstName", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors?.firstName?.message ?? ""}
                />
                <Input
                  label="Last Name"
                  variant="bordered"
                  {...register("lastName", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors?.lastName?.message ?? ""}
                />
                <Input
                  label="Address"
                  variant="bordered"
                  {...register("address", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.address}
                  errorMessage={errors?.address?.message ?? ""}
                />
                <Input
                  label="Phone"
                  type="tel"
                  variant="bordered"
                  {...register("phone", {
                    validate: (value) => {
                      if (value.length === 0) return "Phone number required";
                      if (value.length >= 10) return true;
                      return "Phone number not valid";
                    },
                  })}
                  isInvalid={!!errors.phone}
                  errorMessage={errors?.phone?.message ?? ""}
                />
                <Input
                  label="Email"
                  variant="bordered"
                  {...register("email", {
                    validate: (value) => {
                      if (value.length === 0) return "Email required";
                      if (value.includes("@") && value.includes("."))
                        return true;
                      return "Email not valid";
                    },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors?.email?.message ?? ""}
                />
                <Select
                  label="Teacher of"
                  variant="bordered"
                  {...register("speciality", {
                    validate: (value) => {
                      if (value.length === 0) return "Required";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.speciality}
                  errorMessage={errors?.speciality?.message ?? ""}
                >
                  {specialities.map((speciality) => (
                    <SelectItem key={speciality} value={speciality}>
                      {speciality}
                    </SelectItem>
                  ))}
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
