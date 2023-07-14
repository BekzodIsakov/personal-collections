import axios from "axios";
import React from "react";
import { useAuth } from "../providers/authProvider";

export const useCollectionFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setCollection] = React.useState(null);

  async function fetchCollection(id) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/collections/${id}`
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

export const useFetchMyCollections = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collections, setItemCollections] = React.useState(null);

  const { user } = useAuth();

  async function fetchMyCollections() {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/collections?getBy=author_${user.id}`
      );
      setItemCollections(result.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    collections,
    fetchMyCollections,
  };
};

export const useCollectionEdit = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [updatedCollection, setUpdatedCollection] = React.useState(null);

  async function updateCollection(id, formData) {
    try {
      setLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_DEV_URL}/collections/${id}`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
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
    updateCollection,
  };
};

export const useDeleteCollectionImage = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [updatedCollection, setUpdatedCollection] = React.useState(null);

  async function deleteCollectionImage(id) {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_DEV_URL}/collections/${id}/image`
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
          import.meta.env.VITE_DEV_URL
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

export const useCreateCollection = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setCollection] = React.useState(null);

  async function createCollection(formData) {
    console.log({ formData });
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_DEV_URL}/collections/new`,
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
        }
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
    createCollection,
  };
};
