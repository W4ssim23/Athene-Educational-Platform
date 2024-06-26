//Contain both the adding and the listing of events
"use client";

import { NoStudent } from "@/assets";
import Image from "next/image";
import EventElement from "./EventElement";
import AddingElement from "./AddingElement";

import { useSession } from "next-auth/react";

function EventsList() {
  const { data: session } = useSession();
  if (!session) return <p>Skeleton</p>;
  const { user } = session;

  //will be fetched and display a skeleton while loading , and while getting the session too
  const events = [
    {
      id: "1QTMC01FF97",
      title: "Absence",
      date: "2024-04-24",
      start: "08:00 AM",
      description: "Kanye West will be absent today.",
      votes: false,
      votersListYes: [],
      votersListNo: [],
      end: "",
    },
    {
      id: "1QLKM01FF97",
      title: "Debate Tournament",
      date: "2022-10-05",
      start: "2:00 PM",
      description:
        "Witness the clash of ideas and rhetoric as students engage in a heated debate competition.",
      votes: true,
      votersListYes: [],
      votersListNo: [],
      end: "",
    },
    {
      id: "1QKMC01F486",
      title: "Science Fair",
      date: "2022-10-01",
      start: "10:00 AM",
      description:
        "Students showcase their innovative science projects and compete for top prizes.",
      votes: false,
      votersListYes: [],
      votersListNo: [],
      end: "",
    },
    {
      id: "1QKMDMLF97",
      title: "Book Fair",
      date: "2022-10-10",
      start: "9:00 AM",
      description:
        "Explore a wide range of books and encourage a love for reading at this annual book fair.",
      votes: false,
      votersListYes: [],
      votersListNo: [],
      end: "3:00 PM",
    },
    {
      id: "QNHMC01FF97",
      title: "Talent Show",
      date: "2022-10-15",
      start: "3:00 PM",
      description:
        "Celebrate the diverse talents of students as they perform on stage in this entertaining showcase.",
      votes: true,
      votersListYes: [],
      votersListNo: [],
      end: "",
    },
    {
      id: "1QKMGFDF97",
      title: "Career Day",
      date: "2022-10-20",
      start: "11:00 AM",
      description:
        "Professionals from various industries share their experiences and insights to help students explore future career paths.",
      votes: true,
      votersListYes: [],
      votersListNo: [],
      end: "2:00 PM",
    },
  ];

  //   const events = [];

  if (events.length === 0) {
    return (
      <>
        <div className="flex  w-[89vw] xs:w-full flex-col gap-3 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
          <AddingElement role={user.role} pfp={user.pfp} />
          <div className="m-4 flex flex-col flex-wrap w-[75%]  justify-center items-center gap-2 rounded-xl p-2 py-8">
            <Image
              src={NoStudent}
              alt="No students"
              className="mb-3 mt-6 ss:mt-0"
            />
            <h1 className="text-lg font-bold text-[#303972]">
              No Events at this time
            </h1>
            <h3 className=" text-center">
              You will get notified as soon as new events are posted
            </h3>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex  w-[89vw] xs:w-auto flex-col gap-6 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
          <AddingElement role={user.role} pfp={user.pfp} />
          {events.map((event, indx) => {
            return (
              <EventElement key={indx} role={user.role} eventData={event} />
            );
          })}
        </div>
      </>
    );
  }
}

export default EventsList;
