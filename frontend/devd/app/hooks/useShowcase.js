import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";

export default function useShowcase() {
  const access_token = useSelector((state) => state.auth.token);
  const { checkAndRefreshToken } = useAuth();

  useEffect(() => {
    const setupPage = async () => {
      if (access_token !== undefined) {
        await checkAndRefreshToken(access_token);
      }
    };

    setupPage();
  }, []);

  return {};
}
