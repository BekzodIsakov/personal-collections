import axios from "axios";
import React from "react";

export const useUserSignIn = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  async function onSignIn(userCredentails) {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_URL}/users/signin`,
        userCredentails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, errorMessage, onSignIn };
};

export const useUserSignUp = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  async function onSignUp(userCredentails) {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_URL}/users/signup`,
        userCredentails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, errorMessage, onSignUp };
};

export const useUserSignOut = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  async function onSignOut() {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_DEV_URL}/users/signout`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, errorMessage, onSignOut };
};

export const useGetMe = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [me, setMe] = React.useState(null);

  async function getMe() {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/users/me`
      );
      setMe(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, errorMessage, me, getMe };
};
