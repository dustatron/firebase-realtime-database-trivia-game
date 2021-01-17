import React from "react";
import { useQuery } from "react-query";
import Question from "./Question";
import SaveTrivia from "./SaveTrivia";

const Generator = () => {
  const { isLoading, isError, data, error } = useQuery("quiz", () => {
    return fetch("https://opentdb.com/api.php?amount=10").then((res) =>
      res.json()
    );
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data)
    return (
      <div>
        <h2>Generator</h2>
        <SaveTrivia quiz={data.results} />
        {data.results.map((que) => {
          return <Question q={que} />;
        })}
      </div>
    );
  return <div> no data </div>;
};

export default Generator;
