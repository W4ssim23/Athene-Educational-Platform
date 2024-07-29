import Image from "next/image";
import Link from "next/link";

const Conversation = ({ data, pfp, id }) => {
  return (
    <Link href={`/chat/${id}?title=${data.split(":")[1]}`}>
      <div className=" cursor-pointer hover:bg-bgfakeWhite p-3  md:border-b-[2px] flex gap-2 py-4 justify-between  w-full">
        {pfp ? (
          <Image src={pfp} alt="" />
        ) : (
          <div className="w-[45px] h-[45px] bg-primary rounded-full"></div>
        )}
        <div className="flex-1 sm:flex flex-col gap-1 hidden">
          <p className="text-[#303972] text-[16px] font-[600]">{data}</p>
          <p className="text-[#A098AE] text-[12px] font-[400]">
            {"click to get to the chat ...."}
          </p>
        </div>
        <div className=" flex-col items-end gap-[9px] hidden sm:flex">
          {/* <p className="text-[#A098AE] text-[12px] font-[400]">
          {"12:00"}
        </p> */}
          {/* <div className="w-[20px] h-[20px] bg-orange flex justify-center items-center text-[13px] text-white font-[400]  p-1 rounded-full">
          {data.unreadMessages}
        </div> */}
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
