import React from "react";
import TasksPanel from "./TasksStatusPanel";
import TaskPanelItem from "./TaskStatusPanelItem";
import TaskDetailPanel from "./TaskDetailPanel";

export default function ProjectTasks() {
  return (
    <div className="h-4/5 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="w-1/4 h-full">
          <TasksPanel>
            <TaskPanelItem />
            <TaskPanelItem isSelected={true} />
            <TaskPanelItem />
            <TaskPanelItem />
            <TaskPanelItem />
            <TaskPanelItem />
          </TasksPanel>
        </div>
        <div className="w-3/4 h-full">
          <TaskDetailPanel />
        </div>
      </div>
    </div>
  );
}
