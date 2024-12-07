import React, { useEffect, useRef, useState } from "react";
import Form from "./utilities/Form";
export default function ShowcaseUpdatePageModal({ page, handleSubmit }) {
  const [pageData, setPageData] = useState({});
  const [pageFeatures, setPageFeatures] = useState([]);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const handleFormDataChange = (attribute, value) => {
    setPageData((prev) => ({ ...prev, [attribute]: value }));
  };

  useEffect(() => {
    setPageData(page);
    setPageFeatures(page?.features);
  }, [page]);

  return (
    <div className="w-[50vw]">
      <Form
        submitText="Save Changes"
        onSubmit={() => {
          handleSubmit(
            { name: pageData.title, description: pageData.description },
            page._id
          );
        }}
      >
        <div className="flex flex-col">
          <label htmlFor={`page-${page._id}-name`} className="text-gray-300">
            Page Name:{" "}
          </label>
          <input
            ref={nameInputRef}
            type="text"
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            value={pageData?.name || ""}
            id={`page-${page._id}-name`}
            onChange={() =>
              handleFormDataChange("name", nameInputRef?.current?.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`page-${page._id}-description`}
            className="text-gray-300"
          >
            Page Description:{" "}
          </label>
          <textarea
            ref={descriptionInputRef}
            required
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3"
            rows={3}
            value={pageData?.description}
            id={`page-${page._id}-description`}
            onChange={() =>
              handleFormDataChange(
                "description",
                descriptionInputRef?.current?.value
              )
            }
          />
        </div>
        {/* <div>
          <label> Page Features: </label>

          {pageFeatures.map((feature, i) => (
            <input
              key={`feature-${feature._id}`}
              className="w-full inline border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3 mb-2"
              type="text"
              value={feature.text}
              onChange={(e) => handleFeatureChange(i, e.target.value, feature)}
            />
          ))}
          <div className="w-full h-8">
            <div className="w-max p-1 border border-black hover:border-white text-xs">
              {" "}
              <button onClick={insertNewFeature}>+ New Feature</button>
            </div>
          </div>
        </div> */}
      </Form>
    </div>
  );
}
