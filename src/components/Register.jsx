// Register component

const COHORT_NAME = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

import { useState } from "react";

export default function Register(setToken) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (username === "" || email === "" || password === "") {
  //     setError(true);
  //   } else {
  //     setSubmitted(true);
  //     setError(false);
  //   }
  // };

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

  // Showing success message
  const successPopUp = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
        {successMessage && { successMessage }}
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successPopUp()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={username}
          type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

//   async function handleSubmit(event) {
//     event.preventDefault();
//     try {
//       if (username !== "") {
//         const response = await fetch(`${API_URL}/users/register`, {
//           method: "POST",
//           body: JSON.stringify({ user: { username, password } }),
//           headers: { "content-type": "application/json" },
//         });
//         const result = await response.json();
//         console.log(result);
//         setToken(result.data.token);
//         setSuccessMessage("You have signed up! Please log into your account!");
//         // console.log(token);
//       } else {
//         setError(error.message);
//         setUsername("");
//         setPassword("");
//         setToken("");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   }

//   return (
//     <div>
//       <h2>Register</h2>
//       {successMessage && <p>{successMessage}</p>}
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:{" "}
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <br />
//         </label>
//         <label>
//           Password:{" "}
//           <input
//             type="password"
//             minLength="8"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
