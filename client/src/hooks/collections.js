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
    // console.log({ form: form.current });
    // const formData = new FormData(form.current);
    // console.log({ formDataValues: formData.entries().length });
    // console.log({ fields });
    // console.log({ formTitle: formData.get("selectedTopic") });
    try {
      setLoading(true);

      // for (let field of fields) {
      //   formData.append(field.name, field.value);
      // }
      // formData.append("title", )

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
