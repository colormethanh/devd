import React, { useEffect, useRef, useState } from "react";
import Button from "./utilities/Button";
import useOutsideClick from "../hooks/useOutsideClick";

export default function DescriptionContainer({
  description,
  classString,
  updateCallback,
  rows = 3,
}) {
  const [isEdit, setIsEdit] = useState(false);
  // const textAreaRef = useRef(null);
  const textAreaRef = useOutsideClick(() => {
    setIsEdit(false);
  });

  const handleDescriptionClick = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDescriptionUpdate = () => {
    if (textAreaRef.current) {
      updateCallback(textAreaRef.current.value);
    }
    setIsEdit(false);
  };

  useEffect(() => {
    setIsEdit(false);
  }, [description]);

  return (
    <div className={`${classString}`}>
      <div className={`w-full overflow-auto`}>
        {isEdit ? (
          <div>
            <textarea
              ref={textAreaRef}
              className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  md:text-lg"
              name="description-textarea"
              rows={rows}
              defaultValue={description}
            />
            <div className="flex justify-end">
              <Button
                addStyle={"py-0 px-4 mr-3 border-red-500"}
                clickCallback={() => {
                  setIsEdit(false);
                }}
              >
                {" "}
                cancel{" "}
              </Button>
              <Button
                addStyle={"py-0 px-4 border-green-500"}
                clickCallback={handleDescriptionUpdate}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        ) : (
          <div className="hover:cursor-pointer border border-black  hover:border-gray-500 italic">
            <p
              onClick={handleDescriptionClick}
              className="md:text-lg ms-3 overflow-auto "
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
