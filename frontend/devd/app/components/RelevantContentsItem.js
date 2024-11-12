import React from "react";
import useHelpers from "../hooks/useHelpers";
import Image from "next/image";

export default function RelevantContentsItem({ content, changeViewTo }) {
  const { ellipsifyString } = useHelpers();

  const itemIcon = () => {
    // todo: change default icon
    let src = "/static/componentIcon-white.png";

    if (content?.content_type === "Component") {
      src = "/static/componentIcon-white.png";
    } else {
      src = "/static/pagesIcon-white.png";
    }
    return (
      <Image src={src} height={20} width={20} alt="relevant contents icon" />
    );
  };

  const handleContentViewPeek = () => {
    if (content?.content_type === "Component") {
      changeViewTo("components", content.content_id);
    } else {
      changeViewTo("pages", content.content_id);
    }
  };

  return (
    <div className="flex justify-between h-12 w-full border-b border-gray-500 hover:bg-slate-700 hover:cursor-pointer">
      <div className="w-1/3 h-full flex gap-3 items-center ps-3">
        <div className="hidden md:block">
          <div className="">{itemIcon()}</div>
        </div>
        <div className="hidden sm:block text-start ps-1">
          {content.content_name}
        </div>
        <div className="text-start sm:hidden ps-1">
          {content.content_name !== undefined &&
            ellipsifyString(content.content_name, 10)}
        </div>
      </div>

      {/* Divider */}
      <div className="py-2">
        <div className=" border-l  border-gray-500  h-full"></div>
      </div>

      <div
        className="w-1/6 text-start flex items-center"
        onClick={handleContentViewPeek}
      >
        {">>>"}
      </div>
    </div>
  );
}
