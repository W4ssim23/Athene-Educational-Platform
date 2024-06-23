"use client";

import DotsIcon from "./DotsIcon";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import View from "./View";
import Edit from "./Edit";
import Delete from "./Delete";
import Absences from "./Absences";

export default function Action({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [windowType, setWindowType] = useState("");

  const renderContent = (windowType, data) => {
    switch (windowType) {
      case "view":
        return <View data={data} />;
      case "absence":
        return <Absences data={data} />;
      case "edit":
        return <Edit student={data} />;
      case "delete":
        return <Delete data={data} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            aria-label="Actions"
            className="rounded-full overflow-hidden bg-transparent"
          >
            <DotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="view"
            onClick={() => {
              // console.log("Opening view modal");
              onOpen();
              setWindowType("view");
            }}
          >
            View
          </DropdownItem>
          <DropdownItem
            key="absence"
            onClick={() => {
              // console.log("Opening absence modal");
              onOpen();
              setWindowType("absence");
            }}
          >
            Absence
          </DropdownItem>
          <DropdownItem
            key="edit"
            onClick={() => {
              // console.log("Opening edit modal");
              onOpen();
              setWindowType("edit");
            }}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => {
              // console.log("Opening delete modal");
              onOpen();
              setWindowType("delete");
            }}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

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
