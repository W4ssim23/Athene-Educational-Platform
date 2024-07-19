import { EventElementSkeleton } from "./components/EventsList";

export default function Loading() {
  return (
    <>
      <EventElementSkeleton />
      <EventElementSkeleton />
      <EventElementSkeleton />
    </>
  );
}
