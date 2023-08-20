import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const PrivateRoute = ({ path, element }) => {
  const currentUser = useSelector((state) => state.authenticate.user);
  const navigate = useNavigate();

  if (!currentUser) {
    // Redirect to the login page if the user is not authenticated
    navigate("/login");
  }

  // Render the private route if the user is authenticated
  <Route path={path} element={element} />;
};

export default PrivateRoute;
