import AddingElement from "./components/AddingElement";
import EventElement from "./components/EventElement";
import EventsList from "./components/EventsList";

export default function Events() {
  return (
    <main className="w-full min-h-screen flex flex-col gap-9 items-center">
      {/* <AddingElement />
      <EventElement eventData={events[0]} role={"admin"} />
      <EventElement eventData={events[1]} role={"admin"} /> */}
      <EventsList />
    </main>
  );
}
