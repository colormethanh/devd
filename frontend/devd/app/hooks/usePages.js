import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function usePages(project, accessToken) {
  const { getPageDetails, updatePage, updatePageImages, postPage } = useAxios();

  const page = useSelector((state) => state.page.page);

  const postNewPage = async (project_id, formData) => {
    try {
      const newTask = await postPage(project_id, formData, accessToken);
      return newTask;
    } catch (err) {
      console.log(err);
    }
  };

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

  const addPageImage = async (page, image, title) => {
    try {
      const updatedPage = await updatePageImages({
        project_id: project._id,
        page_id: page._id,
        image: image,
        title: title,
        access_token: accessToken,
      });
      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const addPageFeature = async (page, feature) => {
    try {
      const updatedPage = await updatePage({
        project_id: project._id,
        page_id: page._id,
        access_token: accessToken,
        updates: { features: [feature] },
      });
      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (project !== undefined && project.pages.length !== 0)
  //     setPage(project.pages[0]);
  // }, [project]);

  return {
    page,
    setPage,
    updatePageVisibility,
    updatePageDescription,
    addPageImage,
    addPageFeature,
    postNewPage,
  };
}
