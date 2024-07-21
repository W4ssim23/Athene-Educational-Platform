import Link from "next/link";
import { M1, M2, M3, M4, P1, P2, P3, P4, P5, S1, S2, S3 } from "@/assets";
import Image from "next/image";

const gradeConfig = {
  lycee: {
    color: "bg-[#4D44B5]",
    levels: {
      1: { picture: S1, position: "top-[15px] right-0" },
      2: { picture: S2, position: "top-[15px] left-0" },
      3: { picture: S3, position: "top-[2px] left-0" },
    },
    titlePrefix: "S",
  },
  cem: {
    color: "bg-[#FB7D5B]",
    levels: {
      1: { picture: M1, position: "h-full top-[15px] right-[-19px]" },
      2: { picture: M2, position: "h-full top-[15px] right-0" },
      3: { picture: M3, position: "top-[0px] right-0" },
      4: { picture: M4, position: "h-full top-[15px] right-[-4px]" },
    },
    titlePrefix: "M",
  },
  primaire: {
    color: "bg-[#FCC43E]",
    levels: {
      1: { picture: P1, position: "h-full top-[15px] right-[-17px]" },
      2: { picture: P2, position: "h-full top-[15px] right-[-15px]" },
      3: { picture: P3, position: "h-4/5 top-[15px] right-[-18px]" },
      4: { picture: P4, position: "h-full top-[15px] right-0" },
      5: { picture: P5, position: "h-[60%] top-0 right-[-14px]" },
    },
    titlePrefix: "P",
  },
};

function StudyClass({ grade, year, number, classId }) {
  if (!gradeConfig[grade] || !gradeConfig[grade].levels[year]) {
    console.log("Invalid grade or level");
    return null;
  }

  const { color, levels, titlePrefix } = gradeConfig[grade];
  const { picture, position } = levels[year];
  const title = `${year}${titlePrefix}${number}`;

  return (
    <Link
      href={`/classes/${grade.toLowerCase()}/${classId}`}
      className={`p-2 flex flex-col justify-center items-center text-center font-poppins rounded-3xl shadow-md
                relative overflow-hidden cursor-pointer 
                w-[17%] min-h-[120px] sm:min-w-[170px] min-w-[150px]
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 
                bg-opacity-30 ${color}`}
    >
      <Image
        priority
        src={picture}
        alt="grade level"
        className={`absolute ${position}`}
      />
      <h3 className="text-[#303972] font-bold text-2xl z-10">{title}</h3>
    </Link>
  );
}

export default StudyClass;
