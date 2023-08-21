import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../Redux/authSlice";
// import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

// Login component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        dispatch(
          setCredentials({
            user: username,
            token: result.data.token,
          })
        );
        setSuccessMessage("You have logged in!");
        setError("");
        navigate("/profile");
      } else {
        setSuccessMessage("");
        setError("Please try again or register for an account");
        console.log("need to register");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="auth-form-container">
        {successMessage || error ? (
          <p className={successMessage ? "success" : "error"}>
            {successMessage || error}
          </p>
        ) : null}
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <label className="label">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
          />
          <label className="label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          <button type="submit">Log in</button>
        </form>
        <button
          type="button"
          className="link-btn"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register here.
        </button>
      </div>
    </>
  );
}
