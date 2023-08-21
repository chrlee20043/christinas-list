// profile where user can see messages and edit or delete their posts (they are the author)
// click 'see full post' and the specific post will render at top of page (need to get post by id)
import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { postMessage } from "../API";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function Profile() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  // const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const welcome = authToken ? `Welcome ${user}` : "Welcome!";

  return (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Browse our collection!</p>
      <p>
        <Link to="/posts">See all posts</Link>
      </p>
      <p>
        <Link to="/newpost">Create New Post</Link>
      </p>
    </section>
  );
}
