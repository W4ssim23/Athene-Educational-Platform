import Link from "next/link";

const BarItem = ({ item, pg }) => {
  return (
    <Link
      href={item.theLink}
      className={` cursor-pointer hover:scale-105 transition-all overflow-hidden select-none lg:w-[96%] p-3 lg:p-5 lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:ml-[4%] rounded-full lg:rounded-none  ${
        pg === item.title.toLowerCase() ? "bg-bgfakeWhite" : ""
      } `}
      key={item.title}
    >
      <div className={`flex items-center gap-6 `}>
        <div className="flex w-[30px] h-[30px] overflow-hidden">
          {pg === item.title.toLowerCase() ? item.svgSelected : item.svg}
        </div>

        <p
          className={`text-[18px] font-[500] hidden lg:block ${
            pg === item.title.toLowerCase() ? "text-primary" : "text-pfpclr"
          }
           font-kumbhfont text-pfpclr`}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
};

export default BarItem;
