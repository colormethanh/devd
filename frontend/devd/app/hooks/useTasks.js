import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useTasks(project) {
  // debugger;
  const { getTaskDetails } = useAxios();
  const task = useSelector((state) => state.project.task);

  const refreshTask = async (task) => {
    try {
      const retrievedTask = await getTaskDetails({
        project_id: project._id,
        task_id: task._id,
      });
      return retrievedTask;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // debugger;
    if (project._id) refreshTask(project.tasks[0]);
  }, [project]);

  return { task };
}
