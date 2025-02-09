import axios from "axios";
import React from "react";

export const useFetchComments = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [comments, setComments] = React.useState([]);

  async function fetchComments(itemId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/comments/${itemId}`
      );
      setComments(result.data.comments);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    comments,
    setComments,
    fetchComments,
  };
};
