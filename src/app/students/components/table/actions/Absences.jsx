"use client";

import {
  DatePicker,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import SmallButton from "@/app/components/ui/SmallButton";
import { Absence, Absent, Trash } from "@/assets";

export default function Absences({ data }) {
  const [absences, setAbsences] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > currentDate) {
      alert("You cannot select a future date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `api/Absences/`,
        {
          date: date,
          student: data.id,
          module: 1, //will make it the hidden module
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      console.log(response);
      setAbsences([...absences, response.data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //fetching the data
  useEffect(() => {
    // const fetchAbsences = async () => {
    //   try {
    //     const response = await axios.get(`api/students/${data.id}/absences`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authTokens.access}`,
    //       },
    //     });
    //     console.log(response);
    //     setAbsences(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchAbsences();
  }, []);

  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">Absence</ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="bg-white flex gap-8  justify-evenly w-full">
                <div className="sm:w-[50%] w-full sm:max-w-[300px] flex flex-col gap-4 items-end">
                  <DatePicker
                    label="Absence Date"
                    variant="bordered"
                    // onChange={(e) => {
                    //   setDate(e);
                    //   console.log(e);
                    // }}
                    // data={{
                    //   name: "Absence Date",
                    //   label: "Absence Date *",
                    // }}
                    // type="date"
                  />
                  <div onClick={() => handleAdd()}>
                    <Button
                      radius="full"
                      color="primary"
                      // loading={loading}
                      // data={{
                      //   string: "Add",
                      //   style:
                      //     "bg-orange text-white font-poppins gap-2 px-4 py-2 md:text-[19px] rounded-lg flex cursor-pointer ",
                      //   icon: Absent,
                      // }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="sm:w-[50%] w-full sm:max-w-[300px] flex  flex-col ">
                  <p className="pl-1 mb-2 font-[500] text-[14px] text-[#303972] font-poppins">
                    Les Absences :
                  </p>
                  <div className=" w-full flex flex-col max-h-[180px] overflow-y-scroll rounded-lg">
                    {absences.map((absence) => (
                      <AbsenceItem
                        date={absence.date}
                        id={absence.id}
                        setAbsences={setAbsences}
                        absences={absences}
                        authTokens={authTokens}
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

const AbsenceItem = ({ date, id, setAbsences, absences, authTokens }) => {
  const [delLoading, setDelLoading] = useState(false);

  const handleDelete = async () => {
    setDelLoading(true);
    try {
      const response = await axios.delete(`api/Absences/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log(response);
      setAbsences(absences.filter((absence) => absence.id !== id));
      setDelLoading(false);
    } catch (error) {
      console.error(error);
      setDelLoading(false);
    }
  };

  return (
    <div className="p-2 justify-evenly flex items-center gap-2 w-full border-b">
      <img className="w-[30px] h-[30px]" src={Absence} alt="" />
      <div className="text-primarypurp font-poppins">{date}</div>
      <SmallButton picture={Trash} bg={"#FF4550"} size={"30px"} />
    </div>
  );
};
