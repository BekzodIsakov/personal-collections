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

export const useItemsFetchByTag = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [items, setItems] = React.useState([]);

  async function fetchItemsByTag(tagId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/items?findBy=tags_${tagId}`
      );
      setItems(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    items,
    setItems,
    fetchItemsByTag,
  };
};
