const SkeletonBarItem = () => {
  return (
    <div className="animate-pulse cursor-pointer hover:scale-105 transition-all overflow-hidden select-none lg:w-[96%] p-3 lg:p-5 lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:ml-[4%] rounded-full lg:rounded-none">
      <div className="flex items-center gap-6">
        <div className="flex w-[40px] h-[40px] overflow-hidden bg-gray-300 rounded-full"></div>
        <div className="text-[18px] font-[500] hidden lg:block bg-gray-300 rounded-full h-4 w-24"></div>
      </div>
    </div>
  );
};

import LogoW from "./LogoW";

const SkeletonSideBar = () => {
  return (
    <div className="fixed top-0 left-0 lg:w-[18%] w-[100px] h-screen bg-primary hidden sm:flex">
      <ul className="flex flex-col flex-1 items-center w-full mt-9 gap-3">
        <div className="mb-[25px] w-fit cursor-pointer">
          <div className="ss:w-[50px] lg:w-[60px]">
            <LogoW />
          </div>
        </div>
        {[...Array(5)].map((_, index) => (
          <SkeletonBarItem key={index} />
        ))}
      </ul>
    </div>
  );
};

const SkeletonBottomBar = () => {
  return (
    <div className="z-20 fixed bottom-0 left-0 w-screen h-[75px] bg-primary sm:hidden">
      <ul className="flex items-center justify-evenly h-full">
        {[...Array(5)].map((_, index) => (
          <SkeletonBarItem key={index} />
        ))}
      </ul>
    </div>
  );
};

const Skeleton = () => {
  return (
    <>
      <SkeletonSideBar />
      <SkeletonBottomBar />
    </>
  );
};

export default Skeleton;
