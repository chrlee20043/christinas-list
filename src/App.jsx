import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentToken } from "./Redux/authSlice";
import "./index.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewPostForm from "./components/NewPostForm";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  // const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token: token }));
    }
  }, [token, dispatch]);

  return (
    <>
      <div>
        <NavBar token={token} />
      </div>

      <div id="routeDiv">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login token={token} />} />
          <Route path="/register" element={<Register token={token} />} />

          <Route path="/profile" element={<Profile token={token} />} />

          <Route path="/posts" element={<AllPosts token={token} />} />

          <Route path="/newpost" element={<NewPostForm token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
