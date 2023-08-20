import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewPostForm from "./components/NewPostForm";
import SinglePost from "./components/SinglePost";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState("");

  return (
    <>
      <div>
        <NavBar />
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
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/posts"
            element={<AllPosts token={token} setToken={setToken} />}
          />
          <Route
            path="/posts/:POST_ID"
            element={
              <SinglePost
                token={token}
                setToken={setToken}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
          <Route
            path="/newpost"
            element={<NewPostForm token={token} setToken={setToken} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
