"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker,
  TimeInput,
  Textarea,
  Checkbox,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRef, useState, useContext } from "react";
import FetchingContext from "@/app/context";

export default function AddForm({ title = "" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const { events, setEvents } = useContext(FetchingContext);

  const [eventDate, setEventDate] = useState(null);
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);

  const onSubmit = async (data) => {
    // Validate the date and time before submitting
    if (!eventDate) {
      setDateError("Date is required");
      return;
    } else {
      setDateError(null);
    }

    if (!eventStart) {
      setTimeError("Start time is required");
      return;
    } else {
      setTimeError(null);
    }

    if (
      eventEnd &&
      eventStart &&
      (eventEnd.hour < eventStart.hour ||
        (eventEnd.hour === eventStart.hour &&
          eventEnd.minute < eventStart.minute))
    ) {
      setTimeError("End time must be after start time");
      return;
    } else {
      setTimeError(null);
    }

    const formattedData = {
      title: data.title,
      date: new Date(
        eventDate.year,
        eventDate.month - 1,
        eventDate.day
      ).toISOString(),
      start: `${eventStart.hour}:${eventStart.minute}:${eventStart.second}`,
      description: data.eventDiscreption,
      eventEnd: eventEnd
        ? `${eventEnd.hour}:${eventEnd.minute}:${eventEnd.second}`
        : undefined,
      votes: data.votes,
      yesVotes: [],
      noVotes: [],
    };

    try {
      const response = await fetch("/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("Event added successfully:", result);

      // Update the events list
      setEvents([result.event, ...events]);

      // Close the modal
      onCloseRef.current();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Event</ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="Title"
                  variant="bordered"
                  defaultValue={title}
                  {...register("title", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.title}
                  errorMessage={errors?.title?.message ?? ""}
                />
                <Textarea
                  label="Event Description"
                  variant="bordered"
                  {...register("eventDiscreption", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.eventDiscreption}
                  errorMessage={errors?.eventDiscreption?.message ?? ""}
                />
                <DatePicker
                  name="eventDate"
                  className="mt-3 sm:mt-0"
                  label="Event Date"
                  variant="bordered"
                  isInvalid={dateError}
                  errorMessage={dateError}
                  onChange={(e) => setEventDate(e)}
                />
                <TimeInput
                  label="Event Starts at"
                  variant="bordered"
                  isInvalid={timeError}
                  errorMessage={timeError}
                  onChange={(e) => setEventStart(e)}
                />
                <TimeInput
                  className="mt-3 sm:mt-0"
                  label="Event Ends at"
                  variant="bordered"
                  onChange={(e) => setEventEnd(e)}
                />
                <Checkbox {...register("votes")}>Votes</Checkbox>
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
