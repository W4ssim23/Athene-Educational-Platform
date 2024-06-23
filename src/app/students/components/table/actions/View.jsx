import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";

export default function View({ data }) {
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Student Details
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex flex-col justify-center md:items-center items-start bg-white px-8 py-5 rounded-lg gap-5">
                <div className="flex md:flex-col gap-6 md:gap-2 items-center justify-center ">
                  <Avatar src={data.pfp} className="w-20 h-20 text-large" />
                  <p className="text-large font-[600] text-blueTitle">
                    {data.lastName} {data.firstName}
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <p className="font-poppins text-[16px] text-blueTitle font-[600] text-nowrap">
                      Email :{" "}
                    </p>
                    <p className="text-[16px] text-primary font-[600] text-wrap">
                      {data.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-poppins text-[16px] text-blueTitle font-[600]">
                      Phone Number :{" "}
                    </p>
                    <p className="text-[16px] text-primary font-[600]">
                      {data.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-poppins text-[16px] text-blueTitle font-[600]">
                      Parent Name :{" "}
                    </p>
                    <p className="text-[16px] text-primary font-[600]">
                      {data.parentName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-poppins text-[16px] text-blueTitle font-[600]">
                      Grade :{" "}
                    </p>
                    <GradeBox tClassName={data.grade} />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-poppins text-[16px] text-blueTitle font-[600]">
                      Class :{" "}
                    </p>
                    <ClassBox tClassName={data.class} />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-6">
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

function GradeBox({ tClassName = "" }) {
  const color =
    tClassName.toLowerCase() === "prm"
      ? "#FCC43E"
      : tClassName.toLowerCase() === "cem"
      ? "#FB7D5B"
      : "#4D44B5";
  const boxStyles = {
    backgroundColor: color,
  };
  return (
    <div
      className={
        "text-white text-center rounded-full shadow-md cursor-pointer py-2 px-3"
      }
      style={boxStyles}
    >
      {tClassName && ` ${tClassName.toUpperCase()}`}
    </div>
  );
}

function ClassBox({ tClassName = "", style }) {
  const color =
    tClassName[1].toLowerCase() === "p"
      ? "#FCC43E"
      : tClassName[1].toLowerCase() === "m"
      ? "#FB7D5B"
      : "#4D44B5";
  const boxStyles = {
    backgroundColor: color,
  };
  return (
    <div
      className={
        "text-white text-center rounded-full shadow-md cursor-pointer py-2 px-[14px]"
      }
      style={boxStyles}
    >
      {tClassName && ` ${tClassName.toUpperCase()}`}
    </div>
  );
}
