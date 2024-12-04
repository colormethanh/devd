import React from "react";
import { useSelector } from "react-redux";

export default function useUser(username) {
  const user = useSelector((state) => state.auth.user);
  return { user };
}
