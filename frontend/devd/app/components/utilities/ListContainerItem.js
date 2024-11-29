import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";

export default function ListContainerItem({
  item,
  handleItemPatch,
  handleItemDelete,
}) {
  const [itemText, setItemText] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const handleSetEdit = () => {
    setIsEdit(true);
  };

  const handleEditClose = () => {
    setItemText(item?.text);
    setIsEdit(false);
  };

  const handleFeatureSubmit = () => {
    handleItemPatch({ ...item, text: itemText });
    console.log("submitting form");
  };

  const handleDeleteButtonClick = () => {
    handleItemDelete(item);
    setIsEdit(false);
  };

  useState(() => {
    setItemText(item?.text);
  }, [item]);

  return isEdit ? (
    <div className="ms-3 my-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFeatureSubmit();
        }}
      >
        <div className="w-full flex gap-2">
          <div className="mr-1"> {"-"} </div>
          <input
            type="text"
            className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            value={itemText}
            required
            onChange={(e) => setItemText(e.target.value)}
          />
          <button
            className={
              "border hover:border-red-500 hover:text-black  w-10 flex justify-center items-center"
            }
            type="button"
            onClick={handleDeleteButtonClick}
          >
            <Image
              src={"/static/trashIcon-white.png"}
              height={15}
              width={15}
              alt="delete feature button"
            />
          </button>
          <Button
            addStyle={"py-0 border-red-500"}
            clickCallback={handleEditClose}
          >
            Cancel
          </Button>
          <button
            className={
              "bg-[#000000] text-white border hover:bg-white  hover:text-black  focus:outline-black w-48 p-3 py-0 border-green-500"
            }
            type="submit"
          >
            {" "}
            Update{" "}
          </button>{" "}
        </div>
      </form>
    </div>
  ) : (
    <li onClick={handleSetEdit} className="ms-3 my-2">
      <div className={"w-full flex gap-2"}>
        <div className="mr-1"> {"-"} </div>
        <div className="border border-black hover:border-white ps-3 flex-grow">
          {itemText}
        </div>
      </div>
    </li>
  );
}
