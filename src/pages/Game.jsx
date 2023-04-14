import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { getGame } from "../network/game";
import { useNavigate, useParams } from "react-router-dom";
import { getScores, postScore } from "../network/score";

const API_URL = process.env.REACT_APP_API_URL;

const Game = () => {
  const {
    title,
    setTitle,
    token,
    setSuccess,
    setFailure,
  } = useContext(AppContext);
  const [game, setGame] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGame({ slug });
        console.log(data);

        setTitle(data.title);
        setGame(data);
      } catch (error) {
        navigate("/");
      }
    };

    fetchGame();
  }, [setTitle, setFailure, navigate, slug]);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores({ slug });
      setScores(data.scores.splice(0, 9));
    };

    if (game) {
      fetchScores();

      setInterval(async () => {
        await fetchScores();
      }, 5000);
    }
  }, [game, slug]);

  useEffect(() => {
    window.addEventListener("message", async (e) => {
      if (e.data.event_type === "game_run_end") {
        const score = Math.floor(e.data.score);

        const data = await postScore({ slug, score, token });
        setSuccess(`${data.status}, score: ${score}`);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    });
  }, [setSuccess, slug, token]);

  return (
    <section className="container">
      {game && (
        <>
          <h1>{title}</h1>
          <div className="game__body">
            <iframe
              title={title}
              src={`${API_URL}/storage${game.gamePath}`}
            ></iframe>
            <div className="leaderboard">
              <h4>Top 10 Leaderbord</h4>
              <ul className="list-group">
                {scores &&
                  scores.map((s, num) => {
                    return (
                      <li key={num} className="list-group-item">
                        #{num + 1} {s.username} - {s.score}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="leaderboard mt-5">
              <h4>Description</h4>
              <p>{game.description}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Game;
