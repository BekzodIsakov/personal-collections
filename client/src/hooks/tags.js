import React from "react";
import axios from "axios";

export const useFetchAllTags = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [tags, setTags] = React.useState([]);

  async function fetchTags() {
    try {
      setLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_URL}/tags`);
      setTags(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, errorMessage, tags, fetchTags };
};
