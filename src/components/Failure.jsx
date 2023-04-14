import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Failure = () => {
  const { failure } = useContext(AppContext);

  return (
    <div className="alert alert-danger" role="alert">
      <div className="container">{failure}</div>
    </div>
  );
};

export default Failure;
