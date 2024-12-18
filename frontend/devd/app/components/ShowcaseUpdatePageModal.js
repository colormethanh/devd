import React, { useEffect, useRef, useState } from "react";
import Form from "./utilities/Form";
import Image from "next/image";
import ShowcaseFeatureInput from "./ShowcaseFeatureInput";

export default function ShowcaseUpdatePageModal({ page, handleSubmit }) {
  const [pageData, setPageData] = useState({});
  const [pageFeatures, setPageFeatures] = useState([]);

  const handleFormDataChange = (attribute, value) => {
    setPageData((prev) => ({ ...prev, [attribute]: value }));
  };

  const handleFeatureChange = (index, value, feature) => {
    const updatedFeature = { ...feature, text: value };
    setPageFeatures((prev) =>
      prev.map((item, i) => (i === index ? updatedFeature : item))
    );
  };

  const handleFeatureInsert = () => {
    setPageFeatures((prev) => [...prev, { text: "" }]);
  };

  const handleRemovePageFeature = (i) => {
    const updatedItem = [...pageFeatures];
    updatedItem.splice(i, 1);
    setPageFeatures(updatedItem);
  };

  useEffect(() => {
    setPageData(page);
    setPageFeatures(page?.features);
  }, [page]);

  return (
    <div className=" md:w-[60vw] max-h-[80vh] overflow-auto">
      <Form
        submitText="Save Changes"
        onSubmit={() => {
          handleSubmit(
            {
              name: pageData.name,
              description: pageData.description,
              features: pageFeatures,
            },
            page._id
          );
        }}
      >
        <div className="flex flex-col">
          <label
            htmlFor={`page-${page._id}-name`}
            className=" text-2xl underline mb-1"
          >
            Page Name:{" "}
          </label>
          <input
            type="text"
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            value={pageData?.name || ""}
            id={`page-${page._id}-name`}
            onChange={(e) => handleFormDataChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`page-${page._id}-description`}
            className="text-2xl underline mb-1"
          >
            Page Description:{" "}
          </label>
          <textarea
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            rows={3}
            value={pageData?.description}
            id={`page-${page._id}-description`}
            onChange={(e) =>
              handleFormDataChange("description", e.target.value)
            }
          />
        </div>
        <div>
          <label className="text-2xl underline"> Page Features: </label>
          <p className="text-xs text-gray-400 mb-2">
            {" "}
            List the different features that this page contains here!
          </p>
          {pageFeatures.map((feature, i) => (
            <div key={`feature-${feature.text}-${i}`} className="flex mb-2">
              <span className="me-2"> - </span>
              <ShowcaseFeatureInput
                text={feature.text}
                onFinish={(value) => handleFeatureChange(i, value, feature)}
              />
              <div>
                <Image
                  src={"/static/trashIcon-red.png"}
                  height={15}
                  width={15}
                  className="w-6 h-6 p-1 mx-1 hover:cursor-pointer border border-black hover:border-red-500"
                  alt={"page-feature-delete-icon"}
                  onClick={() => handleRemovePageFeature(i)}
                />
              </div>
            </div>
          ))}

          <div className="w-full h-8">
            <div
              className="w-max p-1 border border-black hover:border-white text-xs hover:cursor-pointer"
              onClick={handleFeatureInsert}
            >
              {" "}
              + New Feature
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
