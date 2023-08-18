const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// Basic CRUD operations

// GET

export default async function fetchAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const result = await response.json();
    console.log(result.data.posts);
    return result.data.posts;
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

async function createPost(name, title, description, price) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        title,
        description,
        price,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE

async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// CRUD operations with tokens (authorization) - to do last

// Login

// Register

// Logout

//export functions
export { fetchAllPosts, createPost, deletePost };
