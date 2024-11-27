import React, { useRef, useEffect, useState } from "react";
import Button from "./utilities/Button";
import Image from "next/image";

export default function CodeSnippetContainer({ snippet }) {
  const [isClosed, setIsClosed] = useState(true);
  const [snippetValue, setSnippetValue] = useState();
  const [isSnippetEdit, setIsSnippetEdit] = useState(false);

  const textAreaRef = useRef(null);

  const toggleEditMode = () => {
    setIsSnippetEdit((prev) => !prev);
  };

  const toggleSnippetContainer = () => {
    setIsClosed((prev) => !prev);
  };

  useEffect(() => {
    setSnippetValue(snippet);
  }, [snippet]);

  return (
    <div
      className={`flex flex-col my-6 ${
        isClosed ? "h-0" : "h-2/3"
      } transition-all `}
    >
      <div className="flex">
        <h4 className="text-xl font-bold underline"> Snippet </h4>
        <div
          className="flex justify-center hover:cursor-pointer w-9 h-6 pt-2 pb-1"
          onClick={toggleSnippetContainer}
        >
          <Image
            src="/static/downIcon-white.png"
            alt="Down icon"
            height={15}
            width={20}
          />
        </div>
      </div>
      {!isClosed && (
        <p className="text-sm text-gray-500"> Double click to edit code </p>
      )}
      <pre
        className={` text-white p-4 overflow-x-auto whitespace-pre-wrap font-mono h-full overflow-auto scroll-smooth ${
          isClosed && "hidden"
        }  ${!isSnippetEdit && "border border-gray-500"} `}
        onDoubleClick={toggleEditMode}
      >
        {isSnippetEdit ? (
          <div>
            <textarea
              ref={textAreaRef}
              className="w-full border border-green-600 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
              name="description-textarea"
              rows={8}
              defaultValue={snippetValue}
            />
            <div className="flex justify-end">
              <Button
                addStyle={"py-0 mr-3 border-red-500"}
                clickCallback={() => {
                  setIsSnippetEdit(false);
                }}
              >
                {" "}
                cancel{" "}
              </Button>
              <Button
                addStyle={"py-0 border-green-500"}
                clickCallback={() => {}}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        ) : (
          <code className={` border-gray-500`}> {snippetValue} </code>
        )}
      </pre>
    </div>
  );
}
