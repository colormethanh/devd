"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getProjects } = useAxios();

  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return { projects, refreshProjects, isLoading };
}
