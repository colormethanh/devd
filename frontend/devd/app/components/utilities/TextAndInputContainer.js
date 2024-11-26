import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function TextAndInputContainer({
  text,
  classString,
  updateCallback,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const textAreaRef = useRef(null);

  const handleTextClick = () => {
    setIsEdit((prev) => !prev);
  };

  const handleTextUpdate = () => {
    if (textAreaRef.current) {
      updateCallback(textAreaRef.current.value);
    }
  };

  useEffect(() => {
    setIsEdit(false);
  }, [text]);

  return (
    <div className={`${classString}`}>
      <div className={`sm:w-full overflow-auto`}>
        {isEdit ? (
          <div className="flex gap-4">
            <input
              type="text"
              ref={textAreaRef}
              className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
              name="description-textarea"
              defaultValue={text}
            />
            <div className="flex justify-end">
              <Button
                addStyle={"py-0 mr-3 border-red-500"}
                clickCallback={() => {
                  setIsEdit(false);
                }}
              >
                {" "}
                cancel{" "}
              </Button>
              <Button
                addStyle={"py-0 border-green-500"}
                clickCallback={handleTextUpdate}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        ) : (
          <div className="hover:cursor-pointer border border-black  hover:border-gray-500 italic">
            <p
              onClick={handleTextClick}
              className="text-lg ms-3 overflow-auto min-h-7"
            >
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
