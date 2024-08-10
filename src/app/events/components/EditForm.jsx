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
import { parseAbsoluteToLocal, Time } from "@internationalized/date";
import FetchingContext from "@/app/context";

// TO DO : a bug in displaying the 12 pm time , it shows 11 instead

export default function EditForm({ event }) {
  const { events, setEvents } = useContext(FetchingContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const [eventDate, setEventDate] = useState(
    parseAbsoluteToLocal(event.date + "T18:45:22Z")
  );

  let eventStartHour = Number(event.start.substring(0, 2));
  if (event.start.endsWith("PM")) {
    eventStartHour += 12;
  }
  const [eventStart, setEventStart] = useState(
    new Time(eventStartHour, event.start.substring(3, 5))
  );

  let tempEnd = null;
  if (event.end) {
    let eventEndHour = Number(event.end.substring(0, 2));
    if (event.end.endsWith("PM")) {
      eventEndHour += 12;
    }
    tempEnd = new Time(eventEndHour, event.end.substring(3, 5));
  }
  const [eventEnd, setEventEnd] = useState(tempEnd);

  const formatDate = (date) => {
    const year = date.year.toString().padStart(2, "0");
    const month = date.month.toString().padStart(2, "0");
    const day = date.day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time) => {
    const h = time.hour < 12 ? "AM" : "PM";
    const hour = time.hour <= 12 ? time.hour : time.hour - 12;
    const minute = time.minute;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${h}`;
  };

  const onSubmit = async (data) => {
    //
    //ignore all the ifs kadtni lmao
    const filteredData = {};
    if (data.title && data.title !== event.title) {
      filteredData.title = data.title;
    }
    if (data.eventDescription && data.eventDescription !== event.description) {
      filteredData.description = data.eventDescription;
    }
    if (data.votes !== undefined && data.votes !== event.votes) {
      filteredData.votes = data.votes;
    }

    //
    //
    if (eventDate && formatDate(eventDate) !== event.date) {
      filteredData.date = formatDate(eventDate);
    }
    if (eventStart && formatTime(eventStart) !== event.start) {
      filteredData.start = eventStart.toString();
    }
    if (eventEnd && formatTime(eventEnd) !== event.end) {
      filteredData.eventEnd = eventEnd.toString();
    }

    if (Object.keys(filteredData).length === 0) {
      onCloseRef.current();
      return;
    }

    filteredData.id = event.id;

    try {
      const response = await fetch("/api/events/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const result = await response.json();
      if (response.ok) {
        const updatedEvents = events.map((e) =>
          e.id === event.id
            ? {
                ...e,
                ...filteredData,
                start: formatTime(eventStart),
                ...(eventEnd && { end: formatTime(eventEnd) }),
              }
            : e
        );
        setEvents(updatedEvents);
        onCloseRef.current();
      } else {
        console.error("Error updating event:", result.message);
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
                <Textarea
                  label="Event Description"
                  variant="bordered"
                  placeholder={event.description}
                  {...register("eventDescription", {
                    validate: (value) => {
                      if (value.length >= 2 || value.length === 0) return true;
                      if (value === event.description)
                        return "Must be different";
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.eventDescription}
                  errorMessage={errors?.eventDescription?.message ?? ""}
                />
                <DatePicker
                  name="EventDate"
                  className="mt-3 sm:mt-0"
                  label="Event Date"
                  variant="bordered"
                  granularity="day"
                  defaultValue={eventDate}
                  onChange={setEventDate}
                />
                <TimeInput
                  label="Event Starts at"
                  variant="bordered"
                  defaultValue={eventStart}
                  onChange={setEventStart}
                />
                <TimeInput
                  className="mt-3 sm:mt-0"
                  label="Event Ends at"
                  variant="bordered"
                  defaultValue={eventEnd}
                  onChange={setEventEnd}
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
