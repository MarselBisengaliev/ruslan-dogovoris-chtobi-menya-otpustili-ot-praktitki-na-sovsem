import axios from "./";

export const getUser = async ({ username }) => {
  const { data } = await axios.get(`/users/${username}`);

  return data;
};