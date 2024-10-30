"use client";
import { useState } from "react";
import Link from "next/link";
import Attached from "./Attached";
import { useEffect, useContext } from "react";
import FetchingContext from "@/app/context";

import { Button, Avatar } from "@nextui-org/react";
import Plus from "@/app/events/Icons/Pluss";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { useRef } from "react";

import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";

// Main component to display a class with params
export default function Aclass({ params }) {
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

  const attachmentTypes = ["Cours", "Devoir", "Epreuves"];

  return (
    <div className="bg-white border-b-[3px] rounded-t-xl px-[26px] text-[18px] font-[600] text-black font-poppins">
      <div className="hidden sm:flex sm:justify-between sm:px-10 sm:items-center h-[75px] cursor-pointer">
        {attachmentTypes.map((type) => (
          <div
            key={type}
            onClick={() => setAttchType(type.replace(/\s/g, ""))}
            className={
              attchType === type.replace(/\s/g, "")
                ? "text-primary before:absolute before:h-[5px] before:w-full before:bottom-[-25px] before:left-0 transition-all ease-in-out before:bg-primary relative"
                : hoverAnimation
            }
          >
            {type === "Epreuves" ? "Classe inversée" : type}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for displaying a select input in mobile view
const SelectComp = ({ attchType, setAttchType }) => {
  const attachmentTypes = ["Cours", "Devoir", "Epreuves"];

  return (
    <select
      value={attachmentTypes.find(
        (type) => type.replace(/\s/g, "") === attchType
      )}
      onChange={(e) => {
        const selectedType = e.target.value.replace(/\s/g, "");
        setAttchType(selectedType);
        console.log(selectedType);
      }}
      className="sm:hidden placeholder:text-textgray text-primary border-none text-[20px] font-kumbhfont font-[700] rounded-lg mb-5 outline-none w-full h-12 text-center"
    >
      {attachmentTypes.map((type) => (
        <option key={type} value={type}>
          {type === "Epreuves" ? "Classe inversée" : type}
        </option>
      ))}
    </select>
  );
};

// Main module page component
const ModulePage = ({ params }) => {
  const [attchType, setAttchType] = useState("Cours");
  const [loading, setLoading] = useState(true);

  const { dataMapping, setDataMapping } = useContext(FetchingContext);

  // To test route
  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/classes/${params.grade}/${params.classId}/${params.moduleId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDataMapping(data.courses);
        } else {
          console.log("Failed to fetch modules");
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [params.grade, params.classId, params.moduleId]);

  const data = dataMapping[attchType] || [];

  if (loading) return <SkeletonAclass />;

  return (
    <div className="flex flex-col w-full gap-5 sm:gap-9 gap-x-0 sm:gap-x-8">
      <div className="flex w-full justify-between  items-center  gap-2 px-4 sm:px-[13%]">
        <AnnualProgram params={params} />
        <DeleteModule params={params} />
      </div>
      <div className="flex flex-col gap-5 sm:gap-9 items-center">
        <AddingElement params={params} />
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

// Adding element

function AddingElement({ params }) {
  const { data: session } = useSession();

  const inputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!session) return null;

  if (!(session?.user.role === "teacher")) return null;

  return (
    <>
      <div
        className="relative flex justify-evenly 
        items-center gap-3 py-4 sm:py-2 sm:w-[75%] w-[100%] min-h-[110px] rounded-xl overflow-hidden bg-white px-2"
      >
        <div className="absolute top-0 w-full h-[10px] left-0 sm:h-full sm:w-[10px] bg-primary"></div>
        <div className="flex flex-row items-center gap-4 p-2 sm:pl-[1.5%] rounded-full bg-bgfakeWhite h-[50px] w-[60%] sm:w-[75%] sm:min-w-[220px] sm:max-w-[650px] sm:h-[70px] sm:ml-[25px]">
          <Avatar
            src={session?.user.pfp}
            size="large"
            fallback
            className="hidden sm:flex w-[45px] h-[45px] min-w-[45px] sm:w-[55px] sm:h-[55px] sm:min-w-[55px]"
          />
          <input
            id="addEventInput"
            className=" text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 min-w-[100px]"
            type="text"
            placeholder="Add Course ..."
            ref={inputRef}
          />
        </div>
        <Button
          className="cursor-pointer h-[50px] sm:h-[55px] sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
          startContent={<Plus />}
          onClick={onOpen}
        >
          Add
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <AddForm title={inputRef?.current?.value ?? ""} params={params} />
      </Modal>
    </>
  );
}

function AddForm({ title = "", params }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const types = ["Cours", "Devoir", "Epreuves"];
  //  will add  "Evaluation Continue" when i fix the thing

  const [file, setFile] = useState(null);
  const [type, setType] = useState(null);

  const { dataMapping, setDataMapping } = useContext(FetchingContext);

  const onSubmit = async (data) => {
    if (!type) return;

    if (type === "2" && !data.link) return;

    if (type !== "2" && !file) return;

    const formData = new FormData();
    if (type !== "2") {
      formData.append("file", file);
    } else {
      formData.append("file", data.link);
    }
    formData.append("name", data.name);
    formData.append("type", types[Number(type)]);

    const response = await fetch(
      `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/add`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    // console.log(dataMapping);
    // console.log(result.course.type);
    // console.log(dataMapping[result.course.type]);
    // console.log(result);
    if (response.ok) {
      const newData = {
        ...dataMapping,
        [result.course.type.replace(/\s/g, "")]: [
          ...dataMapping[result.course.type.replace(/\s/g, "")],
          result.course,
        ],
      };
      setDataMapping(newData);
      onCloseRef.current();
    } else {
      console.log("Failed to add course");
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Course
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                {type !== "3" && type !== "2" && (
                  <FileUploader
                    handleChange={(e) => setFile(e)}
                    name="Course File"
                    maxSize={100}
                  />
                )}
                {/* to be edited , will be shown later now u cant access it */}
                {type === "3" && (
                  <div className="flex flex-col gap-2">
                    <FileUploader
                      handleChange={(e) => setFile(e)}
                      name="Course File"
                      maxSize={100}
                      types={["XLSX"]}
                    />
                    <ListGetter params={params} />
                  </div>
                )}
                {type === "2" && (
                  <Input
                    label="Link"
                    variant="bordered"
                    {...register("link", {
                      validate: (value) => {
                        // Regular expression for URL validation
                        const urlPattern = new RegExp(
                          "^(https?:\\/\\/)?" + // protocol
                            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                            "(\\#[-a-z\\d_]*)?$",
                          "i" // fragment locator
                        );
                        if (urlPattern.test(value)) {
                          return true;
                        }
                        return "Invalid URL format";
                      },
                    })}
                    isInvalid={!!errors.link}
                    errorMessage={errors?.link?.message ?? ""}
                  />
                )}
                <Input
                  label="Title"
                  variant="bordered"
                  defaultValue={title}
                  {...register("name", {
                    validate: (value) => {
                      if (value.length >= 2) return true;
                      return "Must be at least 2 characters long";
                    },
                  })}
                  isInvalid={!!errors.name}
                  errorMessage={errors?.name?.message ?? ""}
                />
                <Select
                  label="Type"
                  placeholder="Select a type"
                  onChange={(e) => setType(e.target.value)}
                >
                  {types.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <button
                  ref={submitButtonRef}
                  className="hidden"
                  type="submit"
                ></button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitButtonRef.current.click()}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

const AnnualProgram = ({ params }) => {
  const { data: session } = useSession();

  if (!session) return null;

  if (session.user.role === "admin")
    return (
      <div className="flex justify-between">
        <div className="w-full flex items-end justify-end">
          <AddProgram params={params} />
        </div>
      </div>
    );

  //direct link to the program
  return (
    <div className="w-full sm:w-[88%] flex justify-between">
      <div className="w-full flex items-end justify-end">
        <ProgramGetter params={params} />
      </div>
    </div>
  );
};

const DeleteModule = ({ params }) => {
  const { data: session } = useSession();

  if (!session) return null;

  if (session.user.role === "admin")
    return (
      <div className="flex justify-between">
        <div className="w-full flex items-end justify-end">
          <Deleting params={params} />
        </div>
      </div>
    );

  return null;
};

function ProgramGetter({ params }) {
  const [programLink, setProgramLink] = useState("");

  useEffect(() => {
    const fetchProgramLink = async () => {
      try {
        const response = await fetch(
          `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/program`
        );
        const data = await response.json();
        if (response.ok) {
          setProgramLink(data.programLink);
        } else {
          console.error("Failed to fetch program link:", data.message);
        }
      } catch (error) {
        console.error("Error fetching program link:", error);
      }
    };

    fetchProgramLink();
  }, [params]);

  if (!programLink) return null;

  return (
    <Link href={programLink}>
      <div className="">
        <Button className="cursor-pointer h-[50px] sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium">
          Program
        </Button>
      </div>
    </Link>
  );
}

function AddProgram({ params }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="">
        <Button
          className="cursor-pointer h-[50px] sm:h-[55px] sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primary rounded-[40px] text-medium"
          startContent={<Plus />}
          onClick={onOpen}
        >
          Program
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <AddingProgramForm params={params} />
      </Modal>
    </>
  );
}

function Deleting({ params }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="">
        <Button
          className="cursor-pointer h-[50px] sm:h-[55px] sm:w-36 w-32 gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-red rounded-[40px] text-medium"
          startContent={<DeleteIcon />}
          onClick={onOpen}
        >
          Delete
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="m-2"
      >
        <DeleteConfermation params={params} />
      </Modal>
    </>
  );
}

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 48 48"
    >
      <path
        fill="white"
        d="M20.5 4a1.5 1.5 0 00-1.434 2h-2.925a5.5 5.5 0 00-4.577 2.45L9.197 12H7.5a1.5 1.5 0 100 3h2.264a1.5 1.5 0 00.445 0H36.33l-1.572 14.68a1.5 1.5 0 102.982.318L39.348 15H40.5a1.5 1.5 0 100-3h-1.697l-2.367-3.55A5.505 5.505 0 0031.859 6h-2.925A1.5 1.5 0 0027.5 4h-7zm-4.36 5h15.72c.837 0 1.615.416 2.08 1.113L35.196 12H12.803l1.258-1.887a1.5 1.5 0 00.002-.002A2.489 2.489 0 0116.14 9zm-5.568 8.65a1.5 1.5 0 00-1.455 1.68l2.008 18.756A5.519 5.519 0 0016.594 43h14.81a5.519 5.519 0 005.469-4.914l.373-3.48a1.5 1.5 0 10-2.982-.319l-.373 3.479A2.483 2.483 0 0131.404 40h-14.81a2.48 2.48 0 01-2.485-2.234L12.1 19.012a1.5 1.5 0 00-1.527-1.362z"
      ></path>
    </svg>
  );
}

function DeleteConfermation({ params }) {
  const onCloseRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDelete = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/delete`,
        {
          method: "Delete",
        }
      );

      if (response.ok) {
        // console.log(result);
        onCloseRef.current();
        window.location.href = `/classes/${params.grade}/${params.classId}`;
      } else {
        console.log("Failed to delete module");
      }
    } catch {
      console.log("Failed to delete module");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Module
            </ModalHeader>
            <ModalBody>
              <h1 className="w-full h-full text-center text-red text-lg">
                You sure you want to delete this module ?
              </h1>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center gap-8">
              <Button variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                onPress={onDelete}
                isLoading={isSubmitting}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

function AddingProgramForm({ params }) {
  const submitButtonRef = useRef(null);
  const onCloseRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `/api/classes/${params.grade}/${params.classId}/${params.moduleId}/addprogram`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        // console.log(result);
        onCloseRef.current();
      } else {
        console.log("Failed to add program");
      }
    } catch {
      console.log("Failed to add program");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => {
        onCloseRef.current = onClose;
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Program
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3 items-center"
                onSubmit={onSubmit}
              >
                <FileUploader
                  handleChange={(e) => setFile(e)}
                  name="Program File"
                  maxSize={25}
                />
                <button
                  ref={submitButtonRef}
                  className="hidden"
                  type="submit"
                ></button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitButtonRef.current.click()}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </ModalContent>
  );
}

//this component will be changed maybe
const ListGetter = ({ params }) => {
  return (
    <div className="w-full flex flex-xol items-center justify-center">
      <Link
        href={`/api/classes/${params.grade}/${params.classId}/${params.moduleId}/evaluationcontinue`}
      >
        <p className="text-primary cursor-pointer">Get Students List?</p>
      </Link>
    </div>
  );
};

const SkeletonAclass = () => {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <SkeletonModulePage />
    </main>
  );
};

const SkeletonModulePage = () => {
  return (
    <div className="flex flex-col w-full gap-5 sm:gap-9 gap-x-0 sm:gap-x-8">
      <div className="flex flex-col gap-5 sm:gap-9 items-center">
        <div className="w-[95%] sm:w-[75%] rounded-xl">
          <SkeletonSelectComp />
          <SkeletonListHeader />
          <div className="bg-white px-8 py-5 flex flex-col gap-[30px] rounded-b-xl h-[70vh] overflow-y-scroll">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <SkeletonAttachment key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonAttachment = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="bg-gray-400 rounded-full w-[50px] h-[50px] p-2"></div>
      <div className="flex flex-col">
        <div className="bg-gray-300 h-[18px] w-[150px] mb-2 rounded-lg"></div>
        <div className="bg-gray-200 h-[14px] w-[100px] rounded-lg"></div>
      </div>
    </div>
  );
};

const SkeletonListHeader = () => {
  return (
    <div className="bg-white border-b-[3px] rounded-t-xl px-[26px] text-[18px] font-[600] text-black">
      <div className="hidden sm:flex sm:justify-between sm:items-center h-[75px]">
        {["Cours", "Devoir", "Epreuves", "Evaluation Continue"].map(
          (type, index) => (
            <div
              key={index}
              className="bg-gray-300 h-[20px] w-[100px] rounded-xl"
            ></div>
          )
        )}
      </div>
    </div>
  );
};

const SkeletonSelectComp = () => {
  return (
    <div className="sm:hidden">
      <div className="bg-gray-300 h-12 w-full rounded-lg mb-5"></div>
    </div>
  );
};
