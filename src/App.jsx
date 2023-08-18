// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllPosts from "./components/AllPosts";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import LogOut from "./components/LogOut";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div id="routeDiv">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
