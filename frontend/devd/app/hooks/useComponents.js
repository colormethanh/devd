import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useComponents(project, accessToken) {
  const {
    getComponentDetails,
    postComponent,
    updateComponent,
    updateComponentImage,
    deleteComponentInDB,
  } = useAxios();

  const component = useSelector((state) => state.component.component);

  const postNewComponent = async (project_id, formData) => {
    try {
      const newComponent = await postComponent(
        project_id,
        formData,
        accessToken
      );
      return newComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const setComponent = async (component) => {
    try {
      const retrievedComponent = await getComponentDetails({
        project_id: project._id,
        component_id: component._id,
        access_token: accessToken,
      });
      return retrievedComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponentVisibility = async (component, visibility) => {
    try {
      const updatedComponent = await updateComponent({
        component_id: component._id,
        project_id: project._id,
        access_token: accessToken,
        updates: { visibility: visibility },
      });
      return updatedComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponentDescription = async (component, description) => {
    try {
      const updatedComponent = await updateComponent({
        project_id: project._id,
        component_id: component._id,
        updates: { description: description },
        access_token: accessToken,
      });
      return updatedComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponentStatus = async (component, status) => {
    try {
      const updatedComponent = await updateComponent({
        project_id: project._id,
        component_id: component._id,
        updates: { status: status },
        access_token: accessToken,
      });
      return updatedComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponentSnippet = async (component, snippet) => {
    try {
      const updatedComponent = await updateComponent({
        project_id: project._id,
        component_id: component._id,
        updates: { snippet: snippet },
        access_token: accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addComponentImage = async (component, image, title) => {
    try {
      const updatedComponent = await updateComponentImage({
        project_id: project._id,
        component_id: component._id,
        image: image,
        title: title,
        access_token: accessToken,
      });
      return updatedComponent;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComponent = async (component) =>
    deleteComponentInDB(component._id, project._id, accessToken);

  return {
    component,
    setComponent,
    postNewComponent,
    updateComponentVisibility,
    addComponentImage,
    updateComponentStatus,
    updateComponentDescription,
    deleteComponent,
    updateComponentSnippet,
  };
}
