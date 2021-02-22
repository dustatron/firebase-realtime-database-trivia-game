import React, { useState, useContext, createContext } from "react";

/// Create Context
export const currentAnswerContext = createContext();
export const updateCurrentAnswerContext = createContext();

/// Hooks
export const useCurrentAnswer = () => {
  return useContext(currentAnswerContext);
};

export const useUpdateCurrentAnswer = () => {
  return useContext(updateCurrentAnswerContext);
};
const AnswersContext = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const updateAnswers = (input, clear) => {
    if (clear) {
      return setAnswers({});
    }
    const newState = { ...answers, ...input };
    setAnswers(newState);
  };
  return (
    <currentAnswerContext.Provider value={answers}>
      <updateCurrentAnswerContext.Provider value={updateAnswers}>
        {children}
      </updateCurrentAnswerContext.Provider>
    </currentAnswerContext.Provider>
  );
};

export default AnswersContext;
