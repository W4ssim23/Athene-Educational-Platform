import { Button, Modal, useDisclosure } from "@nextui-org/react";

export default function SmallButton({
  picture,
  bg,
  size,
  hoverText = "",
  popUpOnClick = false,
  popUpComponent = null,
  extraStyle = "m-4 sm:m-0",
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const buttonStyle = {
    width: size,
    height: size,
    backgroundColor: bg,
  };

  return (
    <div className="group relative rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all">
      <Button
        isIconOnly
        onPress={onOpen}
        radius="full"
        style={buttonStyle}
        className="p-2"
      >
        {picture}
      </Button>
      {/* hover : */}
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
      {/* PopUp : */}
      {popUpOnClick && (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            className={extraStyle}
          >
            {popUpComponent}
          </Modal>
        </>
      )}
    </div>
  );
}
