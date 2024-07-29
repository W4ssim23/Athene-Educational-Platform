"use client";

import { useEffect, useState, useContext } from "react";
import FetchingContext from "@/app/context";
import SearchBar from "@/app/components/ui/SearchBar";
import Conversation from "./Conversation";

const Inbox = () => {
  const { rooms, setRooms } = useContext(FetchingContext);
  const [roomsId, setRoomsId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading || !rooms) return <SkeletonInbox />;

  return (
    <div className="sm:py-9 sm:pl-7  flex flex-col gap-[30px] overflow-y-scroll border-r-2">
      <h1 className="text-[rgb(48,57,114)] text-[20px] font-[600] hidden sm:block">
        Messages
      </h1>
      <div className="hidden sm:block">
        <SearchBar />
      </div>
      {Boolean(rooms.length) && (
        <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
          <p className="text-[19px] text-[#A098AE] font-[500] hidden sm:block">
            Groups
          </p>
          <div className="flex flex-col">
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
      {/* {Boolean(Chats.length) && (
        <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
          <p className="text-[19px] text-[#A098AE] font-[500] hidden sm:block">
            Chats
          </p>
          <div className="flex flex-col">
            {Chats.map((data, index) => (
              <Conversation data={data} conversationId={data.unreadMessages} />
            ))}
          </div>
        </div>
      )} */}
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Inbox;

const Chats = [];

const SkeletonInbox = () => {
  return (
    <div className="sm:py-9 sm:pl-7 flex flex-col gap-[30px] overflow-y-scroll border-r-2 animate-pulse">
      <div className="h-[20px] bg-gray-200 rounded-md hidden sm:block w-[120px]"></div>
      <div className="hidden sm:block">
        <div className="h-[20px] bg-gray-200 w-[190px] rounded-md mr-4"></div>
      </div>
      <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
        <div className="h-[20px] bg-gray-200 rounded-md hidden sm:block w-[80px]"></div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
              <div className="h-[20px] bg-gray-200 rounded-md flex-1"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
        <div className="h-[20px] bg-gray-200 rounded-md hidden sm:block w-[80px]"></div>
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
  );
};
