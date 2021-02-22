import React, { useReducer } from "react";
import {
  LOG_USER_IN,
  LOG_USER_OUT,
  TOGGLE_GENERATE_MODAL,
  TOGGLE_CUSTOM_MODAL,
  SET_CURRENT_QUIZ,
  SET_FULL_QUIZ_LIST,
} from "./constants";

export const globalStateContext = React.createContext();
export const globalDispatchContext = React.createContext();

const initialState = {
  isloggedIn: false,
  uid: null,
  isGenerateModalShowing: false,
  isCustomQuestionModalShowing: false,
  currentQuiz: {},
  fullQuizList: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_USER_IN:
      return { ...state, ...payload };
    case LOG_USER_OUT:
      return { ...state, ...payload };
    case TOGGLE_GENERATE_MODAL:
      return {
        ...state,
        isGenerateModalShowing: !state.isGenerateModalShowing,
      };
    case TOGGLE_CUSTOM_MODAL:
      return {
        ...state,
        isCustomQuestionModalShowing: !state.isCustomQuestionModalShowing,
      };
    case SET_CURRENT_QUIZ:
      return { ...state, currentQuiz: payload };
    case SET_FULL_QUIZ_LIST:
      return { ...state, fullQuizList: payload };

    default:
      return state;
  }
};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <globalStateContext.Provider value={state}>
      <globalDispatchContext.Provider value={dispatch}>
        {children}
      </globalDispatchContext.Provider>
    </globalStateContext.Provider>
  );
};

GlobalContext.displayName = "GlobalState";

export default GlobalContext;
