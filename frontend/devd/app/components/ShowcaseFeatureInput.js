import React, { useState, useEffect } from "react";

export default function ShowcaseFeatureInput({ text, onFinish }) {
  const [inputValue, setInputValue] = useState("");

  const handleTextUpdate = (e) => {
    if (e.key === "Enter") {
      onFinish(e.target.value);
    }
  };

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <input
          type="text"
          className="w-full border  text-white bg-black hover:border-green-300  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
          name="description-textarea"
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => onFinish(inputValue)}
          required
          onKeyDown={handleTextUpdate}
        />
      </div>
    </div>
  );
}
