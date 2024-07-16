import {
  DatePicker,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { Absence } from "@/assets";
import FetchingContext from "@/app/context";
import Trash from "./Trash";
import Image from "next/image";

export default function Absences({ data }) {
  const [absences, setAbsences] = useState([]);
  const [date, setDate] = useState({});
  const [loading, setLoading] = useState(false);

  const { students, setStudents } = useContext(FetchingContext);

  useEffect(() => {
    if (data.abcense) {
      const formattedAbsences = data.abcense.map((dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      });
      setAbsences(formattedAbsences);
    }
  }, [data.abcense]);

  const handleAdd = async () => {
    const currentDate = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);

    if (selectedDate > currentDate) {
      alert("You cannot select a future date.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/students/${data.id}/abcense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const formattedDate = `${selectedDate.getDate()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getFullYear()}`;
        setAbsences([...absences, formattedDate]);

        // Update the student in the students list
        const updatedStudents = students.map((student) => {
          if (student.id === data.id) {
            return {
              ...student,
              abcense: [...student.abcense, selectedDate.toISOString()],
            };
          }
          return student;
        });
        setStudents(updatedStudents);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (absence) => {
    const dateParts = absence.split("/");
    const formattedDate = new Date(
      dateParts[2],
      dateParts[1] - 1,
      dateParts[0]
    );

    try {
      setLoading(true);
      const response = await fetch(`/api/students/${data.id}/abcense`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate.toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAbsences(absences.filter((item) => item !== absence));
        // Update the student in the students list
        const updatedStudents = students.map((student) => {
          if (student.id === data.id) {
            return {
              ...student,
              abcense: student.abcense.filter(
                (date) => date !== formattedDate.toISOString()
              ),
            };
          }
          return student;
        });
        setStudents(updatedStudents);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">Absence</ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="bg-white flex gap-8 justify-evenly w-full">
                <div className="sm:w-[50%] w-full sm:max-w-[300px] flex flex-col gap-4 items-end">
                  <DatePicker
                    label="Absence Date"
                    variant="bordered"
                    onChange={(e) => setDate(e)}
                  />
                  <div>
                    <Button
                      radius="full"
                      className=" bg-orange text-white"
                      isLoading={loading}
                      onClick={() => handleAdd()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="sm:w-[50%] w-full sm:max-w-[300px] flex flex-col">
                  <p className="pl-1 mb-2 font-[500] text-[14px] text-[#303972] font-poppins">
                    Les Absences :
                  </p>
                  <div className="w-full flex flex-col max-h-[180px] overflow-y-scroll rounded-lg">
                    {absences.map((absence, index) => (
                      <AbsenceItem
                        key={index}
                        date={absence}
                        setAbsences={setAbsences}
                        absences={absences}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

const AbsenceItem = ({ date, setAbsences, absences, handleDelete }) => {
  const [delLoading, setDelLoading] = useState(false);

  return (
    <div className="p-2 justify-evenly flex items-center gap-2 w-full border-b">
      <Image
        className="w-[25px] h-[25px]"
        height={"25px"}
        width={"25px"}
        src={Absence}
        alt=""
      />
      <div className="text-primary font-poppins">{date}</div>
      <div className="group relative rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all">
        <Button
          isLoading={delLoading}
          isIconOnly
          radius="full"
          className="p-1.5 bg-[#FF4550] w-[30px] h-[30px]"
          onClick={() => {
            setDelLoading(true);
            handleDelete(date).finally(() => setDelLoading(false));
          }}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
