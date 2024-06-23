import { Search } from "@/assets";
import { Input } from "@nextui-org/react";
import Image from "next/image";

const SearchBar = () => {
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
        <Image
          src={Search}
          className="mb-0.5 text-slate-400 pointer-events-none flex-shrink-0"
          alt="search"
        />
      }
    />
  );
};

export default SearchBar;
