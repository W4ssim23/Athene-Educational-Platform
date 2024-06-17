function ClassBox({ tClassName = "", style }) {
  const color =
    tClassName[1] === "p"
      ? "#FCC43E"
      : tClassName[1] === "m"
      ? "#FB7D5B"
      : "#4D44B5";
  const boxStyles = {
    backgroundColor: color,
  };
  return (
    <div className={style} style={boxStyles}>
      {tClassName && ` ${tClassName}`}
    </div>
  );
}

export default ClassBox;
