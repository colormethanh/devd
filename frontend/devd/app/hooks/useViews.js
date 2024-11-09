import React, { useState } from "react";

const validViews = ["tasks", "components", "pages", "team"];

export default function useViews() {
  const [isViewing, setIsViewing] = useState("tasks");

  const changeViewTo = async (view) => {
    if (validViews.includes(view)) {
      return setIsViewing(view);
    }
  };
  return { isViewing, setIsViewing, changeViewTo };
}
