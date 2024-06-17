"use client";

import { ClassW, Phone, Edit, Location, Email, Parent } from "@/assets";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import SmallButton from "@/app/components/ui/SmallButton";
import ClassBox from "@/app/components/ui/ClassBox";

//WILL BE EDITED AFTER DB IS FULLY READY
//WILL BE CHANGED TO A SERVER COMPONENT

const Content = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (session) {
      // console.log("Session: ", session);
      setUser(session.user);
    }
  }, [session]);

  const buttonSizes = "40px";

  if (!user) return <p>skeleton</p>;

  return (
    <div className="relative flex flex-col rounded-xl p-2 bg-white sm:p-[25px]  overflow-hidden">
      <div className="absolute top-0 left-0 h-[140px] w-full  bg-primary "></div>

      <ProfilePicture pfp={user.pfp} />

      <div className="flex justify-start gap-[30px] ml-[25px] sm:w-2/5  mb-4  ">
        <div className="flex flex-col justify-center">
          <h3 className="text-[#303972] font-bold text-xl capitalize">
            {user.firstName + " " + user.lastName}
          </h3>

          {/* depends on the type of the user */}
          {/* take parent and edviser in count later */}
          {user.role === "teacher" && (
            <p className="font-poppins text-[#A098AE]">
              {userData.module + " Teacher"}
            </p>
          )}
          {user.role === "student" && (
            <p className="font-poppins text-[#A098AE]">
              {user.grade + " Student"}
            </p>
          )}
          {user.role === "admin" && (
            <p className="font-poppins text-[#A098AE]">Admin</p>
          )}
        </div>
        <span
        // onClick={() => {
        //   setShowModal(true);
        //   switch (userData.role) {
        //     case "teacher":
        //       setType("EditPT");
        //       break;
        //     case "student":
        //       setType("EditPS");
        //       break;
        //     case "admin":
        //       setType("EditPA");
        //       break;
        //     default:
        //       setType("");
        //   }
        // }}
        >
          <SmallButton
            picture={Edit}
            altText="Edit"
            hoverText="Edit"
            bg={"#FB7D5B"}
            size={"40px"}
          />
        </span>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex flex-col m-1 ml-3 mb-3">
          {user?.parentName && (
            <div className="flex m-1 my-2 items-center">
              <SmallButton picture={Parent} bg={"#4D44B5"} size={buttonSizes} />
              <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
                {user.parentName}
              </p>
            </div>
          )}
          {user?.address && (
            <div className="flex m-1 my-2 items-center">
              <SmallButton
                picture={Location}
                bg={"#4D44B5"}
                size={buttonSizes}
              />
              <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
                {user.address}
              </p>
            </div>
          )}
          {user.phone && (
            <div className="flex m-1 my-2 items-center">
              <SmallButton picture={Phone} size={buttonSizes} />
              <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
                {user.phone ?? "no phone number"}
              </p>
            </div>
          )}
          <div className="flex m-1 my-2 items-center">
            <SmallButton picture={Email} bg={"#FCC43E"} size={buttonSizes} />
            <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
              {user.email ?? "no email"}
            </p>
          </div>
        </div>

        {user.role != "student" && (
          <div className="m-1 ml-4 flex flex-col gap-3">
            <h3 className=" text-[#303972] font-bold text-lg ">About :</h3>
            <p className="font-poppins text-[#303972] text-base min-h-[80px] max-w-[615px]">
              {user.about}
            </p>
          </div>
        )}

        {(user.role === "teacher" || user.role === "admin") && (
          <div className="m-2 ml-3">
            <div className="flex m-1 my-2 items-center">
              <SmallButton picture={ClassW} bg={"#4CBC9E"} size={buttonSizes} />
              <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
                {"Classes :"}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 ml-4  sm:w-[600px]">
              {user?.classes?.map((name, indx) => {
                return (
                  <ClassBox
                    key={indx}
                    tClassName={name}
                    style="w-[85px] text-white text-center rounded-[14px] shadow-md text-[20px] font-[500] uppercase py-3 cursor-pointer"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* {showModal && <Overlay data={userData} />} */}
    </div>
  );
};

export default Content;
