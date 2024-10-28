import axios from "axios";
export const AxiosInstance = (contentType, internalToken = null) => {
  const Axios = axios.create({
    baseURL:
      process.env.REACT_APP_NODE_ENV === "production" ?
        `${process.env.REACT_APP_HALF_PROD_APP_API_BASE_URL}/` :
        process.env.REACT_APP_NODE_ENV === "test" ?
          `${process.env.REACT_APP_HALF_TESTING_API_BASE_URL}` :
          `${process.env.REACT_APP_HALF_PREPROD_API_BASE_URL}/`,
  });
  // const Axios = axios.create({
  //   baseURL: `${apiservices.BaseURL}`,
  // });

  const token = internalToken ? internalToken : localStorage.getItem("token");
  Axios.defaults.headers.common["Authorization"] =
    typeof window !== "undefined" && token ? `Bearer ${token}` : null;
  Axios.defaults.headers.common["Content-Type"] = contentType;
  Axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return Axios;
};