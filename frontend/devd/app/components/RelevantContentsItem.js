import React from "react";
import useHelpers from "../hooks/useHelpers";

export default function RelevantContentsItem({ content }) {
  const { ellipsifyString } = useHelpers();
  return (
    <div className="flex justify-between h-12 w-full border-b border-gray-500 hover:bg-slate-700">
      <div className="w-3/6 flex items-center ps-3">
        <div className="hidden md:block w-2/6">
          <div className="">{content.type}:</div>
        </div>
        <div className="hidden sm:block text-start ps-1">{content.name}</div>
        <div className="text-start sm:hidden ps-1">
          {ellipsifyString(content.name, 10)}
        </div>
      </div>

      <div className="py-2 mr-3">
        <div className=" border-l  border-gray-500  h-full"></div>
      </div>
      <div className="w-1/6 text-start flex items-center">{">>>"}</div>
    </div>
  );
}
