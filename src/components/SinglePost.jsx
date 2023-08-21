import { deletePost, editPost, postMessage } from "../API";
import { useParams, useNavigate } from "react-router-dom";

export default function SinglePost({ posts }) {
  const navigate = useNavigate();

  const { postId } = useParams();
  console.log("post Id: ", postId);
  const matchedPost = posts.find((post) => {
    return post._id == postId;
  });

  async function handleDelete() {
    try {
      const result = await deletePost(postId);
      console.log(result);
      if (result.success) {
        navigate("/posts");
      } else {
        console.error("Sorry, you cannot delete me");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div>
        <h1>{matchedPost.title}</h1>
        <h1>{matchedPost.author.username}</h1>
        <h1>{matchedPost.description}</h1>
        <h1>{matchedPost.price}</h1>
        <h1>{matchedPost.willDeliver ? "Yes" : "No"}</h1>

        <button onClick={handleDelete}>Delete Post</button>
        <button onClick={editPost}>Edit Post</button>
        <button onClick={postMessage}>Send Message</button>
      </div>
    </>
  );
}

// import { deletePost } from "../API";
// import { useNavigate } from "react-router-dom";

// export default function SinglePost(post, id) {
//   const navigate = useNavigate();

//   async function handleDelete() {
//     try {
//       const result = await deletePost(id);
//       console.log(result);
//       if (result.success) {
//         navigate("/posts");
//       } else {
//         console.error("Sorry, you cannot delete me");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return (
//     <div id="container" key={post._id}>
//       <div id="post-card">
//         <h2>{post.title}</h2>
//         <h4>Seller: {post.author.username}</h4>
//         <p>Description: {post.description}</p>
//         <p>Price: {post.price}</p>
//         <button id="single-btn" onClick={handleDelete}>
//           Delete Post
//         </button>
//         <button id="single-btn">Edit Post</button>
//         <button id="single-btn" onClick={() => navigate("/message")}>
//           Send Message
//         </button>
//       </div>
//     </div>
//   );
// }
