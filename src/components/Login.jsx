import Register from "./Register";
import { useState } from "react";

// Login component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login({ token, setToken }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      <div>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

// <Register />
