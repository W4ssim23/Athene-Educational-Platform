import BarItem from "./BarItem";

const BottomBar = ({ pg, items }) => {
  return (
    <div className=" z-20 fixed bottom-0 left-0 w-screen h-[75px] bg-primary sm:hidden">
      <ul className="flex items-center justify-evenly h-full">
        {items.map((item, index) => (
          <BarItem pg={pg} item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
