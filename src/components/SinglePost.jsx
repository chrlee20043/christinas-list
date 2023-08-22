import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function SinglePost({ post }) {
  const authToken = useSelector(selectCurrentToken);
  // console.log(authToken);
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}
