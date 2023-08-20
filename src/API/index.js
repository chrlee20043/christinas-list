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

// Single Post

// async function fetchSinglePost(id) {
//   try {
//     const response = await fetch(`${API_URL}/players/${id}`);
//     const result = await response.json();
//     if (result.error) throw result.error;
//     return result.data.player;
//   } catch (err) {
//     console.error(`Oh no, looks like we ran into an issue`, err);
//   }
// }

// POST

async function createPost(title, description, price, willDeliver) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        willDeliver,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`You cannot create me`, error);
  }
}

// DELETE

async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}#DELETE-/posts/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
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

const postMessage = async ({ token }) => {
  try {
    const response = await fetch(
      `${API_URL}/posts/5e8929ddd439160017553e06/messages`,
      {
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
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//export functions
export { fetchAllPosts, createPost, myData, deletePost, editPost, postMessage };
