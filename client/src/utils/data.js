import axios from "axios";

export async function fetchCollections() {
  return await axios.get(`${import.meta.env.VITE_URL}/collections`);
}

export async function fetchCollection(id) {
  const data = await axios.get(`${import.meta.env.VITE_URL}/collections/${id}`);
  return data;
}

export async function deleteCollection(id) {
  const data = await axios.delete(
    `${import.meta.env.VITE_URL}/collections/${id}`
  );

  return data;
}

export async function editCollection(id, formData) {

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

export async function createCollection(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_URL}/collections/new`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchTopCollections() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_URL}/collections/topFive`
    );

    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchLatestItems(limit = 10) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_URL}/items?sortBy=updatedAt_desc&limit=${limit}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
