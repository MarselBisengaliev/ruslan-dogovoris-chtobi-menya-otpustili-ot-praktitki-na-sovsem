import React from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const GameItem = ({
  title,
  author,
  scoreCount,
  slug,
  thumbnail,
  uploadTimestamp,
  description,
}) => {
  return (
    <div className="game-item">
      <div className="game-item__header">
        <h4>
          <Link to={`/games/${slug}`}>{title}</Link>{" "}
          <span>
           {author && <Link to={`/users/${author}`}>by {author}</Link>}
          </span>
        </h4>
        {scoreCount && <p># scores submitted: {scoreCount}</p>}
      </div>
      <div className="game-item__body mt-3">
       {thumbnail && <img src={`${API_URL}/storage${thumbnail}`} alt="" />}
       {!thumbnail && <img src="/logo512.png" alt=""/>}
        <p>{description}</p>
      </div>
      <Link to={`/games/${slug}/manage`} className="btn btn-primary mt-5">Manage Game</Link>
    </div>
  );
};

export default GameItem;
