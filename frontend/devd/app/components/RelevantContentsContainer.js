import React, { useState } from "react";
import RelevantContentsItem from "./RelevantContentsItem";

export default function RelevantContentsContainer({ contents }) {
  return (
    <div className="flex flex-col h-full ">
      <h5 className="text-xl font-bold"> Relevant contents:</h5>

      <div className="h-4/6 w-full border overflow-auto no-scrollbar bg-gray-800">
        <RelevantContentsItem
          content={{
            type: "component",
            name: "Index number 0",
            id: "1234345",
          }}
        />
        <RelevantContentsItem
          content={{
            type: "component",
            name: "TaskBarNav number 1",
            id: "1234345",
          }}
        />
        <RelevantContentsItem
          content={{
            type: "page",
            name: "Body1 number 2",
            id: "1234345",
          }}
        />
        <RelevantContentsItem
          content={{
            type: "bug",
            name: "Footer number 3",
            id: "1234345",
          }}
        />
      </div>
    </div>
  );
}
