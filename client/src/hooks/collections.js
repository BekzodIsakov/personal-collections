import React from "react";
import axios from "axios";

export const useDeleteCollectionImage = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [updatedCollection, setUpdatedCollection] = React.useState(null);

  async function deleteCollectionImage(id) {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_URL}/collections/${id}/image`
      );
      setUpdatedCollection(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    updatedCollection,
    deleteCollectionImage,
  };
};

export const useFetchCollectionItems = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setCollection] = React.useState(null);

  async function fetchCollection(id, page, limit) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/collections/${id}/items/?page=${page}&limit=${limit}`
      );
      setCollection(result.data);
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
    setCollection,
    fetchCollection,
  };
};
