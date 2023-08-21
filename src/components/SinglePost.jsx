import { deletePost, editPost } from "../API";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function SinglePost({ post }) {
  const authToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const result = await deletePost(post._id);
      console.log(result);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit() {
    try {
      const result = await editPost(authToken, post._id);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const isAuthor = user && post.author._id === user._id;

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

        <button id="single-btn" onClick={handleDelete}>
          Delete Post
        </button>

        <button id="single-btn" onClick={handleEdit}>
          Edit Post
        </button>
      </div>
    </div>
  );
}
