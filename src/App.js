import React, { useEffect, useState } from "react";
import AllRoutes from "./routes";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const navigate = useNavigate();
  const [authenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token ? true : false); // Update isAuthenticated based on the presence of the token

    try {
      if (token) {
        const decoded = jwtDecode(token);
        console.log("decoded", decoded);
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded?.exp < currentTime) {
          // Redirect to sign-up page if token is expired
          navigate("/signin");
        }
      }
    } catch (error) {
      console.log("Error decoding token:", error);
      navigate("/signin"); // Redirect to sign-in page if token decoding fails
    }
  }, [navigate]);

  return (
    <AllRoutes
      authenticated={authenticated}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}
