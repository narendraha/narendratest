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

  return (
    <AllRoutes
      authenticated={isAuthenticated}
    />
  );
}
