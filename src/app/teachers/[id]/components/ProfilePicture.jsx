import { Avatar } from "@nextui-org/react";

export default function ProfilePicture({ pfp }) {
  return (
    <div
      className="group  rounded-full flex items-center relative justify-center cursor-pointer
                    border-4 border-white ml-[15px] mt-[55px] h-[115px] w-[115px] p-0"
    >
      <Avatar
        fallback
        src={pfp}
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  );
}
