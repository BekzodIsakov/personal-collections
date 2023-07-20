import axios from "axios";
import React from "react";

export const useSendComment = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [comment, setComment] = React.useState(null);

  async function sendComment(itemId, comment) {
    try {
      setLoading(true);
      if (comment) setComment(false);
      const result = await axios.post(
        `${import.meta.env.VITE_URL}/items/${itemId}/comments/new`,
        comment,
        { header: { "Content-Type": "application/json" } }
      );
      setComment(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    comment,
    setComment,
    sendComment,
  };
};

export const useFetchComments = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [comments, setComments] = React.useState([]);

  async function fetchComments(itemId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/items/${itemId}/comments`
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
