import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewPostForm from "./components/NewPostForm";
import SinglePost from "./components/SinglePost";
import Profile from "./components/Profile";
import PostCard from "./components/PostCard";
// import EditPost from "./components/EditPost";

function App() {
  const [token, setToken] = useState(null);
  const [post, setPost] = useState(null);

  // const handleLogout = () => {
  //   setToken(null);
  // };

  return (
    <>
      <div>
        <NavBar token={token} />
      </div>

      <div id="routeDiv">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />

          <Route path="/profile" element={<Profile token={token} />} />

          <Route
            path="/posts"
            element={<AllPosts token={token} setToken={setToken} />}
          />
          {/* <Route
            path="/posts/:id"
            element={<SinglePost token={token} post={post} setPost={setPost} />} */}
          {/* /> */}
          <Route
            path="/newpost"
            element={<NewPostForm token={token} setToken={setToken} />}
          />
          <Route path="/posts/:postId" element={<PostCard token={token} />} />

          {/* <Route
            path="/editpost"
            element={<EditPost token={token} post={post} />}
          /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
