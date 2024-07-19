"use client";

import { useCallback, useState, useEffect } from "react";
import SmallButton from "@/app/components/ui/SmallButton";
import { NoVote, YesVote, Edit, Votes, Trash } from "../Icons";
import { Modal, useDisclosure } from "@nextui-org/react";
import VotesStat from "./VotesStat";
import DeleteWin from "./DeleteWin";
import EditForm from "./EditForm";

export default function EventButtons({
  data,
  id,
  vote,
  role,
  ableToVote,
  voterId,
  voterName,
}) {
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

  const checkUserVote = useCallback(() => {
    const votedYes = data.votersListYes.some((voter) => voter.id === voterId);
    const votedNo = data.votersListNo.some((voter) => voter.id === voterId);
    return { yes: votedYes, no: votedNo };
  }, [data.votersListYes, data.votersListNo, voterId]);

  const [voted, setVoted] = useState({ yes: false, no: false });

  useEffect(() => {
    setVoted(checkUserVote());
  }, [checkUserVote]);

  const handleVote = useCallback(
    async (voteType) => {
      if (voteType === "yes" && voted.yes) return;
      if (voteType === "no" && voted.no) return;

      try {
        const response = await fetch("/api/events/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: id,
            voterId,
            voterName,
            vote: voteType,
          }),
        });

        if (!response.ok) {
          console.log(await response.json());
          throw new Error("Error voting");
        }

        setVoted(() => ({
          yes: voteType === "yes",
          no: voteType === "no",
        }));
      } catch (error) {
        console.error("Error voting:", error);
      }
    },
    [voted, id, voterId, voterName]
  );

  if (role === "teacher") return null;

  if (role === "student" && ableToVote)
    return (
      <div className="sm:absolute sm:top-0 sm:right-0 sm:h-full flex sm:flex-col items-center justify-center gap-6 pb-[2%] sm:pb-0 sm:pr-[3%]">
        <SmallButton
          picture={<YesVote />}
          hoverText="confirm"
          bg={voted.no ? "#999999" : "#4CBC9A"}
          size={"40px"}
          onClick={() => handleVote("yes")}
        />
        <SmallButton
          picture={<NoVote />}
          hoverText="deny"
          bg={voted.yes ? "#999999" : "#FF4550"}
          size={"40px"}
          onClick={() => handleVote("no")}
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
