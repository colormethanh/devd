import React from "react";
import PanelItem from "./PanelItem";

export default function ListPanel({
  project,
  currentItemId,
  setItem,
  setIsAddItemView,
  itemName,
}) {
  return (
    <div className="w-full flex-1">
      <div className="h-full">
        <div className=" h-full py-1">
          {project[itemName] !== undefined &&
            project[itemName].map((item) => (
              <PanelItem
                key={`${item._id}`}
                item={item}
                isSelected={item._id === currentItemId}
                clickCallback={() => {
                  setItem(item);
                  setIsAddItemView(false);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
