"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { axiosGetProjects } = useAxios();

  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const fetchedProjects = await axiosGetProjects();
      setProjects(fetchedProjects);

      // setProjects([
      //   { _id: 1, content: "Item 1", name: "dasdasa" },
      //   { _id: 2, content: "Item 2", name: "sf;lksakfdshjkal" },
      //   { _id: 3, content: "Item 3", name: "fjkdsahlfkjh" },
      //   { _id: 4, content: "Item 4", name: "kjfhdsakljah" },
      //   { _id: 5, content: "Item 5", name: "kjfhdslakjfhlajksdh" },
      //   { _id: 6, content: "Item 6", name: "kjdshgfiljahdjk" },
      //   { _id: 7, content: "Item 7", name: "qwertyuiop" },
      //   { _id: 8, content: "Item 8", name: "asdfghjkl" },
      //   { _id: 9, content: "Item 9", name: "zxcvbnm" },
      //   { _id: 10, content: "Item 10", name: "yuiopasdfgh" },
      //   { _id: 11, content: "Item 11", name: "helloWorld" },
      //   { _id: 12, content: "Item 12", name: "nextjsRocks" },
      //   { _id: 13, content: "Item 13", name: "reactIsFun" },
      //   { _id: 14, content: "Item 14", name: "javascriptRules" },
      //   { _id: 15, content: "Item 15", name: "codingLife" },
      //   { _id: 16, content: "Item 16", name: "tailwindCSS" },
      //   { _id: 17, content: "Item 17", name: "webDevelopment" },
      //   { _id: 18, content: "Item 18", name: "frontendGuru" },
      //   { _id: 19, content: "Item 19", name: "backendDev" },
      //   { _id: 20, content: "Item 20", name: "fullStackDev" },
      // ]);
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
