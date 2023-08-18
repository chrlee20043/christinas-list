import React from "react";
import NewPostForm from "./NewPostForm";

// User will see all posts
// include search bar, navigate to form
export default function AllPosts() {
  return (
    <>
      <h1>Show All Posts</h1>

      <div>
        <NewPostForm />
      </div>
    </>
  );
}
