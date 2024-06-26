"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DateInput,
  TimeInput,
  Textarea,
  Checkbox,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export default function EditForm({ event }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  //dir hasbk ki tb3t data 3la l object t3 date w time
  const onSubmit = async (data) => {
    console.log("submition !");
    // console.log(data);
    // this time this one is diffrent , it should ignore grade class and gender if they are similar to the old data
    // i can just exclude the ampty fields , and compare the rest with the old data , that's why i changed the prop name to student
    // if (Object.keys(filterEmptyValues(data)).length === 0) {
    //   onCloseRef.current();
    //   return;
    // }

    // try {
    //   const response = await fetch("/api/profile/edit", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ...filterEmptyValues(data), id: user.id }),
    //   });

    //   const res = await response.json();
    //   // console.log(res);

    //   if (response.ok) {
    //     await handleSessionUpdate(filterEmptyValues(data));
    //     onCloseRef.current();
    //   }
    // } catch (error) {
    //   console.error("EditForm error:", error);
    // }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Event
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="Title"
                  variant="bordered"
                  placeholder={event.title}
                  {...register("title", {
                    validate: (value) => {
                      if (value.length >= 2 || value.length === 0) return true;
                      if (value === event.title) return "Must be different";
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.title}
                  errorMessage={errors?.title?.message ?? ""}
                />
                <DateInput
                  name="EventDate"
                  className="mt-3 sm:mt-0"
                  label="Event Date"
                  variant="bordered"
                  placeholder={event.date}
                  {...register("eventDate", {
                    validate: (value) => {
                      //add the must be difrent from the old data
                      if (!value) return "Non Valid";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.eventDate}
                  errorMessage={errors?.eventDate?.message ?? ""}
                />
                <TimeInput
                  label="Event Starts at"
                  variant="bordered"
                  placeholder={event.start}
                  {...register("eventStart", {
                    validate: (value) => {
                      //add the must be difrent from the old data
                      if (!value) return "Non Valid";
                      return true;
                    },
                  })}
                  isInvalid={!!errors.eventStart}
                  errorMessage={errors?.eventStart?.message ?? ""}
                  //   onChange={(e) => console.log(e)}
                />
                <Textarea
                  label="Event Discrption"
                  variant="bordered"
                  placeholder={event.description}
                  {...register("eventDiscreption", {
                    validate: (value) => {
                      if (value.length >= 2 || value.length === 0) return true;
                      if (value === event.eventDiscreption)
                        return "Must be different";
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.eventDiscreption}
                  errorMessage={errors?.eventDiscreption?.message ?? ""}
                />
                <TimeInput
                  className="mt-3 sm:mt-0"
                  label="Event End at"
                  variant="bordered"
                  placeholder={event?.eventEnd ?? ""}
                  {...register("eventEnd")}
                />
                <Checkbox {...register("votes")} defaultSelected={event.votes}>
                  Votes
                </Checkbox>
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
