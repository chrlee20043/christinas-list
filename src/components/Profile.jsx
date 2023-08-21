// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
// import { myData, postMessage } from "../API";

// export default function Profile() {
//   const [userPosts, setUserPosts] = useState([]);
//   const [userMessages, setUserMessages] = useState([]);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser);
//   const authToken = useSelector(selectCurrentToken);

//   useEffect(() => {
//     async function fetchUserData() {
//       if (authToken) {
//         try {
//           const response = await myData(authToken);
//           setUserPosts(response.posts);
//           console.log(response);
//           setUserMessages(response.messages);
//         } catch (error) {
//           setError("nothing to see here");
//         }
//       }
//     }

//     fetchUserData();
//   }, [authToken]);

//   const handlePostMessage = async () => {
//     try {
//       const response = await postMessage(authToken); // Use the authToken here
//       console.log(response);
//     } catch (error) {
//       setError("no messages");
//     }
//   };

//   return (
//     <section className="welcome">
//       {authToken && <h1>Welcome {user}!</h1>}
//       <p>Browse our collection!</p>
//       <p>
//         <button onClick={() => navigate("/posts")}>See All Posts</button>
//       </p>
//       <br />
//       <p>
//         <button onClick={() => navigate("/newpost")}>Submit New Post</button>
//       </p>

//       <h2>My Posts:</h2>
//       {userPosts &&
//         userPosts.map((post) => (
//           <div key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.description}</p>
//             <button onClick={() => navigate(`/posts/${post._id}`)}>
//               See Full Post
//             </button>
//           </div>
//         ))}
//       <h2>My Messages:</h2>
//       {userMessages &&
//         userMessages.map((message) => (
//           <div key={message._id}>
//             <p>From: {message.fromUser.username}</p>
//             <p>Content: {message.content}</p>
//           </div>
//         ))}
//       {error && <p>{error}</p>}
//       <button onClick={handlePostMessage}>See Message</button>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import { myData, postMessage } from "../API";

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  useEffect(() => {
    async function fetchUserData() {
      if (!authToken) {
        setError("No authentication token available");
        return;
      }

      try {
        const response = await myData(authToken);
        console.log("Response from myData API:", response);

        if (response && response.posts) {
          setUserPosts(response.posts);
        }

        if (response && response.messages) {
          setUserMessages(response.messages);
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [authToken]);

  const handlePostMessage = async () => {
    try {
      const response = await postMessage(authToken); // Use the authToken here
      console.log("Response from postMessage API:", response);
    } catch (error) {
      setError("An error occurred while posting a message");
      console.error(error);
    }
  };

  return (
    <section className="welcome">
      {authToken && <h1>Welcome {user}!</h1>}
      <p>Browse our collection!</p>
      <p>
        <button onClick={() => navigate("/posts")}>See All Posts</button>
      </p>
      <br />
      <p>
        <button onClick={() => navigate("/newpost")}>Submit New Post</button>
      </p>

      <h2>My Posts:</h2>
      {userPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button onClick={() => navigate(`/posts/${post._id}`)}>
              See Full Post
            </button>
          </div>
        ))
      )}

      <h2>My Messages:</h2>
      {userMessages.length === 0 ? (
        <p>You have no messages</p>
      ) : (
        userMessages.map((message) => (
          <div key={message._id}>
            <p>From: {message.fromUser.username}</p>
            <p>Content: {message.content}</p>
          </div>
        ))
      )}

      {error && <p>{error}</p>}
      <button onClick={handlePostMessage}>See Message</button>
    </section>
  );
}
