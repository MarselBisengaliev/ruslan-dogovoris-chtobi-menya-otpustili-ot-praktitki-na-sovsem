import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Failure from "./components/Failure";
import Header from "./components/Header";
import Success from "./components/Success";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Signup from "./pages/Signup";
import DiscoverGames from "./pages/DiscoverGames";
import Game from "./pages/Game";
import UserProfile from "./pages/UserProfile";
import ManageGame from "./components/ManageGame";

export const AppContext = createContext();

function App() {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (title) {
      document.title = title;

      setSuccess("");
      setFailure("");
    }
  }, [title]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        token,
        setToken,
        success,
        setSuccess,
        failure,
        setFailure,
      }}
    >
      <Header />
      {success && <Success />}
      {failure && <Failure />}
      <main className="main mt-5 mb-5">
        <Routes>
          <Route path="/" element={<DiscoverGames />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-out" element={<Signout />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/games/:slug" element={<Game />} />
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/games/:slug/manage" element={<ManageGame />} />
        </Routes>
      </main>
    </AppContext.Provider>
  );
}

export default App;
