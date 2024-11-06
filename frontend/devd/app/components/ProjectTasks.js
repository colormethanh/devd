import React, { useEffect } from "react";
import TasksPanel from "./TasksStatusPanel";
import TaskPanelItem from "./TaskStatusPanelItem";
import TaskDetailPanel from "./TaskDetailPanel";
import useTasks from "../hooks/useTasks";

export default function ProjectTasks({ project, isLoading }) {
  const { task, setTask, updateTaskStatus } = useTasks(project);
  let currentTaskId = task._id || null;

  // debugger;
  return (
    <div className="h-4/5 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="w-1/4 h-full">
          <TasksPanel>
            {project.tasks !== undefined &&
              project.tasks.map((task) => (
                <TaskPanelItem
                  key={`${task._id}`}
                  task={task}
                  isSelected={task._id === currentTaskId}
                  clickCallback={() => setTask(task)}
                />
              ))}
          </TasksPanel>
        </div>
        <div className="w-3/4 h-full">
          <TaskDetailPanel task={task} updateTaskStatus={updateTaskStatus} />
        </div>
      </div>
    </div>
  );
}
