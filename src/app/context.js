import React, { createContext, useState } from "react";

const FetchingContext = createContext();

export const FetchingProvider = ({ children }) => {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [events, setEvents] = useState(null);
  const [classes, setClasses] = useState(null);
  const [modules, setModules] = useState(null);
  const [dataMapping, setDataMapping] = useState([[], [], [], []]);

  const contextValue = {
    students,
    setStudents,
    teachers,
    setTeachers,
    events,
    setEvents,
    classes,
    setClasses,
    modules,
    setModules,
    dataMapping,
    setDataMapping,
  };

  return (
    <FetchingContext.Provider value={contextValue}>
      {children}
    </FetchingContext.Provider>
  );
};

export default FetchingContext;
