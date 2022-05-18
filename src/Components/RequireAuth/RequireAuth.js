import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  const [authUser, authLoading] = useAuthState(auth);
  const location = useLocation();

  if (authLoading) {
    return;
  }

  if (!authUser) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAuth;
