import { deletePost, editPost } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function SinglePost({ post }) {
  const authToken = useSelector(selectCurrentToken);
  // console.log(authToken);
  const user = useSelector(selectCurrentUser);
  const { id } = useParams();

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const result = await deletePost(authToken, id);
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
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

        <button id="single-btn" onClick={handleDelete}>
          Delete Post
        </button>

        <button id="single-btn" onClick={() => navigate(`posts/${id}/edit`)}>
          Edit Post
        </button>
      </div>
    </div>
  );
}
