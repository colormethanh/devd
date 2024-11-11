import React, { useState } from "react";
import Button from "./Button";

export default function ListContainerItem({ text }) {
  const [itemText, setItemText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  const handleSetEdit = () => {
    setIsEdit(true);
  };

  useState(() => {
    setItemText(text);
  }, [text]);

  return isEdit ? (
    <div className="ms-3 w-5/6 my-2">
      <div className="w-full flex gap-2">
        <div className="mr-1"> {"-"} </div>
        <input
          type="text"
          className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
        />
        <Button
          addStyle={"py-0 border-red-500"}
          clickCallback={() => {
            setIsEdit(false);
          }}
        >
          {" "}
          Cancel{" "}
        </Button>
        <Button
          addStyle={"py-0 border-green-500"}
          clickCallback={() => {
            setIsEdit(false);
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
    </div>
  ) : (
    <li onClick={handleSetEdit} className="ms-3 w-5/6 my-2">
      <div className={"w-full flex"}>
        <div className="mr-1"> {"-"} </div>
        <div className="border border-black hover:border-white ps-3 w-2/3">
          {itemText}
        </div>
      </div>
    </li>
  );
}
