"use client";

import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { check, xmark } from "@/assets"; //to change
import Image from "next/image";

export default function VotesStat({ data }) {
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Event Voting Stats
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <h2 className="text-[#303972] font-bold text-[25px] capitalize text-center">
                {data?.title}
              </h2>

              {data?.votes && (
                <p className="text-center">
                  {" "}
                  The event have currently{" "}
                  {data.votersListNo.length +
                    data.votersListYes.length} votes{" "}
                </p>
              )}
              <br />

              <div className="hidden  gap-5 sm:flex justify-between w-[90%] m-auto ">
                {/* // confirm votes */}
                <div className="flex flex-col bg-bgpurp rounded-md p-2 justify-start items-center gap-3">
                  <div className="flex gap-3">
                    <p className="">Yes Votes</p>
                    <Image className="w-[15px]" src={check} alt="" />
                  </div>
                  <div className="overflow-y-scroll rounded-md h-[180px] px-8 flex gap-2 flex-col">
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                  </div>
                </div>
                <div className="flex flex-col justify-start  items-center   bg-bgpurp rounded-md p-2 gap-3">
                  <div className="flex gap-3">
                    <p className="">No Votes</p>
                    <Image className="w-[15px]" src={xmark} alt="" />
                  </div>
                  <div className="overflow-y-scroll px-8  rounded-md h-[180px] flex gap-2 flex-col">
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                    <Voter />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-6">
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

function Voter({ data }) {
  return (
    <div className="flex items-center gap-2 p-1">
      {/* user.name */}
      <p>Zouitene Ouassim</p>
    </div>
  );
}
