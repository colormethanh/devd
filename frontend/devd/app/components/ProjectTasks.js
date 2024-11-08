import TasksPanel from "./TasksPanel";
import TaskPanelItem from "./TaskStatusPanelItem";
import TaskDetailPanel from "./TaskDetailPanel";
import useTasks from "../hooks/useTasks";
import Image from "next/image";
import { useState } from "react";
import AddTaskPanel from "./AddTaskPanel";

export default function ProjectTasks({ project, isLoading }) {
  const [isAddTaskView, setIsAddTaskView] = useState(false);

  const {
    task,
    setTask,
    updateTaskStatus,
    updateTaskDescription,
    postNewTask,
  } = useTasks(project);

  let currentTaskId = task._id || null;

  const handleGoToAddTask = () => {
    console.log("Switching to add task view");
    setIsAddTaskView((prev) => !prev);
  };

  // debugger;
  return (
    <div className="h-4/5 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="flex flex-col w-1/6 h-full">
          <div className="flex w-full justify-end p-1 h-8 border-b border-gray-500">
            <div
              onClick={handleGoToAddTask}
              className="flex justify-center w-1/6 text-xl hover:cursor-pointer"
            >
              {"+"}
            </div>
          </div>
          <TasksPanel
            project={project}
            currentTaskId={currentTaskId}
            setTask={setTask}
            setIsAddTaskView={setIsAddTaskView}
          />
        </div>
        <div className="w-5/6 h-full">
          {isAddTaskView ? (
            <AddTaskPanel
              setIsAddTaskView={setIsAddTaskView}
              project={project}
              postNewTask={postNewTask}
            />
          ) : (
            <TaskDetailPanel
              task={task}
              updateTaskStatus={updateTaskStatus}
              updateTaskDescription={updateTaskDescription}
            />
          )}
        </div>
      </div>
    </div>
  );
}
