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

  const handleTextUpdate = (e) => {
    e.preventDefault();
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
          <form onSubmit={handleTextUpdate}>
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
                <button
                  className="bg-[#000000] 
                              text-white 
                              border
                              hover:bg-white 
                              hover:text-black 
                              focus:outline-black 
                              w-48 
                              p-3 py-0 border-green-500"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
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
