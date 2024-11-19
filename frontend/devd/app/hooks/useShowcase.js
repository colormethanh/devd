import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

export default function useShowcase(project_id) {
  const access_token = useSelector((state) => state.auth.token);
  const project = useSelector((state) => state.project.project);
  const { getProjectForShowcase, getUser } = useAxios();
  const { checkAndRefreshToken } = useAuth();

  useEffect(() => {
    const setupPage = async () => {
      if (access_token !== undefined) {
        await checkAndRefreshToken(access_token);
      }
    };

    if (project_id !== undefined) getProjectForShowcase(project_id);
    setupPage();
  }, [project_id]);

  return { project };
}
