import axios from "axios";
import React from "react";

export const useItemFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [item, setItem] = React.useState(null);

  async function onItemFetch(itemId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/items/${itemId}`
      );
      setItem(result.data);
    } catch (error) {
      setErrorMessage("Unauthorized");
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(update) {
    const itemUpdate = {
      ...item,
      ...update,
    };
    setItem(itemUpdate);
  }

  return {
    loading,
    errorMessage,
    item,
    onItemFetch,
    updateItem,
  };
};
