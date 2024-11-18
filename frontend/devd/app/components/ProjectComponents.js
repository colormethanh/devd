import React, { useEffect, useState } from "react";
import ListPanel from "./utilities/ListPanel";
import useComponents from "../hooks/useComponents";
import AddComponentPanel from "./AddComponentPanel";
import ComponentDetailPanel from "./ComponentDetailPanel";

export default function ProjectComponents({ project, accessToken }) {
  const [isAddComponentView, setIsAddComponentView] = useState(true);
  const [viewTogglerDisabled, setViewTogglerDisabled] = useState(false);
  const {
    component,
    setComponent,
    postNewComponent,
    updateComponentVisibility,
    addComponentImage,
    updateComponentStatus,
    updateComponentDescription,
    deleteComponent,
  } = useComponents(project, accessToken);
  const currentComponentId = component._id || null;

  useEffect(() => {
    if (project.components) {
      if (project.components.length === 0) {
        setIsAddComponentView(true);
        setViewTogglerDisabled(true);
      } else {
        setViewTogglerDisabled(false);
        setIsAddComponentView(false);
      }
    }
  }, [project]);

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="flex flex-col w-1/6 h-full">
          <div className="flex w-full justify-end p-1 h-8 border-b border-gray-500">
            <div
              onClick={() => setIsAddComponentView((prev) => !prev)}
              className={`flex justify-center w-1/6 text-xl hover:cursor-pointer ${
                viewTogglerDisabled && "hidden"
              }`}
            >
              {"+"}
            </div>
          </div>
          {/* Components list panel */}
          <ListPanel
            project={project}
            currentItemId={currentComponentId}
            setItem={setComponent}
            setIsAddItemView={setIsAddComponentView}
            itemName={"components"}
          />
        </div>
        <div className="w-5/6 h-full">
          {isAddComponentView ? (
            <AddComponentPanel
              setIsAddComponentView={setIsAddComponentView}
              project={project}
              postNewComponent={postNewComponent}
            />
          ) : (
            <ComponentDetailPanel
              component={component}
              updateComponentVisibility={updateComponentVisibility}
              addComponentImage={addComponentImage}
              updateComponentStatus={updateComponentStatus}
              updateComponentDescription={updateComponentDescription}
              deleteComponent={deleteComponent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
