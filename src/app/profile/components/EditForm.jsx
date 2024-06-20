"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { filterEmptyValues } from "@/lib";
import { useSession } from "next-auth/react";

export default function EditForm({ user }) {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const handleSessionUpdate = async (data) => {
    await update({
      ...session,
      user: {
        ...session.user,
        ...data,
      },
    });
  };

  const onSubmit = async (data) => {
    if (Object.keys(filterEmptyValues(data)).length === 0) {
      onCloseRef.current();
      return;
    }

    try {
      const response = await fetch("/api/profile/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filterEmptyValues(data), id: user.id }),
      });

      const res = await response.json();
      // console.log(res);

      if (response.ok) {
        await handleSessionUpdate(filterEmptyValues(data));
        onCloseRef.current();
      }
    } catch (error) {
      console.error("EditForm error:", error);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Profile
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
                  isDisabled={!user.isAdmin}
                  {...register("firstName", {
                    validate: (value) => {
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
                  isDisabled={!user.isAdmin}
                  {...register("lastName", {
                    validate: (value) => {
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
                <Textarea
                  label="About"
                  placeholder={user.about}
                  variant="bordered"
                  {...register("about")}
                />
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
