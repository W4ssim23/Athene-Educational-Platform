const SearchHeadSkeleton = () => {
  return (
    <div className="w-full flex justify-between animate-pulse">
      <div className="sm:w-4/12 w-7/12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex gap-4">
        <div className="w-32 h-12 bg-gray-300 sm:flex hidden rounded-full"></div>
        <div className="w-32 h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

const SkeletonTeacherCard = () => {
  return (
    <div
      className="animate-pulse text-center flex flex-col items-center justify-center p-2 pt-3
            sm:min-w-[160px] w-[45%] max-w-[150px] min-w-[140px] min-h-[187px]
            shadow-xl bg-white h-1/5 rounded-xl cursor-pointer transition ease-in-out delay-50
            hover:-translate-y-1 hover:scale-105 hover:bg-[#E4E5EC] duration-300"
    >
      <div className="h-[65px] w-[65px] bg-gray-300 rounded-full mb-3"></div>
      <div className="h-4 bg-gray-300 rounded-full w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded-full w-1/2 mb-3"></div>
      <div className="flex p-2 w-full justify-evenly">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export const TeachersListSkeleton = () => {
  return (
    <div className="flex flex-wrap w-auto gap-7 justify-center items-center sm:justify-start">
      {[...Array(6)].map((_, index) => (
        <SkeletonTeacherCard key={index} />
      ))}
    </div>
  );
};

export default function TeachersSkeleton() {
  return (
    <main className="w-full min-h-screen mt-[-11px] flex flex-col gap-8 mb-[25px] sm:mb-0">
      <SearchHeadSkeleton />
      <TeachersListSkeleton />
    </main>
  );
}
