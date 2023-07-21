import axios from "axios";
import React from "react";

export const useCollectionFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setCollection] = React.useState(null);

  async function fetchCollection(id) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/collections/${id}`
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

export const useFetchUserCollection = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collections, setItemCollections] = React.useState([]);

  async function fetchUserCollection(userId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/collections?getBy=author_${userId}`
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
    fetchUserCollection,
  };
};

export const useFetchUserCollections = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collections, setItemCollections] = React.useState([]);

  async function fetchUserCollections(userId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/collections?getBy=author_${userId}`
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
    fetchUserCollections,
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
        `${import.meta.env.VITE_URL}/collections/${id}`,
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

export const useCreateCollection = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collection, setCollection] = React.useState(null);

  async function createCollection(formData) {
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_URL}/collections/new`,
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

export const useDeleteCollection = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isDeleted, setIsDeleted] = React.useState(false);

  async function deleteCollection(id) {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_URL}/collections/${id}`
      );
      if (result.status >= 200 || result.status < 300) setIsDeleted(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorMessage,
    isDeleted,
    deleteCollection,
  };
};
