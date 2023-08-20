// Register component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/authSlice";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (username !== "") {
        const response = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          body: JSON.stringify({
            user: {
              username: `${username}`,
              password: `${password}`,
            },
          }),
          headers: { "content-type": "application/json" },
        });
        const result = await response.json();
        console.log(result);

        if (result.success) {
          // Dispatch the setCredentials action with user and token
          dispatch(
            setCredentials({ user: username, token: result.data.token })
          );
          setError(null);
          setSuccessMessage(
            "You have signed up! Please log into your account!"
          );

          navigate("/login");
        } else {
          setError("Please provide a username.");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="register-form-container">
      {successMessage || error ? (
        <p className={successMessage ? "success" : "error"}>
          {successMessage || error}
        </p>
      ) : null}
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <h1>Register</h1>

        <label className="label">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          value={email}
          placeholder="youremail@gmail.com"
          required
        />

        <label className="label">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          type="text"
          placeholder="Username"
          required
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder="********"
          required
        />
        <button type="submit">Register</button>
      </form>

      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
}
