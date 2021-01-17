/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, createContext } from "react";

//////////////// Context ////////////////////
export const selectedContext = createContext();
export const selectedUpdateContext = createContext();

///////////////// Hooks /////////////////////
export const useSelectedQuiz = () => {
  return useContext(selectedContext);
};
export const useSelectedQuizUpdate = () => {
  return useContext(selectedUpdateContext);
};

function SelectedQuizContext({ children }) {
  const [data, setState] = useState("");

  const handleUpdate = (d) => {
    setState(d);
  };

  return (
    <selectedContext.Provider value={data}>
      <selectedUpdateContext.Provider value={handleUpdate}>
        {children}
      </selectedUpdateContext.Provider>
    </selectedContext.Provider>
  );
}

export default SelectedQuizContext;
