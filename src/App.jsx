// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllPosts from "./components/AllPosts";
import NewPostForm from "./components/NewPostForm";
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
          <Route path="/" element={<AllPosts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpostform" element={<NewPostForm />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
