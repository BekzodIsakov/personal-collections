import axios from "axios";

export async function fetchCollection(id) {
  const data = await axios.get(`${import.meta.env.VITE_URL}/collections/${id}`);
  return data;
}

export async function deleteCollection(id) {
  const data = await axios.delete(
    `${import.meta.env.VITE_URL}/collections/${id}`
  );

  return data;

  // try {
  //   setLoading(true);
  //   if ( 200 <= result.status || result.status < 300) setIsDeleted(true);
  // } catch (error) {
  //   setErrorMessage(error.response.data.message);
  // } finally {
  //   setLoading(false);
  // }
}

export async function updateCollection(id, formData) {
  // async function updateCollection(id, formData) {
  //   try {
  //     setLoading(true);
  //     const result = await axios.patch(
  //       `${import.meta.env.VITE_URL}/collections/${id}`,
  //       formData,
  //       { headers: { "content-type": "multipart/form-data" } }
  //     );
  //     setUpdatedCollection(result.data);
  //   } catch (error) {
  //     setErrorMessage(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const data = await axios.patch(
    `${import.meta.env.VITE_URL}/collections/${id}`,
    formData,
    { headers: { "content-type": "multipart/form-data" } }
  );

  return data;
}

export async function fetchUserCollections(userId) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_URL}/collections?getBy=author_${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
