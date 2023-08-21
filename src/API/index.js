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
    console.error(`Cannot get posts`, error);
  }
}

// Retrieve my posts

async function myData({ token }) {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

// Submit a new post

async function createPost({ token }, title, description, price, willDeliver) {
  // token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyODY4ZDJjMjc1MDAwMTQ4YzU0NDgiLCJ1c2VybmFtZSI6ImNvZGluZ2dhbDkzIiwiaWF0IjoxNjkyNTg4ODIxfQ.P5NdzRqU5Z0okZSXTANjR_51oBSpxjDkladdOf5qRHc";
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        willDeliver,
      }),
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`You cannot create me`, error);
  }
}

// DELETE

async function deletePost({ token }, id) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`You cannot delete me`, error);
  }
}

// Edit posts

async function editPost(
  id,
  title,
  description,
  price,
  location,
  willDeliver,
  { token }
) {
  try {
    const response = await fetch(`${API_URL}/#PATCH-/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

const postMessage = async ({ token }, id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: "Do you still have this?  Would you take $10 less?",
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//export functions
export { fetchAllPosts, createPost, myData, deletePost, editPost, postMessage };
