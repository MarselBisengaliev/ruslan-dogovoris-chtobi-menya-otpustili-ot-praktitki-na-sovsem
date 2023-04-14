import axios from "./";

export const getGames = async ({ sortBy, sortDir, size }) => {
  const { data } = await axios.get("/games", {
    params: {
      sortBy,
      sortDir,
      size,
    },
  });

  return data;
};

export const getGame = async ({ slug }) => {
  const { data } = await axios.get(`/games/${slug}`);

  return data;
};

export const updateGame = async ({ slug, formData, token }) => {
  const { data } = await axios.put(`/games/${slug}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const deleteGame = async ({ slug, token }) => {
  const { data } = await axios.delete(`/games/${slug}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
