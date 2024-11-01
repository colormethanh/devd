import React from "react";

export default function ProjectPanel({ project, isActive }) {
  if (isActive)
    return (
      <div className="m-4 text-center justify-self-center w-11/12 border">
        <h3>{project.name}</h3>
        <p> {project.content} </p>
        <p> {project._id} </p>
      </div>
    );

  return (
    <div className="m-4 text-center justify-self-center w-11/12 border">
      <h3>{project.name}</h3>
    </div>
  );
}
