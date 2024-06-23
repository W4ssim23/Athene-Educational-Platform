import { Button } from "@nextui-org/react";

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
    <Button className={style} style={boxStyles}>
      {tClassName && ` ${tClassName.toUpperCase()}`}
    </Button>
  );
}

export default ClassBox;
