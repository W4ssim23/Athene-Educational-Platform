import SearchBar from "@/app/components/ui/SearchBar";
import Add from "./Add";
import Get from "./Get";

export default function SearchHead() {
  return (
    <div className="w-full flex justify-between">
      <div className="sm:w-4/12 w-7/12">
        <SearchBar />
      </div>
      <div className="flex gap-4">
        <Get />
        <Add />
      </div>
    </div>
  );
}
