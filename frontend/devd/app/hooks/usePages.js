import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function usePages(project, accessToken) {
  const { getPageDetails, updatePage } = useAxios();

  const page = useSelector((state) => state.page.page);

  const setPage = async (page) => {
    try {
      const retrievedPage = await getPageDetails({
        project_id: project._id,
        page_id: page._id,
        access_token: accessToken,
      });
      return retrievedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePageVisibility = async (task, visibility) => {
    try {
      const updatedPage = await updatePage({
        page_id: task._id,
        project_id: project._id,
        access_token: accessToken,
        updates: { visibility: visibility },
      });
      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePageDescription = async (page, description) => {
    try {
      // debugger;
      const updatedPage = await updatePage({
        project_id: project._id,
        page_id: page._id,
        access_token: accessToken,
        updates: { description: description },
      });
      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (project._id) setPage(project.pages[0]);
  }, [project]);

  return { page, setPage, updatePageVisibility, updatePageDescription };
}
