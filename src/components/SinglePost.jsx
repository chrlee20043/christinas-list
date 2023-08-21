import { deletePost, editPost } from "../API";
import { useNavigate } from "react-router-dom";

export default function SinglePost({ post, id, currentUser }) {
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const result = await deletePost(id);
      console.log(result);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }

  const isAuthor = currentUser && post.author._id === currentUser._id;

  return (
    <div id="container" key={post.id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        {isAuthor && (
          <button id="single-btn" onClick={handleDelete}>
            Delete Post
          </button>
        )}
        {isAuthor && (
          <button id="single-btn" onClick={editPost}>
            Edit Post
          </button>
        )}
      </div>
    </div>
  );
}
