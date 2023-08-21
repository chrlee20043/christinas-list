import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.authenticate.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      return navigate("/login");
    }
  }, [currentUser, navigate]);

  // Render the private route if the user is authenticated

  return children;
};

export default PrivateRoute;
