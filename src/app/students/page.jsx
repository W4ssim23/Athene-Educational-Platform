import SearchHead from "./components/Header/SearchHead";
import StudentsTable from "./components/table/StudentsTable";

export default function Students() {
  return (
    <main className="w-full min-h-screen mt-[-11px] flex flex-col gap-8 mb-[25px] sm:mb-0">
      <SearchHead />
      <StudentsTable />
    </main>
  );
}
