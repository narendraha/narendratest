import axios from "axios";
export const AxiosInstance = (contentType) => {
  const Axios = axios.create({
    baseURL:
      process.env.REACT_APP_NODE_ENV === "production" ||
      process.env.REACT_APP_NODE_ENV === "staging"
        ? `${process.env.REACT_APP_API_BASE_URL}/`
        : `${process.env.REACT_APP_API_BASE_URL}/`,
  });
  // const Axios = axios.create({
  //   baseURL: `${apiservices.BaseURL}`,
  // });
  const token = JSON.parse(localStorage.getItem("auth"));
  Axios.defaults.headers.common["token"] =
    typeof window !== "undefined" && token?.token ? token?.token : null;
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
