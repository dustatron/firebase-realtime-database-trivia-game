import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import AnswersContext from "./context/AnswersContext";
import QuizListContext from "./context/QuizListContext";
import GlobalContext from "./context/GlobalContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalContext>
      <AnswersContext>
        <QuizListContext>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </QuizListContext>
      </AnswersContext>
    </GlobalContext>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
