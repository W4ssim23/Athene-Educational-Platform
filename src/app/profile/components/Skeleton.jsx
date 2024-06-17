const Skeleton = () => {
  return (
    <div className="relative flex flex-col rounded-xl p-2 bg-white sm:p-[25px] overflow-hidden ">
      <div className="absolute top-0 left-0 h-[140px] w-full bg-primary"></div>
      <div className="absolute bg-white rounded-full h-[100px] w-[100px] sm:mt-8 ml-6 mt-12"></div>
      <div className="animate-pulse">
        <div className="relative z-10 flex justify-start sm:pt-8 pl-6 pt-12  rounded-full ">
          <svg
            className="w-[100px] h-[100px] text-gray-500 bg-white rounded-full border-4 border-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>

        <div className="flex justify-start gap-[30px] ml-[25px] sm:w-2/5 mb-4 mt-4">
          <div className="flex flex-col justify-center">
            <div className="w-28 h-2.5 bg-gray-500 rounded-full mb-2"></div>
            <div className="w-24 h-2.5 bg-gray-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="flex flex-col m-1 ml-3 mb-3">
            <div className="flex m-1 my-2 items-center">
              <div className="h-[30px] w-[30px] bg-gray-500 rounded-full ml-3"></div>
              <div className="w-24 h-2.5 bg-gray-500 rounded-full ml-3"></div>
            </div>
            <div className="flex m-1 my-2 items-center">
              <div className="h-[30px] w-[30px] bg-gray-500 rounded-full ml-3"></div>
              <div className="w-28 h-2.5 bg-gray-500 rounded-full ml-3"></div>
            </div>
            <div className="flex m-1 my-2 items-center">
              <div className="h-[30px] w-[30px] bg-gray-500 rounded-full ml-3"></div>
              <div className="w-32 h-2.5 bg-gray-500 rounded-full ml-3"></div>
            </div>
            <div className="flex m-1 my-2 items-center">
              <div className="w-24 h-2.5 bg-gray-500 rounded-full ml-3"></div>
            </div>
          </div>

          <div className="m-1 ml-4 flex flex-col gap-3">
            <div className="w-32 h-2.5 bg-gray-500 rounded-full"></div>
            <div className="sm:w-[200px] w-[260px] h-[100px] bg-gray-500 rounded-lg"></div>
          </div>

          <div className="m-2 ml-3 mt-4">
            <div className="flex m-1 my-2 items-center">
              <div className="w-24 h-2.5 bg-gray-500 rounded-full "></div>
            </div>
            <div className="flex flex-wrap gap-6 ml-4 sm:w-[600px]">
              {[1, 2, 3].map((_, indx) => (
                <div
                  key={indx}
                  className="w-[85px] h-10 bg-gray-500 rounded-[14px]"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

// export default function Loading() {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary"></div>
//       </div>
//     );
//   }
