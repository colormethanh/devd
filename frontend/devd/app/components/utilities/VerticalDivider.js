import React from "react";

export default function VerticalDivider({ addStyle = "" }) {
  return (
    <div className={`border border-l border-gray-500 h-4/8 ${addStyle} `}>
      {" "}
    </div>
  );
}
