import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { deleteGame, getGame, updateGame } from "../network/game";
import { uploadVersion } from "../network/gameVersion";

const ManageGame = () => {
  const { title, setTitle, token, setSuccess, setFailure } =
    useContext(AppContext);
  const [game, setGame] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [inputTilte, setInputTilte] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [zipfile, setZipFile] = useState(null);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        title: inputTilte,
        description: inputDescription,
      };

      const data = await updateGame({ slug, token, formData });
      setSuccess(data.status);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      if (error.response.data.message) {
        setSuccess("");
        setFailure(error.response.data.message);
      }
    }
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('zipfile', zipfile);

      const data = await uploadVersion({ slug, token, formData });
      setSuccess(data.message);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      if (error.response.data.message) {
        setSuccess("");
        setFailure(error.response.data.message);
      }
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deleteGame({ slug, token });
      setSuccess('Deleted successfully');
    } catch (error) {
      console.error(error);

      if (error.response.data.message) {
        setSuccess("");
        setFailure(error.response.data.message);
      }
    }
  }

  return (
    <section className="container">
      {game && (
        <>
          <h1>Manage - {title}</h1>
          <form className="mt-5">
            <div class="mb-3">
              <label for="title" class="form-label">
                Title
              </label>
              <input
                onChange={(e) => setInputTilte(e.target.value)}
                defaultValue={game.title}
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                Description
              </label>
              <textarea
                onChange={(e) => setInputDescription(e.target.value)}
                defaultValue={game.description}
                class="form-control"
                id="description"
              ></textarea>
            </div>
            <button
              onClick={handleUpdate}
              type="submit"
              class="btn btn-primary"
            >
              Update
            </button>
          </form>
          <div class="mt-5">
            <label for="zipfile" class="form-label">
              Upload new Version
            </label>
            <input accept=".zip" onChange={(e) => setZipFile(e.target.files[0])} class="form-control" type="file" id="zipfile" />
            <button onClick={handleUpload} className="btn btn-primary mt-3">Upload</button>
          </div>
          <button onClick={handleDelete} className="btn btn-danger mt-5">Delete game</button>
        </>
      )}
    </section>
  );
};

export default ManageGame;
