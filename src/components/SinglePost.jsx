import { deletePost, editPost } from "../API";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function SinglePost({ post, posts, setPosts, token }) {
  const authToken = useSelector(selectCurrentToken);
  console.log(authToken);
  // const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const result = await deletePost(authToken, post._id);
      console.log(result);
      const updatedPosts = posts.filter(
        (selectedPost) => selectedPost._id !== post._id
      );
      setPosts(updatedPosts);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }

  // const isAuthor = user && post.author._id === user._id;

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
