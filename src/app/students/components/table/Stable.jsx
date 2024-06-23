"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Action from "./actions/Action";
import PhoneIcon from "./PhoneIcon";

//this table still needs pagination , search and linking the adds and deletes

export default function App() {
  const students = [
    {
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      phone: "555-1234",
      email: "john.doe@example.com",
      address: "123 Main St, Springfield, IL",
      parentName: "Jane Doe",
      grade: "cem",
      class: "2m2",
      gender: "Male",
      pfp: "https://cdn.pfps.gg/pfps/4309-jojo-12.png",
    },
    {
      name: "Alice Smith",
      firstName: "Alice",
      lastName: "Smith",
      phone: "555-5678",
      email: "alice.smith@example.com",
      address: "456 Oak St, Springfield, IL",
      parentName: "Robert Smith",
      grade: "lycee",
      class: "1S1",
      gender: "Female",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "Michael Johnson",
      firstName: "Michael",
      lastName: "Johnson",
      phone: "555-8765",
      email: "michael.johnson@example.com",
      address: "789 Pine St, Springfield, IL",
      parentName: "Laura Johnson",
      grade: "prm",
      class: "1p1",
      gender: "Male",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "Emma Brown",
      firstName: "Emma",
      lastName: "Brown",
      phone: "555-4321",
      email: "emma.brown@example.com",
      address: "321 Birch St, Springfield, IL",
      parentName: "James Brown",
      grade: "lycee",
      class: "1S1",
      gender: "Female",
      pfp: "https://cdn.pfps.gg/pfps/4309-jojo-12.png",
    },
    {
      name: "David Wilson",
      firstName: "David",
      lastName: "Wilson",
      phone: "555-6789",
      email: "david.wilson@example.com",
      address: "654 Cedar St, Springfield, IL",
      parentName: "Patricia Wilson",
      grade: "prm",
      class: "1p1",
      gender: "Male",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "Olivia Taylor",
      firstName: "Olivia",
      lastName: "Taylor",
      phone: "555-9876",
      email: "olivia.taylor@example.com",
      address: "987 Maple St, Springfield, IL",
      parentName: "William Taylor",
      grade: "cem",
      class: "2m2",
      gender: "Female",
      pfp: "https://cdn.pfps.gg/pfps/4309-jojo-12.png",
    },
    {
      name: "Daniel Martinez",
      firstName: "Daniel",
      lastName: "Martinez",
      phone: "555-5432",
      email: "daniel.martinez@example.com",
      address: "432 Willow St, Springfield, IL",
      parentName: "Maria Martinez",
      grade: "lycee",
      class: "1S1",
      gender: "Male",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "Sophia Anderson",
      firstName: "Sophia",
      lastName: "Anderson",
      phone: "555-8764",
      email: "sophia.anderson@example.com",
      address: "876 Elm St, Springfield, IL",
      parentName: "Richard Anderson",
      grade: "cem",
      class: "2m2",
      gender: "Female",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "James Thomas",
      firstName: "James",
      lastName: "Thomas",
      phone: "555-1235",
      email: "james.thomas@example.com",
      address: "1234 Spruce St, Springfield, IL",
      parentName: "Nancy Thomas",
      grade: "prm",
      class: "1p1",
      gender: "Male",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
    {
      name: "Isabella Garcia",
      firstName: "Isabella",
      lastName: "Garcia",
      phone: "555-9875",
      email: "isabella.garcia@example.com",
      address: "9876 Redwood St, Springfield, IL",
      parentName: "David Garcia",
      grade: "lycee",
      class: "1S1",
      gender: "Female",
      pfp: "https://cdn.pfps.gg/pfps/2392-jojo-13.png",
    },
  ];

  const classNames = {
    th: ["bg-transparent", "border-b-1", "border-gray-300"],
  };

  let list = useAsyncList({
    async load() {
      //fetching logic
      return {
        items: students,
      };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: items.sort((a, b) => {
          return a[sortDescriptor.column].localeCompare(
            b[sortDescriptor.column]
          );
        }),
      };
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <Table
        color={"primary"}
        selectionMode="multiple"
        aria-label="Students table"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={classNames}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              className={column.key !== "name" ? "hidden md:table-cell " : ""}
              allowsSorting
            >
              {column.name}
              {/* will be firstName + LastName */}
            </TableColumn>
          ))}
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Students to display."}>
          {list.items.map((student, index) => (
            //key to be replaced with the student id
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center justify-start gap-2">
                  <Avatar fallback src={student.pfp} className=" md:hidden" />
                  {getKeyValue(student, "firstName") +
                    " " +
                    getKeyValue(student, "lastName")}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex gap-2 items-center justify-center">
                  <PhoneIcon />
                  {getKeyValue(student, "phone")}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {getKeyValue(student, "email")}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <GradeBox tClassName={getKeyValue(student, "grade")} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {getKeyValue(student, "parentName")}
              </TableCell>
              <TableCell className="hidden md:table-cell p-4 pr-6">
                <ClassBox tClassName={getKeyValue(student, "class")} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {getKeyValue(student, "gender")}
              </TableCell>
              <TableCell>
                <Action data={student} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const columns = [
  { key: "name", name: "Name" },
  { key: "phone", name: "Phone" },
  { key: "email", name: "Email" },
  { key: "grade", name: "Grade" },
  { key: "parentName", name: "Parent Name" },
  { key: "class", name: "Class" },
  { key: "gender", name: "Gender" },
];

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
