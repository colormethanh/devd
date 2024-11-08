import React, { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useTasks(project) {
  // debugger;
  const { getTaskDetails, updateTask, postTask } = useAxios();
  const task = useSelector((state) => state.project.task);

  const setTask = async (task) => {
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

  const updateTaskStatus = async (task, status) => {
    try {
      const updatedTask = await updateTask({
        project_id: project._id,
        task_id: task._id,
        updates: { status: status },
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
      });
      return updatedTask;
    } catch (err) {
      console.log(err);
    }
  };

  const postNewTask = async (project_id, formData) => {
    try {
      const newTask = await postTask(project_id, formData);
      return newTask;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // debugger;
    if (project._id) setTask(project.tasks[0]);
  }, [project]);

  return {
    task,
    setTask,
    updateTaskStatus,
    updateTaskDescription,
    postNewTask,
  };
}
