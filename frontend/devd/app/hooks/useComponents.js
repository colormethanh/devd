import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useComponents(project, accessToken) {
  const { getComponentDetails, postComponent, updateComponent } = useAxios();

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

  useEffect(() => {
    if (project !== undefined && project?.components?.length !== 0)
      setComponent(project.components[0]);
  }, [project]);

  return {
    component,
    setComponent,
    postNewComponent,
    updateComponentVisibility,
  };
}
