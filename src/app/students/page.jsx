import SearchHead from "./components/Header/SearchHead";
import Stable from "./components/table/Stable";

export default function Students() {
  return (
    <main className="w-full min-h-screen mt-[-11px] flex flex-col gap-8 mb-[25px] sm:mb-0">
      <SearchHead />
      <Stable />
    </main>
  );
}
