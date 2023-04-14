import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { useEffect } from "react";
import { getUser } from "../network/user";
import { useState } from "react";
import GameItem from "../components/GameItem";

const UserProfile = () => {
  const { title, setTitle } =
    useContext(AppContext);

  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser({ username });

        setUser(data);
        setTitle(data.username);
        setGames(data.authoredGames);
        setScores(data.highscores);
      } catch (error) {
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate, setTitle, username]);

  console.log(user);

  return (
    <section className="container">
      {user && (
        <>
          <h1>{title}</h1>
          <div className="home__main mt-5">
            <h3>Authored Games</h3>
            {Boolean(games.length) && games.map((g) => <GameItem {...g} />)}
          </div>

          <ul class="list-group mt-5">
          <h3>Highscores per game</h3>
            {scores &&
              scores.map((s, num) => {
                return (
                  <li class="list-group-item">
                    {s.game.title} - {s.score}
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </section>
  );
};

export default UserProfile;
