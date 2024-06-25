"use client";

import { ClassW, Phone, Edit, Location, Email } from "@/app/profile/icons";
import DeleteIcon from "./DeleteIcon";
import { useState, useEffect } from "react";
import EditForm from "./EditForm";
import Delete from "./Delete";
import ProfilePicture from "./ProfilePicture";
import SmallButton from "@/app/components/ui/SmallButton";
import ClassBox from "@/app/components/ui/ClassBox";
import Skeleton from "./Skeleton";

const Content = () => {
  //
  const buttonSizes = "40px";

  //fetching the user and desplaying a skeleton instead

  const teacher = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    speciality: "Maths",
    pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
    phone: "1234567890",
    email: "dgg@gg.tt",
    address: "1234 rue de la rue",
    about: "I am a teacher",
    classes: ["2m3", "1s7", "2s2", "2p3"],
  };

  return (
    <div className="relative flex flex-col rounded-xl p-2 bg-white sm:p-[25px]  overflow-hidden">
      <div className="absolute top-0 left-0 h-[140px] w-full  bg-primary "></div>

      <ProfilePicture pfp={teacher.pfp} />

      <div className="flex justify-start gap-[30px] ml-[25px] sm:w-2/5  mb-4  ">
        <div className="flex flex-col justify-center">
          <h3 className="text-[#303972] font-bold text-xl capitalize">
            {teacher.firstName + " " + teacher.lastName}
          </h3>
          <p className="font-poppins text-[#A098AE]">
            {teacher.speciality + " Teacher"}
          </p>
        </div>
        <div className="flex w-fit gap-4">
          <SmallButton
            picture={<Edit />}
            hoverText="Edit"
            bg={"#FB7D5B"}
            size={"40px"}
            popUpOnClick={true}
            popUpComponent={<EditForm user={teacher} />}
          />
          <SmallButton
            picture={<DeleteIcon />}
            hoverText="Delete"
            bg={"#FF4550"}
            size={"40px"}
            popUpOnClick={true}
            popUpComponent={<Delete data={teacher} />}
          />
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex flex-col m-1 ml-3 mb-3">
          <div className="flex m-1 my-2 items-center">
            <SmallButton
              picture={<Location />}
              bg={"#4D44B5"}
              size={buttonSizes}
            />
            <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
              {teacher.address}
            </p>
          </div>
          <div className="flex m-1 my-2 items-center">
            <SmallButton picture={<Phone />} size={buttonSizes} />
            <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
              {teacher.phone ?? "no phone number"}
            </p>
          </div>
          <div className="flex m-1 my-2 items-center">
            <SmallButton
              picture={<Email />}
              bg={"#FCC43E"}
              size={buttonSizes}
            />
            <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
              {teacher.email ?? "no email"}
            </p>
          </div>
        </div>
        <div className="m-1 ml-4 flex flex-col gap-3">
          <h3 className=" text-[#303972] font-bold text-lg ">About :</h3>
          <p className="font-poppins text-[#303972] text-base min-h-[80px] max-w-[615px]">
            {teacher.about ?? "No description"}
          </p>
        </div>
        <div className="m-2 ml-3">
          <div className="flex m-1 my-2 items-center">
            <SmallButton
              picture={<ClassW />}
              bg={"#4CBC9E"}
              size={buttonSizes}
            />
            <p className={`text-[#303972] text-base m-1 ml-3 font-bold`}>
              {"Classes :"}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 ml-4  sm:w-[600px]">
            {teacher?.classes?.map((name, indx) => {
              return (
                <ClassBox
                  key={indx}
                  tClassName={name}
                  style="w-[85px] sm:h-[47px] h-[52px]  text-white text-center rounded-[14px] shadow-md text-[20px] font-[500] uppercase py-3 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
