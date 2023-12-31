import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/authSlice";

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login() {
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
      console.log("result", result);
      if (result.success) {
        setSuccessMessage("You have logged in!");
        setError("");
        dispatch(
          setCredentials({
            token: result.data.token,
          })
        );
        console.log("result", result);
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
      <div className="login-form-container">
        {successMessage || error ? (
          <p className={successMessage ? "success" : "error"}>
            {successMessage || error}
          </p>
        ) : null}
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          {/* <label className="label">Username</label> */}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
          />
          {/* <label className="label">Password</label> */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          <button className="form-btn" type="submit">
            Log in
          </button>
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
