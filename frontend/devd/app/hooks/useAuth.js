import { jwtDecode } from "jwt-decode";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function useAuth() {
  const { refreshToken } = useAxios();
  const accessToken = useSelector((state) => state.auth.token);
  const needsLogin = useSelector((state) => state.auth.needs_login);

  const checkIfTokenIsExpired = (token) => {
    try {
      if (token === "") return true;
      const decoded = jwtDecode(token);
      const exp = decoded.exp;

      if (exp * 1000 < Date.now()) {
        console.log("Token is expired");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return true;
    }
  };

  const checkAndRefreshToken = (token) => {
    if (checkIfTokenIsExpired(token)) refreshToken();
  };

  useEffect(() => {
    checkAndRefreshToken(accessToken);
  }, []);

  return { checkAndRefreshToken, accessToken, needsLogin };
}
