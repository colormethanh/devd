import React, { useState, useEffect } from "react";
import ListContainerItem from "./ListContainerItem";
import Button from "./Button";

export default function ListContainer({
  addStyles,
  items,
  onItemEdit,
  title,
  addItem,
}) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleAddItem = () => {
    addItem(newItemText);
    setNewItemText("");
    setIsAddingItem(false);
  };

  useEffect(() => {
    if (items !== undefined) setListItems(items);
  }, [items]);

  return (
    <div>
      <div className="flex gap-4">
        <h1 className="text-xl">{title}</h1>
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
        <div className="flex gap-4 mx-3 my-4">
          {" "}
          <input
            type="text"
            className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            value={newItemText}
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
          <Button
            addStyle={"py-0 border-green-500"}
            clickCallback={handleAddItem}
          >
            {" "}
            Submit{" "}
          </Button>{" "}
        </div>
      )}
      <ul className={`overflow-y-auto ${addStyles}`}>
        {listItems !== undefined &&
          listItems.map((item, i) => (
            <ListContainerItem
              key={`task-feature-${i + new Date()}`}
              text={item}
            />
          ))}
      </ul>
    </div>
  );
}