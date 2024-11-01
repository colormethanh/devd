import React from "react";

export default function ComponentPanel({ project }) {
  return (
    <div className="w-40 m-4 text-center justify-self-center border">
      <h3>{project.name}</h3>
    </div>
  );
}
