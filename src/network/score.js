import axios from "./";

export const getScores = async ({ slug }) => {
  const { data } = await axios.get(`/games/${slug}/scores`);

  return data;
};

export const postScore = async ({ slug, score, token }) => {
  const { data } = await axios.post(`/games/${slug}/scores`, {
    score
  }, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
