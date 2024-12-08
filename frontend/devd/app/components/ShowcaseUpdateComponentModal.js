import React, { useEffect, useState } from "react";
import Form from "./utilities/Form";

export default function ShowcaseUpdateComponentModal({
  component,
  handleSubmit,
}) {
  const [componentData, setComponentData] = useState({});

  const handleFormDataChange = (attribute, value) => {
    setComponentData((prev) => ({ ...prev, [attribute]: value }));
  };

  useEffect(() => {
    setComponentData({
      name: component.name,
      description: component.description,
    });
  }, [component]);
  return (
    <div className="w-[90vw] md:w-[60vw] max-h-[80vh] overflow-auto">
      <Form
        submitText="Save Changes"
        onSubmit={() => {
          handleSubmit(
            {
              name: componentData.name,
              description: componentData.description,
            },
            component._id
          );
        }}
      >
        <div className="flex flex-col">
          <label
            htmlFor={`component-${component._id}-name`}
            className=" text-2xl underline mb-2"
          >
            Component Name:{" "}
          </label>
          <input
            type="text"
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            value={componentData?.name || ""}
            id={`component-${component._id}-name`}
            onChange={(e) => handleFormDataChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`component-${component._id}-description`}
            className="text-2xl underline mb-2"
          >
            Component Description:{" "}
          </label>
          <textarea
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            rows={3}
            value={componentData?.description}
            id={`component-${component._id}-description`}
            onChange={(e) =>
              handleFormDataChange("description", e.target.value)
            }
          />
        </div>
      </Form>
    </div>
  );
}
