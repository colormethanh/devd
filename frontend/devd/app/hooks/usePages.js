import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function usePages(project, accessToken) {
  const {
    getPageDetails,
    updatePage,
    updatePageImages,
    postPage,
    deletePageInDB,
    patchPageFeature,
    deletePageFeature,
    deletePageImage,
  } = useAxios();

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
      await setPage(page);
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
        updates: { features: [{ text: feature }] },
      });
      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const patchFeature = async (page, feature) => {
    try {
      const patchedPage = await patchPageFeature({
        page_id: page._id,
        project_id: project._id,
        updates: feature,
        access_token: accessToken,
      });

      return patchedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFeature = async (page, feature) => {
    try {
      const updatedPage = await deletePageFeature({
        page_id: page._id,
        project_id: project._id,
        feature_id: feature._id,
        access_token: accessToken,
      });

      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async (page, image) => {
    try {
      const updatedPage = await deletePageImage({
        page_id: page._id,
        project_id: project._id,
        image: image,
        access_token: accessToken,
      });

      return updatedPage;
    } catch (err) {
      console.log(err);
    }
  };

  const deletePage = async (page) => {
    await deletePageInDB(page._id, project._id, accessToken);
  };

  return {
    page,
    setPage,
    updatePageVisibility,
    updatePageDescription,
    addPageImage,
    addPageFeature,
    postNewPage,
    deletePage,
    patchFeature,
    deleteFeature,
    deleteImage,
  };
}
