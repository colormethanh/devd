import React, { useEffect, useState } from "react";
import DescriptionContainer from "./DescriptionContainer";
import useHelpers from "../hooks/useHelpers";
import RelevantContentsContainer from "./RelevantContentsContainer";
import DetailPanel from "./utilities/DetailPanel";
import useModal from "../hooks/useModal";
import DeleteWarning from "./DeleteWarning";

export default function TaskDetailPanel({
  task,
  updateTaskStatus,
  updateTaskDescription,
  project,
  addTaskRelevantContent,
  changeViewTo,
  deleteTask,
}) {
  const [selectedStatus, setSelectedStatus] = useState("backlog");
  const [description, setDescription] = useState("");
  const { formatDate, filterRelevantContents } = useHelpers();

  const handleStatusChange = (e) => {
    updateTaskStatus(task, e.target.value);
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updateTaskDescription(task, updatedDescription);
  };

  const handleAddRelevantContent = (content) => {
    addTaskRelevantContent(task, content);
  };

  const handleDelete = () => {
    // debugger;
    deleteTask(task);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const { Modal, openModal, closeModal } = useModal(
    "Delete Task",
    <DeleteWarning
      onDelete={handleDelete}
      item={task}
      handleCancel={handleCancel}
    />
  );

  const toggleDeleteModal = () => {
    openModal();
  };

  useEffect(() => {
    setSelectedStatus(task.status);
    setDescription(task.description);
  }, [task]);

  return (
    <DetailPanel>
      <div className="w-full flex flex-col ">
        <h1 className="text-xl md:text-2xl lg:text-4xl"> {task.name} </h1>
        <hr className="my-2 "></hr>

        {/* Title and info bar */}
        <div className="flex flex-col sm:flex-row sm:w-full">
          {/* Posted date */}
          <div className="mr-3 my-1 md:my-0">
            <div className="flex flex-col sm:flex-row">
              <span className="text-sm">
                {" "}
                Created: {formatDate(task.date_created)}{" "}
              </span>
            </div>
          </div>
          <div className="border-l border-b sm:border-b-0 border-white"></div>
          <div className="border-l border-white mr-3"></div>

          {/* Task status */}
          <div className="mr-3 my-1 md:my-0">
            <select
              id="status"
              name="status"
              className="block w-full border border-black hover:border-white py-1.5 bg-black text-white focus:outline-none focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:max-w-xs text-xs hover:cursor-pointer"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value={"backlog"}>Backlog</option>
              <option value={"inProgress"}>In progress</option>
              <option value={"done"}>Done</option>
            </select>
          </div>
          <div className="border-l border-b sm:border-b-0 border-white"></div>
          <div className="border-l border-white mr-3"></div>

          {/* Delete Task */}
          <div
            onClick={toggleDeleteModal}
            className="mr-3 text-xs flex items-center border border-black py-1 px-2 hover:cursor-pointer hover:border-red-500 my-1 md:my-0"
          >
            Delete Task
          </div>
        </div>
        <div className="border-l border-b sm:border-b-0 border-white"></div>
      </div>

      {/* Task Description */}
      <DescriptionContainer
        description={description}
        classString={"max-h-1/3 mt-3"}
        updateCallback={handleDescriptionUpdate}
      />

      <div className="border-b border-gray-500 mr-3 w-full"></div>

      {/* Relevant contents */}

      {/* <RelevantContentsContainer
        projectContents={{
          components: filterRelevantContents(
            project.components,
            task.relevant_contents
          ),
          pages: filterRelevantContents(project.pages, task.relevant_contents),
        }}
        relevantContents={task.relevant_contents}
        addContent={handleAddRelevantContent}
        changeViewTo={changeViewTo}
      /> */}
      {Modal}
    </DetailPanel>
  );
}
