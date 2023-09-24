import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./Redux/authSlice";
import "./index.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewPostForm from "./components/NewPostForm";
import Profile from "./components/Profile";

// const handleLogout = () => {
//   setToken(null);
// };

function App() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      dispatch(setCredentials({ token: authToken }));
    }
  }, [authToken, dispatch]);

  return (
    <>
      <div>
        <NavBar token={authToken} />
      </div>

      <div id="routeDiv">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login token={authToken} />} />
          <Route path="/register" element={<Register token={authToken} />} />

          <Route path="/profile" element={<Profile token={authToken} />} />

          <Route path="/posts" element={<AllPosts token={authToken} />} />

          <Route path="/newpost" element={<NewPostForm token={authToken} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
