import React, { useEffect, useRef, useState } from "react";
import Button from "./utilities/Button";

export default function DescriptionContainer({
  description,
  classString,
  updateCallback,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const textAreaRef = useRef(null);

  const handleDescriptionClick = () => {
    console.log("double clicked");
    setIsEdit((prev) => !prev);
  };

  const handleDescriptionUpdate = () => {
    if (textAreaRef.current) {
      updateCallback(textAreaRef.current.value);
    }
  };

  useEffect(() => {
    setIsEdit(false);
  }, [description]);

  return (
    <div>
      <h5 className="text-xl font-bold">Description: </h5>
      <div className={` ${classString}`}>
        {isEdit ? (
          <div>
            <textarea
              ref={textAreaRef}
              className="bg-black w-full border border-gray-500 focus:outline-none focus:ring-0 resize-none px-3  text-lg"
              name="description-textarea"
              rows={"3"}
              defaultValue={description}
            />
            <div className="flex justify-end">
              <Button
                addStyle={"py-0 mr-3"}
                clickCallback={() => {
                  setIsEdit(false);
                }}
              >
                {" "}
                cancel{" "}
              </Button>
              <Button addStyle={"py-0"} clickCallback={handleDescriptionUpdate}>
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        ) : (
          <div className="hover:cursor-pointer border border-black  hover:border-gray-500">
            <p
              onClick={handleDescriptionClick}
              className="text-lg ms-3 overflow-auto "
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
