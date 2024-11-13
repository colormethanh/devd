"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProjects() {
  const user = useSelector((state) => state.auth.user);
  // const projects = useSelector((state) => state.auth.user.projects);
  const [isLoading, setIsLoading] = useState(false);
  const { getProjects } = useAxios();

  // const refreshProjects = async () => {
  //   setIsLoading(true);
  //   try {
  //     const fetchedProjects = await getProjects();
  //     setProjects(fetchedProjects);
  //   } catch (error) {
  //     console.error("Failed to fetch projects", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return { isLoading };
}
