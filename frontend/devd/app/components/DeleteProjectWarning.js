import React from "react";
import Button from "./utilities/Button";

export default function DeleteProjectWarning({
  onDelete,
  project,
  handleCancel,
}) {
  const onConfirm = () => {
    onDelete();
  };

  return (
    <div className=" p-3 flex flex-col gap-4 justify-center items-center">
      <h1>You're about to delete this project are you sure? </h1>
      <h1 className="md:text-lg">
        Deleting project...<span className="font-bold">{project?.name}</span>{" "}
      </h1>

      <div className="flex flex-row gap-4 mt-3">
        <button
          className="w-32 lg:w-42 border border-yellow-500 hover:bg-yellow-500"
          clickCallback={handleCancel}
        >
          {" "}
          No, nevermind{" "}
        </button>
        <button
          className="w-32 lg:w-42 border border-red-500 hover:bg-red-500"
          clickCallback={onConfirm}
        >
          {" "}
          Yes I'm sure{" "}
        </button>
      </div>
    </div>
  );
}
