import React from "react";
import { useSelector } from "react-redux";
import useAxios from "./useAxios";

export default function useUser() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.token);
  const { patchUser } = useAxios();

  const handlePatchUser = (user_id, updates) => {
    patchUser(user_id, updates, accessToken);
  };
  return { user, handlePatchUser };
}
