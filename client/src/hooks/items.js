import axios from "axios";
import React from "react";

export const useItemFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [item, setItem] = React.useState(null);

  async function fetchItem(itemId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/items/${itemId}`
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
    setItem,
    fetchItem,
    updateItem,
  };
};

export const useItemDelete = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [itemDeleted, setItemDeleted] = React.useState(false);

  async function deleteItem(id) {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_URL}/items/${id}`
      );
      if (result.status >= 200 || result.status < 300) setItemDeleted(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    itemDeleted,
    setItemDeleted,
    deleteItem,
  };
};

export const useCreateItem = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [createdItem, setCreatedItem] = React.useState(null);

  async function createItem(item) {
    try {
      setLoading(true);

      const result = await axios.post(
        `${import.meta.env.VITE_URL}/items/new`,
        item,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCreatedItem(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    createdItem,
    setCreatedItem,
    createItem,
  };
};

export const useFetchItem = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [item, setItem] = React.useState(null);

  async function fetchItem(id) {
    try {
      setLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_URL}/items/${id}`);
      setItem(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    item,
    setItem,
    fetchItem,
  };
};

export const useEditItem = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [item, setItem] = React.useState(null);

  async function editItem(id, update) {
    try {
      setLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_URL}/items/${id}`,
        update,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setItem(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    item,
    editItem,
  };
};

export const useSearchItems = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);

  async function searchItems(text) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/items/search?text=${text}`
      );
      setSearchResult(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    searchResult,
    setSearchResult,
    searchItems,
  };
};
