import React, { useState, useEffect, useRef } from "react";
import ListContainerItem from "./ListContainerItem";
import Button from "./Button";

export default function ListContainer({
  addStyles,
  items,
  title,
  addItem,
  patchItem,
}) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const featuresFormRef = useRef();

  const handleAddItem = () => {
    addItem(newItemText);
    setNewItemText("");
    setIsAddingItem(false);
  };

  const handleItemPatch = (item) => {
    patchItem(item);
  };

  return (
    <div>
      <div className="flex gap-4">
        <h1 className="text-xl font-bold underline ">{title}</h1>
        <div
          onClick={() => {
            setIsAddingItem(true);
          }}
          className="grid place-items-center w-8 border border-black hover:border-white hover:cursor-pointer"
        >
          {" "}
          {"+"}{" "}
        </div>
      </div>

      {/* Add new feature */}
      {isAddingItem && (
        <form ref={featuresFormRef} onSubmit={handleAddItem}>
          <div className="flex gap-4 mx-3 my-4">
            {" "}
            <input
              type="text"
              className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
              value={newItemText}
              required
              onChange={(e) => setNewItemText(e.target.value)}
            />
            <Button
              addStyle={"py-0 border-red-500"}
              clickCallback={() => {
                setIsAddingItem(false);
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
            <button
              className={
                "bg-[#000000] text-white border hover:bg-white  hover:text-black  focus:outline-black w-48 p-3 py-0 border-green-500"
              }
              type="submit"
            >
              {" "}
              Submit{" "}
            </button>{" "}
          </div>
        </form>
      )}
      <ul className={`overflow-y-auto ${addStyles}`}>
        {items !== undefined &&
          items.map((item, i) => {
            return (
              <ListContainerItem
                item={item}
                key={`task-feature-${item._id}`}
                handleItemPatch={handleItemPatch}
              />
            );
          })}
        {items !== undefined && items.length === 0 && (
          <div>{"😦 No features added yet. Add on now!"}</div>
        )}
      </ul>
    </div>
  );
}
