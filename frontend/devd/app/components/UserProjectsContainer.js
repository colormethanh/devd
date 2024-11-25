import React from "react";
import UserProjectsListItem from "./UserProjectsListItem";
import Dropdown from "./utilities/Dropdown";

export default function UserProjectsContainer({
  user,
  handleRouteToProject,
  openAddProjectModal,
  openDeleteProjectModal,
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
            toggleText={"+"}
            items={dropdownItems}
            addStyle={"px-2 text-lg"}
          />
        </div>
      </div>

      <div className="h-full w-full">
        <div
          className="overflow-auto no-scrollbar w-full h-full border border-gray-500 p-3
          "
        >
          {user !== undefined &&
            user.projects.map((project, i) => {
              return (
                <UserProjectsListItem
                  key={project._id}
                  project={project}
                  handleRouteToProject={handleRouteToProject}
                  openDeleteProjectModal={openDeleteProjectModal}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
