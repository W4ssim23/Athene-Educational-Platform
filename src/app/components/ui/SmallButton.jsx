"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export default function SmallButton({
  picture,
  bg,
  size,
  hoverText = "",
  clickFunction = () => {}, //to avoid errors , might be removed later
  popUpComponent = null, //same
}) {
  const [loading, setLoading] = useState(false);

  const buttonStyle = {
    width: size,
    height: size,
    backgroundColor: bg,
  };

  return (
    <div className="group relative rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all">
      <Button
        onClick={clickFunction}
        isIconOnly
        radius="full"
        isLoading={loading}
        style={buttonStyle}
      >
        {/* {picture} */}
        <Image src={picture} alt={hoverText} />
      </Button>
      <div
        className={` ${
          hoverText == ""
            ? ""
            : "absolute top-full mt-0.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-600 text-white text-xs px-2 py-1 rounded-md"
        }`}
        style={{ zIndex: 1 }}
      >
        {hoverText}
      </div>
    </div>
  );
}
