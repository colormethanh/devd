import React, { useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

const validViews = ["tasks", "components", "pages", "team"];

export default function useViews(project) {
  const [isViewing, setIsViewing] = useState("tasks");
  const { getComponentDetails } = useAxios();
  const token = useSelector((state) => state.auth.token);

  const changeViewTo = async (view, contentId = "") => {
    if (validViews.includes(view)) {
      switch (view) {
        case "components":
          if (contentId !== "")
            getComponentDetails({
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
