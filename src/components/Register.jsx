// Register component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(setToken) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (username !== "") {
        const response = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          body: JSON.stringify({ user: { username, password } }),
          headers: { "content-type": "application/json" },
        });
        const result = await response.json();
        console.log(result);
        setToken(result.data.token);
        setSuccessMessage("You have signed up! Please log into your account!");
        // console.log(token);
      } else {
        setError(error.message);
        setUsername("");
        setPassword("");
        setToken("");
        setSuccessMessage("");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="register-form-container">
      <div>
        <h1>Register</h1>
        {successMessage && { successMessage }}
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          value={email}
          placeholder="youremail@gmail.com"
        />

        <label className="label">Userame</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          type="text"
          placeholder="Username"
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder="********"
        />
        <button type="submit">Register</button>
      </form>

      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
}
