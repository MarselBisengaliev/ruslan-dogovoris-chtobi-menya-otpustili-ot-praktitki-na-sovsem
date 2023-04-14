import axios from "./";

export const signin = async ({ formData }) => {
  const { data } = await axios.post("/auth/signin", formData);
  
  return data;
};

export const signout = async ({ token }) => {
  const { data } = await axios.post(
    "/auth/signout",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return data;
};

export const signup = async ({ formData }) => {
  const { data } = await axios.post("/auth/signup", formData);

  return data;
};
