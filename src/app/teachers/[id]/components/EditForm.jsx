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
import { filterEmptyValues } from "@/lib";
import FetchingContext from "@/app/context";

export default function EditForm({ user, setTeacher }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const specialities = ["Primaire", "Cem", "Lycee"];

  const { teachers, setTeachers } = useContext(FetchingContext);

  const onSubmit = async (data) => {
    // Filter out empty values

    if (data?.speciality?.toLowerCase() === user?.speciality?.toLowerCase()) {
      data.gender = undefined;
    }

    const filteredData = filterEmptyValues(data);

    if (Object.keys(filterEmptyValues(data)).length === 0) {
      onCloseRef.current();
      return;
    }
    filteredData.id = user.id;
    // console.log("Filtered data:", filteredData);

    try {
      const response = await fetch(`/api/teachers/${user.id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const result = await response.json();
      if (response.ok) {
        if (teachers) {
          const updatedTeachers = teachers.map((s) =>
            s.id === user.id ? { ...s, ...filteredData } : s
          );
          setTeachers(updatedTeachers);
        }
        setTeacher({ ...user, ...filteredData });
        onCloseRef.current();
      } else {
        console.error("Error updating teacher:", result.message);
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
              Edit Teacher
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="First Name"
                  placeholder={user.firstName}
                  variant="bordered"
                  {...register("firstName", {
                    validate: (value) => {
                      if (value === user.firstName)
                        return "Must be different from current name";
                      if (value.length >= 2 || value.length === 0) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors?.firstName?.message ?? ""}
                />
                <Input
                  label="Last Name"
                  placeholder={user.lastName}
                  variant="bordered"
                  {...register("lastName", {
                    validate: (value) => {
                      if (value === user.lastName)
                        return "Must be different from current name";
                      if (value.length >= 2 || value.length === 0) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors?.lastName?.message ?? ""}
                />
                <Input
                  label="Address"
                  placeholder={user.address}
                  variant="bordered"
                  {...register("address", {
                    validate: (value) => {
                      if (value === user.address)
                        return "Must be different from current address";
                      if (value.length >= 2 || value.length === 0) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.address}
                  errorMessage={errors?.address?.message ?? ""}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder={user.phone}
                  variant="bordered"
                  {...register("phone", {
                    validate: (value) => {
                      if (value === user.phone)
                        return "Must be different from current phone";
                      if (value.length >= 10 || value.length === 0) return true;
                      return "Phone number not valid";
                    },
                  })}
                  isInvalid={!!errors.phone}
                  errorMessage={errors?.phone?.message ?? ""}
                />
                <Input
                  label="Email"
                  placeholder={user.email}
                  variant="bordered"
                  {...register("email", {
                    validate: (value) => {
                      if (value === user.email)
                        return "Must be different from current email";
                      if (
                        (value.includes("@") && value.includes(".")) ||
                        value.length === 0
                      )
                        return true;
                      return "Email not valid";
                    },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors?.email?.message ?? ""}
                />
                <Select
                  label="Teacher of"
                  defaultSelectedKeys={[user.speciality ?? ""]}
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
