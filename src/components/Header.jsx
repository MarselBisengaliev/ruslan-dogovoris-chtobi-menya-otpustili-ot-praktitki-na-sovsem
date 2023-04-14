import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../App";
import { signout } from "../network/auth";

const Header = () => {
  const { token, setToken, setFailure, setSuccess } = useContext(AppContext);

  const handleSignout = async (e) => {
    try {
      await signout({ token });
      
      setToken('');
      localStorage.removeItem('token');
    } catch (error) {
      e.preventDefault();
      console.error(error);

      if (error.response.data.message) {
        setSuccess("");
        setFailure(error.response.data.message);
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          WorldSkills - Games
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse links" id="navbarNav">
          <ul className="navbar-nav">
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item">
                <NavLink onClick={handleSignout} className="nav-link" to="/sign-out">
                  Sign Out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
