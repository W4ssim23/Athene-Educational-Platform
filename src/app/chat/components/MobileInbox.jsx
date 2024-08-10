"use client";

import { useEffect, useState, useContext } from "react";
import FetchingContext from "@/app/context";
import SearchBar from "@/app/components/ui/SearchBar";
import { usePathname } from "next/navigation";

const MobileInbox = () => {
  const { rooms, setRooms } = useContext(FetchingContext);
  const [roomsId, setRoomsId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/chat", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch rooms");
          setRooms([]);
          return;
        }

        const data = await response.json();
        setRooms(data.rooms);
        setRoomsId(data.roomsId);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (pathname && pathname !== "/chat") return null;

  if (isLoading || !rooms) return <SkeletonInbox />;

  return (
    <div className="h-full w-full sm:hidden flex">
      <div className="sm:py-9 sm:pl-7  flex flex-col gap-[30px] overflow-y-scroll border-r-2 h-full w-full">
        <div className="mt-4 mx-4 rounded-full shadow-sm">
          <SearchBar />
        </div>
        {Boolean(rooms.length) && (
          <div className="flex flex-col gap-3 rounded-tl-xl rounded-bl-xl items-start p-2 sm:bg-white">
            <div className="flex flex-col w-full">
              {rooms.map((name, index) => (
                <Conversation
                  data={name}
                  id={roomsId ? roomsId[index] : ""}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
        <div className="sm:hidden">
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MobileInbox;

import Image from "next/image";
import Link from "next/link";

const Conversation = ({ data, pfp, id }) => {
  return (
    <Link href={`/chat/${id}?title=${data.split(":")[1]}`} className="w-full">
      <div className=" cursor-pointer hover:bg-bgfakeWhite p-3  md:border-b-[2px] flex gap-2 py-4 justify-between  w-full">
        {pfp ? (
          <Image src={pfp} alt="" />
        ) : (
          <div className="w-[45px] h-[45px] bg-primary rounded-full mr-2"></div>
        )}
        <div className="flex-1 flex flex-col gap-1 w-full">
          <p className="text-[#303972] text-[16px] font-[600]">{data}</p>
          <p className="text-[#A098AE] text-[12px] font-[400]">
            {"click to get to the chat ...."}
          </p>
        </div>
        <div className=" flex-col items-end gap-[9px] flex"></div>
      </div>
    </Link>
  );
};

const SkeletonInbox = () => {
  return (
    <div className="h-full w-full sm:hidden flex">
      <div className="sm:py-9 sm:pl-7 flex flex-col gap-[30px] overflow-y-scroll border-r-2 animate-pulse w-full h-full">
        <div className="h-[20px] bg-gray-200 rounded-md  w-[120px]"></div>
        <div className="">
          <div className="h-[20px] bg-gray-200 w-[190px] rounded-md mr-4"></div>
        </div>
        <div className="flex flex-col gap-3  rounded-tl-xl rounded-bl-xl items-start p-2 ">
          <div className="h-[20px] bg-gray-200 rounded-md  w-[80px]"></div>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                <div className="h-[20px] bg-gray-200 rounded-md flex-1"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-tl-xl rounded-bl-xl items-start p-2 ">
          <div className="h-[20px] bg-gray-200 rounded-md  w-[80px]"></div>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                <div className="h-[20px] bg-gray-200 rounded-md flex-1"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:hidden">
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};
