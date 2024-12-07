import React, { useState } from "react";
import Image from "next/image";

export default function ShowcaseImageModalImageItem({ image, handleDelete }) {
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  return (
    <li className="h-24 border p-2 my-3 flex gap-4 items-end">
      <div className="h-full">
        <Image
          src={image.url}
          height={100}
          width={125}
          className="h-full w-28"
          alt={`${image.title}-image`}
        />
      </div>
      Image Title: {image.title}
      <div className="flex gap-2 items-end">
        <Image
          src={"/static/trashIcon-red.png"}
          height={25}
          width={25}
          alt="delete image Icon"
          className="p-1 border border-black hover:border-red-500 hover:cursor-pointer"
          onClick={() => {
            setIsDeleteConfirmation((prev) => !prev);
          }}
        />
        <div
          className={`flex gap-3 overflow-hidden ${
            !isDeleteConfirmation && "w-0"
          }`}
        >
          Delete Image?
          <button
            className="border border-yellow-300 hover:border-yellow-500 px-3"
            onClick={() => setIsDeleteConfirmation(false)}
          >
            No
          </button>
          <button
            className="border border-red-300 hover:border-red-500 px-3"
            onClick={() => {
              handleDelete(image);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </li>
  );
}
