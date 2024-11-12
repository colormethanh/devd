import React, { useRef, useEffect, useState } from "react";
import Button from "./utilities/Button";
import Image from "next/image";

export default function CodeSnippetContainer({ snippet }) {
  const [isClosed, setIsClosed] = useState(true);

  const toggleSnippetContainer = () => {
    setIsClosed((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col ${isClosed ? "h-0" : "h-48"} transition-all `}
    >
      <div className="flex">
        <h4 className="text-xl font-bold"> Snippet </h4>
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
      <pre
        className={`bg-gray-800 text-white p-4 overflow-x-auto whitespace-pre-wrap font-mono h-full overflow-auto scroll-smooth ${
          isClosed && "hidden"
        }`}
      >
        <code className={``}> {snippet !== undefined && snippet} </code>
      </pre>
    </div>
  );
}
