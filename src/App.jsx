import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import MessageForm from "./components/Message";

function App() {
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState("");

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
          {/* Use PrivateRoute for the components that require authentication */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile token={token} />
              </PrivateRoute>
            }
          />
          {/* Add more PrivateRoute components for other private routes */}
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <AllPosts token={token} setToken={setToken} />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:postId"
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
          <Route
            path="/message"
            element={
              <PrivateRoute>
                <MessageForm token={token} setToken={setToken} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
