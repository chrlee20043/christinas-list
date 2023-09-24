// Nav bar with links to various routes
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../Redux/authSlice";
import { logOut } from "../Redux/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectCurrentToken);

  const onLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div id="navbar">
      <h1 id="navbar-title">Christina's Closet</h1>
      <div id="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/posts">Posts</Link>
        {/* <Link to="/logout">Log Out</Link> */}
        {token && (
          <button type="button" onClick={onLogout}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
