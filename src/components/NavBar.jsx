// Nav bar with links to various routes
import { Link } from "react-router-dom";

export default function NavBar({ token }) {
  return (
    <div id="navbar">
      <h1 id="navbar-title">Christina's Closet</h1>
      <div id="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/posts">Posts</Link>
        {/* <Link to="/logout">Log Out</Link> */}
        {/* {token && (
        <button type="button" onClick={onLogout}>
          Log Out
        </button> */}
        {/* )} */}
      </div>
    </div>
  );
}
