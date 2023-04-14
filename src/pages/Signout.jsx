import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";

const Signout = () => {
  const { setTitle, title } = useContext(AppContext);

  useEffect(() => {
    setTitle("Sign Out");
  }, [setTitle]);

  return (
    <section className="container">
      <h1 className="mb-5">{title}</h1>
      <h3>You have been sucefully signed out</h3>
    </section>
  );
};

export default Signout;
