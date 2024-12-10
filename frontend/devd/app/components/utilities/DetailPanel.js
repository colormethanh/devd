import React, { useRef } from "react";

export default function DetailPanel({ detailsContainerRef, children }) {
  const defaultRef = useRef();
  return (
    <div className="h-full w-full p-3">
      <div
        ref={
          detailsContainerRef !== undefined ? detailsContainerRef : defaultRef
        }
        className="mx-3 h-full flex flex-col gap-y-4 overflow-y-auto overflow-x-auto no-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
