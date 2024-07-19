"use client";

import { DropdownMenu, DropdownItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function DropDownItems({ isAdmin = false }) {
  return (
    <DropdownMenu aria-label="Static Actions">
      {/* <DropdownItem key="profile" href="/profile">
        Profile
      </DropdownItem> */}
      {!isAdmin && (
        <DropdownItem key="notification" href="/notifications">
          Notification
        </DropdownItem>
      )}
      {/* <DropdownItem key="settings">Settings</DropdownItem> */}
      <DropdownItem key="delete" color="danger" onClick={() => signOut()}>
        Log out
      </DropdownItem>
    </DropdownMenu>
  );
}
