import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useTasks(project) {
  const { getTaskDetails, updateTask, postTask, dispatchResetTask } =
    useAxios();
  const task = useSelector((state) => state.task.task);
  const accessToken = useSelector((state) => state.auth.token);

  const setTask = async (task) => {
    try {
      // debugger;

      if (task === undefined) return dispatchResetTask();

      const retrievedTask = await getTaskDetails({
        project_id: project._id,
        task_id: task._id,
        access_token: accessToken,
      });
      return retrievedTask;
    } catch (err) {
      // debugger;
      console.log(err);
    }
  };

  const updateTaskStatus = async (task, status) => {
    try {
      const updatedTask = await updateTask({
        project_id: project._id,
        task_id: task._id,
        updates: { status: status },
        access_token: accessToken,
      });
      return updatedTask;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskDescription = async (task, description) => {
    try {
      const updatedTask = await updateTask({
        project_id: project._id,
        task_id: task._id,
        updates: { description: description },
        access_token: accessToken,
      });
      return updatedTask;
    } catch (err) {
      console.log(err);
    }
  };

  const postNewTask = async (project_id, formData) => {
    try {
      const newTask = await postTask(project_id, formData, accessToken);
      return newTask;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // debugger;
    if (project !== undefined && project.tasks.length !== 0)
      setTask(project.tasks[0]);
  }, [project]);

  return {
    task,
    setTask,
    updateTaskStatus,
    updateTaskDescription,
    postNewTask,
  };
}
