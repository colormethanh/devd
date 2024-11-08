import React from "react";
import TaskPanelItem from "./TaskStatusPanelItem";

export default function TasksPanel({
  project,
  currentTaskId,
  setTask,
  setIsAddTaskView,
}) {
  return (
    <div className="w-full flex-1">
      <div className="h-full">
        <div className=" h-full py-1">
          {project.tasks !== undefined &&
            project.tasks.map((task) => (
              <TaskPanelItem
                key={`${task._id}`}
                task={task}
                isSelected={task._id === currentTaskId}
                clickCallback={() => {
                  setTask(task);
                  setIsAddTaskView(false);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
