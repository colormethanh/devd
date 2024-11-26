import React, { useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

const validViews = ["project", "tasks", "components", "pages", "team"];

export default function useViews(project) {
  const [isViewing, setIsViewing] = useState("project");
  const { getComponentDetails, getPageDetails, getTaskDetails } = useAxios();
  const token = useSelector((state) => state.auth.token);

  const changeViewTo = async (view, contentId = "") => {
    if (validViews.includes(view)) {
      switch (view) {
        case "tasks":
          if (contentId !== "")
            await getTaskDetails({
              project_id: project._id,
              task_id: contentId,
              access_token: token,
            });
          break;
        case "pages":
          if (contentId !== "")
            await getPageDetails({
              project_id: project._id,
              page_id: contentId,
              access_token: token,
            });
          break;
        case "components":
          if (contentId !== "")
            await getComponentDetails({
              project_id: project._id,
              component_id: contentId,
              access_token: token,
            });
          break;
        default:
          break;
      }

      return setIsViewing(view);
    }
  };
  return { isViewing, setIsViewing, changeViewTo };
}
