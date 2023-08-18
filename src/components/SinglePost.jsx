import { deletePost } from "../API";
import { useNavigate } from "react-router-dom";

export default function SinglePost({ post, id }) {
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
  return (
    <div id="container" key={post.id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
      </div>
      <button onClick={handleDelete}>Delete Player</button>
    </div>
  );
}
