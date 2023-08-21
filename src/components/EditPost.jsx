import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import { editPost } from "../API";

export default function EditPost({ id }) {
  const authToken = useSelector(selectCurrentToken);
  // console.log(authToken);
  const user = useSelector(selectCurrentUser);

  async function handleEdit() {
    try {
      const result = await editPost(authToken, id);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const isAuthor = user && post.author._id === user._id;
  return (
    <button id="single-btn" onClick={handleEdit}>
      Edit Post
    </button>
  );
}
