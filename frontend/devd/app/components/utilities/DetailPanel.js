import React, { useRef } from "react";

export default function DetailPanel({ detailsContainerRef, children }) {
  const defaultRef = useRef();
  return (
    <div className="border-l h-full w-full">
      <div
        ref={
          detailsContainerRef !== undefined ? detailsContainerRef : defaultRef
        }
        className="mx-3 h-full flex flex-col gap-y-12 overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
