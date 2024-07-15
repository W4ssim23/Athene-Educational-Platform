import React, { createContext, useState } from "react";

const FetchingContext = createContext();

export const FetchingProvider = ({ children }) => {
  const [students, setStudents] = useState(null);

  const contextValue = {
    students,
    setStudents,
  };

  return (
    <FetchingContext.Provider value={contextValue}>
      {children}
    </FetchingContext.Provider>
  );
};

export default FetchingContext;
