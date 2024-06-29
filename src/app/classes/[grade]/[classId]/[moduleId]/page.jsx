"use client";
import { useState } from "react";
import Link from "next/link";
import Attached from "./Attached";
import AddingElement from "../../../../events/components/AddingElement";

// Main component to display a class with params
export default function Aclass({ params }) {
  console.log(params);
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <ModulePage params={params} />
    </main>
  );
}

// Component for displaying attachment link
const Attachment = ({ data, params }) => {
  return (
    <Link
      href={`/classes/${params.grade}/${params.classId}/${params.moduleId}/${data.id}`}
      className="flex gap-3 transition ease-in-out delay-50 hover:scale-[1.01] cursor-pointer"
    >
      <div className="bg-primary rounded-full w-[50px] h-[50px] p-2">
        <Attached />
      </div>
      <div className="flex flex-col font-poppins">
        <p className="font-[600] text-[#363B64] text-[18px]">
          {data.courseName}
        </p>
        <p className="text-[14px] text-[#A7A7A7]">{data.courseDate}</p>
      </div>
    </Link>
  );
};

// Component for displaying the list header with attachment types
const ListHeader = ({ attchType, setAttchType }) => {
  const hoverAnimation =
    "hover:text-primary before:absolute before:w-[0px] before:h-[5px] before:bg-primary relative hover:before:w-full before:bottom-[-25px] before:left-0 before:transition-all before:ease-in-out";

  const attachmentTypes = [
    "Cours",
    "Devoir",
    "Epreuves",
    "Evaluation Continue",
  ];

  return (
    <div className="bg-white border-b-[3px] rounded-t-xl px-[26px] text-[18px] font-[600] text-black font-poppins">
      <div className="hidden sm:flex sm:justify-between sm:items-center h-[75px] cursor-pointer">
        {attachmentTypes.map((type) => (
          <div
            key={type}
            onClick={() => setAttchType(type)}
            className={
              attchType === type
                ? "text-primary before:absolute before:h-[5px] before:w-full before:bottom-[-25px] before:left-0 transition-all ease-in-out before:bg-primary relative"
                : hoverAnimation
            }
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for displaying a select input in mobile view
const SelectComp = ({ attchType, setAttchType }) => {
  const attachmentTypes = [
    "Cours",
    "Devoir",
    "Epreuves",
    "Evaluation Continue",
  ];

  return (
    <select
      value={attchType}
      onChange={(e) => setAttchType(e.target.value)}
      className="sm:hidden placeholder:text-textgray text-primary  border-none text-[20px] font-kumbhfont font-[700] rounded-lg mb-5 outline-none w-full h-12 text-center"
    >
      {attachmentTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

// Main module page component
const ModulePage = ({ params }) => {
  const [attchType, setAttchType] = useState("Cours");

  // Fetch data based on attachment type
  const dataMapping = {
    Cours: Courses,
    Devoir: Devoir,
    Epreuves: Epreuves,
    EvaluationContinue: EvaluationContinue,
  };

  const data = dataMapping[attchType] || [];

  return (
    <div className="flex flex-col w-full gap-5 sm:gap-9 gap-x-0 sm:gap-x-8">
      <div className="flex flex-col gap-5 sm:gap-9 items-center">
        <AddingElement role="admin" pfp="" />
        <div className="w-[95%] sm:w-[75%] rounded-xl">
          <SelectComp attchType={attchType} setAttchType={setAttchType} />
          <ListHeader attchType={attchType} setAttchType={setAttchType} />
          <div className="bg-white px-8 py-5 flex flex-col gap-[30px] rounded-b-xl h-[90vh] sm:h-[70vh] overflow-y-scroll">
            {data.map((course, index) => (
              <Attachment key={index} data={course} params={params} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// Testing Data

const Courses = [
  { courseName: "Almost Heroes", courseDate: "2/19/2025", id: "1" },
  { courseName: "Trinity and Beyond", courseDate: "9/4/2024", id: "1" },
  {
    courseName: "Devil Times Five (a.k.a. Peopletoys)",
    courseDate: "7/18/2023",
    id: "1",
  },
  { courseName: "Bling: A Planet Rock", courseDate: "4/29/2023", id: "1" },
  {
    courseName: "Gross Anatomy (a.k.a. A Cut Above)",
    courseDate: "12/13/2024",
    id: "1",
  },
  { courseName: "Good Man in Africa, A", courseDate: "1/13/2024", id: "1" },
  { courseName: "Outlaw of Gor", courseDate: "4/23/2025", id: "1" },
  { courseName: "White Noise 2: The Light", courseDate: "7/22/2023", id: "1" },
  {
    courseName: "Guest from the Future (Gostya iz buduschego)",
    courseDate: "12/17/2024",
    id: "1",
  },
  { courseName: "Rapture-Palooza", courseDate: "7/31/2024", id: "1" },
  { courseName: "Ponterosa", courseDate: "12/13/2023", id: "1" },
  {
    courseName: "George Lopez: America's Mexican",
    courseDate: "3/18/2025",
    id: "1",
  },
  { courseName: "Bride Came C.O.D., The", courseDate: "11/17/2023", id: "1" },
  {
    courseName: "Nostalgia for the Light (Nostalgia de la luz)",
    courseDate: "12/21/2024",
    id: "1",
  },
  {
    courseName: "Water Lilies (Naissance des pieuvres)",
    courseDate: "7/6/2024",
    id: "1",
  },
  {
    courseName: "One Nite In Mongkok (Wong gok hak yau)",
    courseDate: "12/14/2023",
    id: "1",
  },
  { courseName: "Monsieur Verdoux", courseDate: "2/7/2025", id: "1" },
  { courseName: "Bears", courseDate: "8/28/2023", id: "1" },
  { courseName: "My Dear Secretary", courseDate: "3/24/2025", id: "1" },
  { courseName: "Body Snatchers", courseDate: "3/2/2025", id: "1" },
  { courseName: "Gnomeo & Juliet", courseDate: "8/7/2023", id: "1" },
  { courseName: "Grateful Dawg", courseDate: "5/5/2025", id: "1" },
  { courseName: "Love, Rosie", courseDate: "11/2/2023", id: "1" },
  {
    courseName: "Woman Next Door, The (Femme d'à côté, La)",
    courseDate: "5/8/2023",
    id: "1",
  },
  { courseName: "Joan of Arc", courseDate: "4/12/2024", id: "1" },
  { courseName: "Orchestra Wives", courseDate: "5/20/2024", id: "1" },
  {
    courseName: "Agony and the Ecstasy of Phil Spector, The",
    courseDate: "6/15/2024",
    id: "1",
  },
  { courseName: "Deewaar", courseDate: "7/23/2023", id: "1" },
  {
    courseName: "Red Cliff Part II (Chi Bi Xia: Jue Zhan Tian Xia)",
    courseDate: "1/17/2025",
    id: "1",
  },
  { courseName: "Cookers", courseDate: "10/11/2023", id: "1" },
];

const Devoir = [
  { courseName: "Monsieur Verdoux", courseDate: "2/7/2025", id: "1" },
  { courseName: "Bears", courseDate: "8/28/2023", id: "1" },
  { courseName: "My Dear Secretary", courseDate: "3/24/2025", id: "1" },
  { courseName: "Body Snatchers", courseDate: "3/2/2025", id: "1" },
];

const Epreuves = [];

const EvaluationContinue = [];
