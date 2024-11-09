import { jwtDecode } from "jwt-decode";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useAuth() {
  const { refreshToken } = useAxios();
  const accessToken = useSelector((state) => state.auth.token);
  const needsLogin = useSelector((state) => state.auth.needsLogin);

  const checkIfTokenIsExpired = (token) => {
    try {
      if (token === "") return true;
      const decoded = jwtDecode(token);

      const exp = decoded.exp;

      if (exp * 1000 < Date.now()) {
        console.log("Token is expired");
        return true;
      } else {
        console.log("Token is valid");
        return false;
      }
    } catch (err) {
      console.log("Invalid Token:", err);
      return true;
    }
  };

  const checkAndRefreshToken = (token) => {
    if (checkIfTokenIsExpired(token)) {
      console.log("token expired, refreshing token now");
      refreshToken();
    } else {
      console.log("nothing wrong with token");
    }
  };

  return { checkAndRefreshToken, accessToken, needsLogin };
}
