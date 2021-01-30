import React, { useState, useContext, createContext } from "react";
/// Create Context
export const quizListContext = createContext();
export const updateQuizListContext = createContext();

/// Hooks
export const useQuizList = () => {
  return useContext(quizListContext);
};

export const useUpdateQuizList = () => {
  return useContext(updateQuizListContext);
};

const QuizListContext = ({ children }) => {
  const [list, setList] = useState([]);
  return (
    <quizListContext.Provider value={list}>
      <updateQuizListContext.Provider value={setList}>
        {children}
      </updateQuizListContext.Provider>
    </quizListContext.Provider>
  );
};

export default QuizListContext;
