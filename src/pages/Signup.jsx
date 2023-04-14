import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import { signup } from "../network/auth";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { title, setTitle, setToken, setSuccess, setFailure, token } =
    useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Sign Up");
  }, [setTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const data = await signup({ formData });

      setToken(data.token);
      setFailure("");
      setSuccess(data.status);
    } catch (error) {
      console.error(error);

      if (error.response.data.message) {
        setSuccess("");
        setFailure(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate])
  return (
    <section className="container">
      <h1 className="mb-5">{title}</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          {title}
        </button>
      </form>
    </section>
  );
};

export default Signup;
