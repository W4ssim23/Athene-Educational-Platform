import Link from "next/link";
import LearningBro1 from "./icons/LearningBro1";
import LearningBro2 from "./icons/LearningBro2";
import LearningBro3 from "./icons/LearningBro3";

function Grade({ grade }) {
  let picture = null;
  let bg = null;
  switch (grade) {
    case "LYCEE":
      picture = <LearningBro1 />;
      bg = "bg-[#4D44B5]";
      break;
    case "CEM":
      picture = <LearningBro2 />;
      bg = "bg-[#FB7D5B]";
      break;
    case "PRIMAIRE":
      picture = <LearningBro3 />;
      bg = "bg-[#FCC43E]";
      break;
    default:
      return null;
  }
  return (
    <Link
      href={`/classes/${grade.toLowerCase()}`}
      className="flex flex-col items-center"
    >
      <div
        className={`flex flex-col items-center p-2 text-center font-poppins rounded-xl shadow-md cursor-pointer
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110  duration-300 
                ${bg}`}
      >
        {picture}
      </div>
      <h3 className=" text-[#303972] font-bold text-[25px]  mt-5">{grade}</h3>
    </Link>
  );
}

function GradesList() {
  const grades = ["LYCEE", "CEM", "PRIMAIRE"];
  return (
    <div className=" flex flex-col w-full md:flex-row md:justify-evenly gap-6 items-center justify-center ">
      {grades.map((grade) => (
        <Grade key={grade} grade={grade} />
      ))}
    </div>
  );
}

export default GradesList;
