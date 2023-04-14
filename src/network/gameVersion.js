import axios from "./";

export const uploadVersion = async ({ slug, formData, token }) => {
  const { data } = await axios.post(`/games/${slug}/upload`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data"
    },
  });

  return data;
};
