import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login(token) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setSuccessMessage(result.message);
      // setUserData(result.data.username);
      // console.log(result.data.username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="auth-form-container">
        <h2>Login</h2>
        {successMessage && { successMessage }}
        {error && { error }}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
          <label className="label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit" onClick={() => navigate("/posts")}>
            Log in
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/register")}>
          Don't have an account? Register here.
        </button>
      </div>
    </>
  );
}
