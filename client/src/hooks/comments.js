import axios from "axios";
import React from "react";

// export const useSendComment = () => {
//   const [loading, setLoading] = React.useState(false);
//   const [errorMessage, setErrorMessage] = React.useState("");
//   const [result, setResult] = React.useState(null);

//   async function sendComment(itemId, comment) {
//     try {
//       setLoading(true);
//       if (comment) setResult(null);
//       const result = await axios.post(
//         `${import.meta.env.VITE_URL}/comments/compose/${itemId}`,
//         { content: comment },
//         { header: { "Content-Type": "application/json" } }
//       );
//       setResult(result.data);
//     } catch (error) {
//       setErrorMessage(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return {
//     loading,
//     errorMessage,
//     result,
//     sendComment,
//   };
// };

export const useFetchComments = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [comments, setComments] = React.useState([]);
  // const [page, setPage] = React.useState(1);

  async function fetchComments(itemId) {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_URL}/comments/${itemId}`
      );
      setComments(result.data.comments);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // async function fetchPreviousComments(itemId, limit) {
  //   try {
  //     setLoading(true);
  //     const result = await axios.get(
  //       `${
  //         import.meta.env.VITE_URL
  //       }/comments/${itemId}?page=${page}&limit=${limit}`
  //     );
  //     setComments([...result.data, comments]);
  //     setPage(page + 1);
  //   } catch (error) {
  //     setErrorMessage(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return {
    loading,
    errorMessage,
    comments,
    setComments,
    fetchComments,
    // fetchPreviousComments,s
  };
};
