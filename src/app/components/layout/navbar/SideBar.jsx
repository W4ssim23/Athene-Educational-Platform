import LogoW from "./LogoW";
import BarItem from "./BarItem";
import Link from "next/link";

const SideBar = ({ pg, items }) => {
  return (
    <>
      <div className="fixed top-0 left-0 lg:w-[18%] w-[100px] h-screen bg-primary hidden sm:flex">
        <ul className="flex flex-col flex-1 items-center w-full mt-9 gap-3">
          <div className="mb-[25px] w-fit cursor-pointer">
            <Link href={"/"}>
              <div className="ss:w-[50px] lg:w-[60px]">
                <LogoW />
              </div>
            </Link>
          </div>
          {items.map((item, index) => (
            <BarItem pg={pg} item={item} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
