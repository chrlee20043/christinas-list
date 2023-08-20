import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
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

  const currentUser = useSelector((state) => state.authenticate.user);

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
          {/* Use PrivateRoute for the components that require authentication */}
          <Route path="/profile" element={<Profile />} />
          {/* Add more PrivateRoute components for other private routes */}
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
            element={
              <PrivateRoute>
                <NewPostForm token={token} setToken={setToken} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

{
  /* <PrivateRoute>
<Dashboard />
</PrivateRoute> */
}
