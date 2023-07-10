import React from "react";
import axios from "axios";

export const useFetchTopics = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [topics, setTopics] = React.useState([]);

  async function fetchTopics() {
    try {
      setLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_DEV_URL}/topics`);
      setTopics(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, errorMessage, topics, fetchTopics };
};
