"use client";

import Search from "./Search";
import { Input } from "@nextui-org/react";
import { useDebouncedCallback } from "use-debounce";
import { useContext } from "react";
import FetchingContext from "@/app/context";

const SearchBar = () => {
  const { setStudents } = useContext(FetchingContext);

  const handleSearch = useDebouncedCallback(async (e) => {
    // console.log("searching for:", e.target.value);
    const response = await fetch(`/api/students?search=${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // console.log("data:", data.students);
      setStudents(data.students);
    }
    //else a toast message will be shown
  }, 500);

  return (
    <Input
      isClearable
      radius="full"
      classNames={{
        input: [
          "bg-transparent",
          "text-black/90",
          "placeholder:text-default-700/50",
          "h-12",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "bg-white",
          "backdrop-blur-lg",
          "backdrop-saturate-200",
          "hover:bg-white/90",
          "group-data-[focus=true]:bg-white",
          "!cursor-text",
          "h-12",
        ],
      }}
      placeholder="Search..."
      startContent={
        <div className="mb-0.5 text-slate-400 pointer-events-none flex-shrink-0">
          <Search />
        </div>
      }
      onChange={handleSearch}
    />
  );
};

export default SearchBar;