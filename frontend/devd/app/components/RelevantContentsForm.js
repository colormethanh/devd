import React, { useEffect, useState } from "react";
import Form from "./utilities/Form";

export default function RelevantContentsForm({
  contents,
  setSelectedContent,
  handleSubmit,
}) {
  useEffect(() => {
    if (contents !== undefined && contents.length !== 0) {
      setSelectedContent(contents[0]);
    } else {
      setSelectedContent(undefined);
    }
  }, [contents]);

  return (
    <div className="w-full">
      {contents?.length === 0 ? (
        <h1> No contents available to add </h1>
      ) : (
        <Form onSubmit={handleSubmit} title={""}>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-white"
          >
            Choose contents from below:
          </label>
          <select
            id="content"
            className="w-full p-2 border border-gray-300 bg-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onChange={(e) =>
              setSelectedContent(contents[parseInt(e.target.value)])
            }
          >
            {contents !== undefined &&
              contents.map((content, i) => (
                <option key={content._id} value={i}>
                  {" "}
                  {content.name}{" "}
                </option>
              ))}
          </select>
        </Form>
      )}
    </div>
  );
}
