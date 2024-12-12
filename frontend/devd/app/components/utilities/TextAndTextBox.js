import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function TextAndTextBox({
  text,
  classString = "",
  updateCallback,
  rows = 3,
  textAreaStyle = "",
}) {
  const [isEdit, setIsEdit] = useState(false);
  const textAreaRef = useRef(null);

  const handleDescriptionClick = () => {
    setIsEdit((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (textAreaRef.current) {
      updateCallback(textAreaRef.current.value);
    }
    setIsEdit(false);
  };

  useEffect(() => {
    setIsEdit(false);
  }, [text]);

  return (
    <div className={`${classString}`}>
      <div className={`sm:w-full overflow-auto`}>
        {isEdit ? (
          <form onSubmit={handleFormSubmit}>
            <div>
              <textarea
                ref={textAreaRef}
                className={`w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3 text-sm"
                name="text-textarea ${textAreaStyle}`}
                rows={rows}
                defaultValue={text}
                required={true}
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
            <pre>
              <p onClick={handleDescriptionClick} className="text-sm">
                {text}
              </p>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
