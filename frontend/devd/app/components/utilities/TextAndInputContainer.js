import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import useOutsideClick from "@/app/hooks/useOutsideClick";

export default function TextAndInputContainer({
  text,
  classString,
  updateCallback,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const inputContainerRef = useOutsideClick(() => {
    setIsEdit(false);
  });

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
    <div ref={inputContainerRef} className={`${classString}`}>
      <div className={`w-full overflow-auto`}>
        {isEdit ? (
          <form onSubmit={handleTextUpdate}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                ref={textAreaRef}
                className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  lg:text-lg"
                name="description-textarea"
                defaultValue={text}
              />
              <div className="flex justify-end">
                <button
                  className={"py-0 mr-3 border w-40 border-red-500"}
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  {" "}
                  cancel{" "}
                </button>
                <button
                  type="submit"
                  className="bg-[#000000] 
                              text-white 
                              border
                              hover:bg-white 
                              hover:text-black 
                              focus:outline-black 
                              w-40 
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
              className="lg:text-lg ms-3 overflow-auto min-h-7"
            >
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
