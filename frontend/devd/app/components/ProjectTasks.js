import TaskDetailPanel from "./TaskDetailPanel";
import useTasks from "../hooks/useTasks";
import { useState, useEffect } from "react";
import AddTaskPanel from "./AddTaskPanel";
import ListPanel from "./utilities/ListPanel";

export default function ProjectTasks({ project, changeViewTo }) {
  const [isAddTaskView, setIsAddTaskView] = useState(true);
  const [viewTogglerDisabled, setViewTogglerDisabled] = useState(false);
  let {
    task,
    setTask,
    updateTaskStatus,
    updateTaskDescription,
    postNewTask,
    addTaskRelevantContent,
  } = useTasks(project);

  let currentTaskId = task._id || null;

  const handleGoToAddTask = () => {
    console.log("Switching to add task view");
    setIsAddTaskView((prev) => !prev);
  };

  useEffect(() => {
    if (project.tasks) {
      if (project.tasks.length === 0) {
        setIsAddTaskView(true);
        setViewTogglerDisabled(true);
      } else {
        setViewTogglerDisabled(false);
        setIsAddTaskView(false);
      }
    }
  }, [project]);

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="flex flex-col w-1/6 h-full">
          <div className="flex w-full justify-end p-1 h-8 border-b border-gray-500">
            <div
              onClick={handleGoToAddTask}
              className={`flex justify-center w-1/6 text-xl hover:cursor-pointer ${
                viewTogglerDisabled && "hidden"
              }`}
            >
              {"+"}
            </div>
          </div>
          <ListPanel
            project={project}
            currentItemId={currentTaskId}
            setItem={setTask}
            setIsAddItemView={setIsAddTaskView}
            itemName={"tasks"}
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
              project={project}
              addTaskRelevantContent={addTaskRelevantContent}
              changeViewTo={changeViewTo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
