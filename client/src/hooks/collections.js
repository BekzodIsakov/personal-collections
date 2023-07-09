import axios from "axios";
import React from "react";

export const useCollectionFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setItemCollection] = React.useState(null);

  async function fetchCollection(id) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/collections/${id}`
      );
      setItemCollection(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    collection,
    fetchCollection,
  };
};
