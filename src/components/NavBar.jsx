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
      <h1 id="navbar-title">Christina's List</h1>
      <ul id="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/posts">Explore Posts</Link>
        </li>
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
        {token ? (
          <button className="auth-btn" type="link-button" onClick={onLogout}>
            Log Out
          </button>
        ) : (
          <li type="link-button">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
