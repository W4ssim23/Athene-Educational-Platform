"use client";

import { useCallback, useState } from "react";
import SmallButton from "@/app/components/ui/SmallButton";
import { NoVote, YesVote, Edit, Votes, Trash } from "../Icons";
import { Modal, useDisclosure } from "@nextui-org/react";
import VotesStat from "./VotesStat";
import DeleteWin from "./DeleteWin";
import EditForm from "./EditForm";

// TO ADD MODELS FOR EDIT VOTE AND DELETE

export default function EventButtons({
  data,
  id,
  vote = { yes: false, no: false },
  role,
  ableToVote,
}) {
  //vote for the default value on the events the user already voted in , and the id is the user's id

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [windowType, setWindowType] = useState("");

  const renderContent = (windowType, data) => {
    switch (windowType) {
      case "edit":
        return <EditForm event={data} />;
      case "delete":
        return <DeleteWin data={data} />;
      case "votes":
        return <VotesStat data={data} />;
      default:
        return null;
    }
  };

  const [voted, setVoted] = useState(vote);
  const handleYes = useCallback((e) => {
    if (voted.yes) return;
    // yesClick(e);
    //logic .....
    setVoted(() => ({ yes: true, no: false }));
  }, []);

  const handleNo = useCallback((e) => {
    if (voted.no) return;
    // noClick(e);
    //logic .....
    setVoted(() => ({ yes: false, no: true }));
  }, []);

  if (role === "teacher") return null;

  if (role === "student" && ableToVote)
    return (
      <div className="sm:absolute sm:top-0 sm:right-0 sm:h-full flex sm:flex-col items-center justify-center gap-6 pb-[2%] sm:pb-0 sm:pr-[3%]">
        <SmallButton
          picture={<YesVote />}
          hoverText="confirm"
          bg={voted.no ? "#999999" : "#4CBC9A"}
          size={"40px"}
          onClick={handleYes}
        />
        <SmallButton
          picture={<NoVote />}
          hoverText="deny"
          bg={voted.yes ? "#999999" : "#FF4550"}
          size={"40px"}
          onClick={handleNo}
        />
      </div>
    );

  if (role === "admin")
    return (
      <div className="sm:absolute sm:top-0 sm:right-0 sm:h-full flex sm:flex-col items-center justify-center gap-6 pb-[2%] sm:pb-0 sm:pr-[3%]">
        <SmallButton
          picture={<Edit />}
          hoverText="edit"
          bg={"#FCC43E"}
          size={"40px"}
          onClick={() => {
            setWindowType("edit");
            onOpen();
          }}
        />
        {ableToVote && (
          <SmallButton
            picture={<Votes />}
            hoverText="Votes"
            bg={"#4CBC9A"}
            size={"40px"}
            onClick={() => {
              setWindowType("votes");
              onOpen();
            }}
          />
        )}
        <SmallButton
          picture={<Trash />}
          hoverText="delete"
          bg={"#FF4550"}
          size={"40px"}
          onClick={() => {
            setWindowType("delete");
            onOpen();
          }}
        />
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          className="m-2"
        >
          {renderContent(windowType, data)}
        </Modal>
      </div>
    );
}
