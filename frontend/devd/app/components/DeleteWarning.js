import React from "react";
import Button from "./utilities/Button";

export default function DeleteWarning({ onDelete, item, handleCancel }) {
  const onConfirm = () => {
    onDelete(item._id);
  };
  return (
    <div className="h-48 p-3 flex flex-col gap-4 justify-center items-center">
      <h1>You're about to delete this are you sure? </h1>
      <h1 className="text-lg"> {item.name} </h1>

      <div className="flex flex-row gap-4 mt-3">
        <Button addStyle="p-0 border-yellow-500" clickCallback={handleCancel}>
          {" "}
          No{" "}
        </Button>
        <Button addStyle="p-0 border-red-500" clickCallback={onConfirm}>
          {" "}
          Yes I'm sure{" "}
        </Button>
      </div>
    </div>
  );
}
