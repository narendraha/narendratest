import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import 'slick-carousel/slick/slick.css';
import AllRoutes from "./routes";
import './sass/index.scss';
import { setNonAuthSessionIdReuqest } from "./store/SessionStore/slice";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state?.sessionStoreSlice);

  useEffect(() => {
    return () => {
      dispatch(setNonAuthSessionIdReuqest(""))
    }
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   let isAuth = token ? true : false
  //   dispatch(setAuthenticationRequest(isAuth))

  //   try {
  //     if (token) {
  //       const decoded = jwtDecode(token);
  //       // Check if token is expired
  //       const currentTime = Date.now() / 1000;
  //       if (decoded?.exp < currentTime) {
  //         // Redirect to sign-up page if token is expired
  //         localStorage.clear();
  //         sessionStorage.clear();
  //         navigate("signin");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error decoding token:", error);
  //     navigate("signin"); // Redirect to sign-in page if token decoding fails
  //   }
  // }, [navigate]);

  return (
    <AllRoutes
      authenticated={isAuthenticated}
    />
  );
}
