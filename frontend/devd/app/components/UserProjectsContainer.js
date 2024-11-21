import React from "react";

export default function UserProjectsContainer({
  user,
  handleAddProjectView,
  handleProjectSelect,
}) {
  return (
    <div className="h-full w-1/2 p-3">
      <div className="w-full flex gap-2">
        <h3 className="text-start text-lg font-bold mb-1"> Your projects </h3>

        <div
          className="h-8 w-8  text-lg p-1 hover:cursor-pointer"
          onClick={handleAddProjectView}
        >
          <div className="border w-full h-full flex justify-center items-center ">
            {" "}
            {"+"}{" "}
          </div>
        </div>
      </div>
      <div className="h-5/6 w-full">
        <div
          className="gap-4 overflow-auto no-scrollbar w-full h-full border border-gray-500 p-3
          "
        >
          {user !== undefined &&
            user.projects.map((project, i) => {
              return (
                <div
                  key={project._id}
                  className={`h-16 my-3 w-full transition-all hover:cursor-pointer border flex flex-col md:flex-row  items-center px-3 hover:bg-white hover:text-black `}
                  onClick={() => handleProjectSelect(i)}
                >
                  <div className="w-1/2 text-start">
                    {project.project_id?.name}
                  </div>{" "}
                  <div className="text-start"> Access: {project.role} </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
