// Nav bar with links to various routes
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div id="navbar">
      <h1 id="navbar-title">Stranger's Things</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      {/* <Link to="/register">Register</Link> */}
      <Link to="/profile">Profile</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/logout">Log Out</Link>
    </div>
  );
}
