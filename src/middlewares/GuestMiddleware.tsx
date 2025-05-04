import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Outlet } from "react-router-dom";

const GuestMiddleware = () => {
  const authInfo = useAuthStore((state) => state.authInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo && Object.keys(authInfo).length > 0) {
      navigate("/admin");
    }
  }, [authInfo, navigate]);


  return <Outlet />;
};

export default GuestMiddleware;
