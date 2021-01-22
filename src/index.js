import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import SelectedQuizContext from "./context/SelectedQuizContext";
import AnswersContext from "./context/AnswersContext";
import UserContext from "./context/UserContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SelectedQuizContext>
      <AnswersContext>
        <UserContext>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UserContext>
      </AnswersContext>
    </SelectedQuizContext>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
