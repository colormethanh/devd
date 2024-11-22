import React from "react";
import UserProjectsListItem from "./UserProjectsListItem";
import Dropdown from "./utilities/Dropdown";
import useOutsideClick from "../hooks/useOutsideClick";

export default function UserProjectsContainer({
  user,
  handleRouteToProject,
  openAddProjectModal,
}) {
  const dropdownItems = [
    {
      text: "Add a Project",
      callback: () => {
        openAddProjectModal();
      },
    },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-2 p-3">
      <div className="w-full flex gap-2">
        <h3 className="text-start text-lg font-bold"> Your projects </h3>

        <div>
          <Dropdown
            toggleText={"..."}
            items={dropdownItems}
            addStyle={"py-0 px-3"}
          />
        </div>
      </div>

      <div className="h-full w-full">
        <div
          className="gap-4 overflow-auto no-scrollbar w-full h-full border border-gray-500 p-3
          "
        >
          {user !== undefined &&
            user.projects.map((project, i) => {
              return (
                <UserProjectsListItem
                  key={project._id}
                  project={project}
                  handleRouteToProject={handleRouteToProject}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
