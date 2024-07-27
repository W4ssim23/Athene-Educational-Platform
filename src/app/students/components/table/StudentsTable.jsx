"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Avatar,
} from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import FetchingContext from "@/app/context";
import Action from "./actions/Action";
import MultiDelete from "./MultiDelete";
import PhoneIcon from "./PhoneIcon";

// Needs to be fixed (sorting by name and by classes )

export default function App() {
  const { students, setStudents } = useContext(FetchingContext);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({});

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch students");
        setItems([]);
        return;
      }

      const data = await response.json();
      setStudents(data.students);
      setItems(data.students);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students) {
      setItems(students);
    }
  }, [students]);

  const handleSortChange = (columnKey) => {
    let direction = "ascending";
    setSortDescriptor((prevSortDescriptor) => {
      if (
        prevSortDescriptor.column === columnKey &&
        prevSortDescriptor.direction === "ascending"
      ) {
        direction = "descending";
      }
      return { column: columnKey, direction };
    });
    sortItems(columnKey, direction);
  };

  const sortItems = (columnKey, direction) => {
    const sortedItems = [...items].sort((a, b) => {
      let comparison = a[columnKey].localeCompare(b[columnKey]);
      if (direction === "descending") {
        comparison *= -1;
      }
      return comparison;
    });
    setItems(sortedItems);
  };

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <StudentsTableSkeleton />
      ) : (
        <Table
          color={"primary"}
          selectionMode="multiple"
          aria-label="Students table"
          sortDescriptor={sortDescriptor}
          onSortChange={(sort) => handleSortChange(sort.column)}
          classNames={classNames}
          onSelectionChange={(selected) => {
            setSelected(selected);
          }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn
                key={column.key}
                className={
                  column.key === "name"
                    ? ""
                    : column.key === "gender"
                    ? "hidden wwl:table-cell"
                    : column.key === "parentName"
                    ? "hidden wl:table-cell"
                    : "hidden md:table-cell"
                }
                allowsSorting
                onClick={() => handleSortChange(column.key)}
              >
                {column.name}
              </TableColumn>
            ))}
            <TableColumn className="p-0">
              {selected.size || selected == "all" ? (
                <MultiDelete data={selected} />
              ) : (
                "Actions"
              )}
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Students to display."}>
            {items.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center justify-start gap-2 ">
                    <Avatar fallback src={student.pfp} className=" md:hidden" />
                    <p className="w-full text-center">
                      {getKeyValue(student, "firstName") +
                        " " +
                        getKeyValue(student, "lastName")}
                    </p>
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
                <TableCell className="hidden wl:table-cell">
                  {getKeyValue(student, "parentName")}
                </TableCell>
                <TableCell className="hidden md:table-cell p-4 pr-6">
                  <ClassBox tClassName={getKeyValue(student, "className")} />
                </TableCell>
                <TableCell className="hidden wwl:table-cell">
                  {getKeyValue(student, "gender")}
                </TableCell>
                <TableCell>
                  <Action data={student} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
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

const classNames = {
  tr: ["text-center"],
  th: ["bg-transparent", "border-b-1", "border-gray-300", "text-center"],
};

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
        "text-white text-center text-[14px] text-bold  rounded-full shadow-md cursor-pointer py-2 px-3 max-w-[140px]"
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
        "text-white text-center text-[13px] text-bold rounded-full shadow-md cursor-pointer py-2 px-[14px] max-w-[100px]"
      }
      style={boxStyles}
    >
      {tClassName && ` ${tClassName.toUpperCase()}`}
    </div>
  );
}

const StudentsTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <div className="w-full flex justify-between p-4 bg-gray-400">
          {[
            "Name",
            "Phone",
            "Email",
            "Grade",
            "Parent Name",
            "Class",
            "Gender",
            "Actions",
          ].map((header) => (
            <div key={header} className="w-1/8 h-4 bg-gray-500 rounded"></div>
          ))}
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center p-4 border-t border-gray-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div className="sm:w-24 w-36 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="w-24 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-36 h-4 bg-gray-400 rounded-full hidden md:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-28 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="w-12 h-4 bg-gray-400 rounded-full hidden md:block"></div>
            <div className="w-16 h-4 bg-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
