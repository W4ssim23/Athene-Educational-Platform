"use client";

import { NoStudent } from "@/assets";
import Image from "next/image";
import EventElement from "./EventElement";
import AddingElement from "./AddingElement";
import { useSession } from "next-auth/react";
import { useEffect, useContext } from "react";
import FetchingContext from "@/app/context";

function EventsList() {
  const { data: session } = useSession();
  const { events, setEvents } = useContext(FetchingContext);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch events");
        setEvents([]);
        return;
      }

      const data = await response.json();
      // console.log(data.events);
      setEvents(data.events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    // if (events?.length) {
    //   console.log("updated !");
    // }
  }, [events]);

  if (!events || !session) return <p>Skeleton</p>;

  if (events.length === 0) {
    return (
      <div className="flex w-[89vw] xs:w-full flex-col gap-3 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
        <AddingElement role={session.user.role} pfp={session.user.pfp} />
        <div className="m-4 flex flex-col flex-wrap w-[75%] justify-center items-center gap-2 rounded-xl p-2 py-8">
          <Image
            src={NoStudent}
            alt="No students"
            className="mb-3 mt-6 ss:mt-0"
          />
          <h1 className="text-lg font-bold text-[#303972]">
            No Events at this time
          </h1>
          <h3 className="text-center">
            You will get notified as soon as new events are posted
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[89vw] xs:w-full flex-col gap-6 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
      <AddingElement role={session.user.role} pfp={session.user.pfp} />
      {events.map((event, indx) => (
        <EventElement
          id={event.id}
          key={indx}
          role={session.user.role}
          eventData={event}
          voterId={session.user.id}
          voterName={session.user.firstName + " " + session.user.lastName}
        />
      ))}
    </div>
  );
}

export default EventsList;
