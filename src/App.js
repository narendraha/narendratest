import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import AllRoutes from "./routes";
import './sass/index.scss';
import { setNonAuthSessionIdReuqest } from "./store/SessionStore/slice";

export default function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state?.sessionStoreSlice);

  useEffect(() => {
    return () => {
      dispatch(setNonAuthSessionIdReuqest(""));
    }
  }, [dispatch]);

  return (
    <AllRoutes authenticated={isAuthenticated} />
  );
}
