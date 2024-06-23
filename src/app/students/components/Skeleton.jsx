const SearchHeadSkeleton = () => {
  return (
    <div className="w-full flex justify-between animate-pulse">
      <div className="sm:w-4/12 w-7/12 h-12 bg-gray-400 rounded-full"></div>
      <div className="flex gap-4">
        <div className="w-32 h-12 bg-gray-400 sm:flex hidden rounded-full"></div>
        <div className="w-32 h-12 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

const StudentsTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <div className="w-full flex justify-between p-4 bg-gray-400">
          {[
            "Name",
            "Phone",
            "Email",
            "Grade",
            "Parent Name",
            "Class",
            "Gender",
            "Actions",
          ].map((header) => (
            <div key={header} className="w-1/8 h-4 bg-gray-500 rounded"></div>
          ))}
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center p-4 border-t border-gray-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div className="sm:w-24 w-36 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="w-24 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-36 h-4 bg-gray-400 rounded-full hidden md:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-28 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-12 h-4 bg-gray-400 rounded-full hidden md:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function StudentsSkeleton() {
  return (
    <main className="w-full min-h-screen mt-[-11px] flex flex-col gap-8 mb-[25px] sm:mb-0">
      <SearchHeadSkeleton />
      <StudentsTableSkeleton />
    </main>
  );
}
