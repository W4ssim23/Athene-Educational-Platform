import React, { createContext, useState } from "react";

const FetchingContext = createContext();

export const FetchingProvider = ({ children }) => {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [events, setEvents] = useState(null);

  const contextValue = {
    students,
    setStudents,
    teachers,
    setTeachers,
    events,
    setEvents,
  };

  return (
    <FetchingContext.Provider value={contextValue}>
      {children}
    </FetchingContext.Provider>
  );
};

export default FetchingContext;
