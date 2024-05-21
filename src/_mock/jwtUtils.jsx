import { jwtDecode } from "jwt-decode";

export const getDecodedTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token"); // get the token from local storage
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    return null;
  }
};
