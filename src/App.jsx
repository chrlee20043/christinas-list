import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import LogOut from "./components/LogOut";
import NewPostForm from "./components/NewPostForm";

function App() {
  const [token, setToken] = useState(null);

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
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/newpost" element={<NewPostForm />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
