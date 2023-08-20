import { deletePost } from "../API";
import { useNavigate } from "react-router-dom";

export default function SinglePost({ post, token }) {
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const result = await deletePost({ post, token });
      console.log(result);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <button id="single-btn" onClick={handleDelete}>
          Delete Post
        </button>
        <button id="single-btn">Edit</button>
        <button id="single-btn">Message</button>
      </div>
    </div>
  );
}

// import { deletePost } from "../API";
// import { useParams, useNavigate } from "react-router-dom";

// export default function SinglePost({ posts }) {
//   const navigate = useNavigate();

//   const { POST_ID } = useParams();
//   console.log("post Id: ", POST_ID);
//   const matchedPost = posts.find((post) => {
//     return post.id == POST_ID;
//   });

//   async function handleDelete() {
//     try {
//       const result = await deletePost(id);
//       console.log(result);
//       navigate("/posts");
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return (
//     <>
//       <div>
//         <h1>{matchedPost.title}</h1>
//         <h1>{matchedPost.author.username}</h1>
//         <h1>{matchedPost.description}</h1>
//         <h1>{matchedPost.price}</h1>
//         <h1>{matchedPost.willDeliver}</h1>

//         <button onClick={handleDelete}>Delete Puppy</button>
//       </div>
//     </>
//   );
// }
