import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { getGames } from "../network/game";
import GameItem from "../components/GameItem";

const DiscoverGames = () => {
  const { setTitle } = useContext(AppContext);
  const [sortBy, setSortBy] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [totalGames, setTotalGames] = useState(null);
  const [size, setSize] = useState(2);
  const [games, setGames] = useState([]);

  useEffect(() => {
    setTitle("Discover Games");
  }, [setTitle]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames({ sortBy, sortDir, size });

      console.log(data);
      setGames(data.content);
      setTotalGames(data.totalElements);
    };

    fetchGames();
  }, [size, sortBy, sortDir]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setSize((prevVal) => prevVal + 1);
      }
    });
  }, []);

  return (
    <section className="container">
      <div className="home__header">
        <h3>{totalGames} Games available</h3>
        <div className="filter">
          <div className="filter-group">
            <button
              onClick={() => setSortBy("popular")}
              className="btn btn-primary"
            >
              Popularity
            </button>
            <button
              onClick={() => setSortBy("uploaddate")}
              className="btn btn-primary"
            >
              Recently Uploaded
            </button>
            <button
              onClick={() => setSortBy("title")}
              className="btn btn-primary"
            >
              Alphabetically
            </button>
          </div>
          <div className="filter-group">
            <button
              onClick={() => setSortDir("asc")}
              className="btn btn-primary"
            >
              ASC
            </button>
            <button
              onClick={() => setSortDir("desc")}
              className="btn btn-primary"
            >
              DESC
            </button>
          </div>
        </div>
      </div>
      <div className="home__main mt-5">
        {Boolean(games.length) && games.map((g) => <GameItem key={g.slug} {...g} />)}
      </div>
    </section>
  );
};

export default DiscoverGames;
