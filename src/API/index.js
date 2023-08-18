const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// Basic CRUD operations

// GET

export default async function fetchAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const result = await response.json();
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

// Single Post

// async function fetchSinglePuppy(playerId) {
//   try {
//     const response = await fetch(`${API_URL}/players/${playerId}`);
//     const result = await response.json();
//     if (result.error) throw result.error;
//     return result.data.player;
//   } catch (err) {
//     console.error(`Oh no, trouble fetching player #${playerId}!`, err);
//   }
// }

// POST

// async function createPuppy(name, breed, image) {
//   try {
//     const response = await fetch(`${API_URL}/players`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         breed,
//         image,
//       }),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

// DELETE

// async function deletePuppy(id) {
//   try {
//     const response = await fetch(`${API_URL}/players/${id}`, {
//       method: "DELETE",
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export { fetchSinglePuppy, createPuppy, deletePuppy };

// CRUD operations with tokens (authorization) - to do last
