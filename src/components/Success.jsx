import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Success = () => {
  const { success } = useContext(AppContext);

  return (
    <div className="alert alert-success" role="alert">
      <div className="container">{success}</div>
    </div>
  );
};

export default Success;
