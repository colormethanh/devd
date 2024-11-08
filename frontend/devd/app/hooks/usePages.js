import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function usePages(project) {
  const { getPageDetails } = useAxios();

  const page = useSelector((state) => state.project.page);

  const setPage = async (page) => {
    try {
      const retrievedPage = await getPageDetails({
        project_id: project._id,
        page_id: page._id,
      });
      return retrievedPage;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (project._id) setPage(project.tasks[0]);
  }, [project]);

  return { page, setPage };
}
