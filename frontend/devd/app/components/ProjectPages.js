import React, { useState, useEffect } from "react";
import usePages from "../hooks/usePages";
import ListPanel from "./utilities/ListPanel";
import PageDetailsPanel from "./PageDetailsPanel";
import AddPagePanel from "./AddPagePanel";

export default function ProjectPages({ project, accessToken }) {
  const [isAddPageView, setIsAddTaskView] = useState(true);
  const [viewTogglerDisabled, setViewTogglerDisabled] = useState(false);
  const {
    page,
    setPage,
    updatePageVisibility,
    updatePageDescription,
    addPageImage,
    addPageFeature,
    postNewPage,
    deletePage,
    patchFeature,
  } = usePages(project, accessToken);
  const currentPageId = page._id || null;

  useEffect(() => {
    if (project.pages) {
      if (project.pages.length === 0) {
        setIsAddTaskView(true);
        setViewTogglerDisabled(true);
      } else {
        setViewTogglerDisabled(false);
        setIsAddTaskView(false);
      }
    }
  }, [project]);

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex h-full">
        <div className="flex flex-col w-1/6 h-full">
          <div className="flex w-full justify-end p-1 h-8 border-b border-gray-500">
            <div
              onClick={() => setIsAddTaskView((prev) => !prev)}
              className={`flex justify-center w-1/6 text-xl hover:cursor-pointer ${
                viewTogglerDisabled && "hidden"
              }`}
            >
              {"+"}
            </div>
          </div>
          {/* Pages list panel */}
          <ListPanel
            project={project}
            currentItemId={currentPageId}
            setItem={setPage}
            setIsAddItemView={setIsAddTaskView}
            itemName={"pages"}
          />
        </div>
        <div className="w-5/6 h-full">
          {isAddPageView ? (
            <AddPagePanel
              postNewPage={postNewPage}
              project={project}
              setIsAddPageView={setIsAddTaskView}
            />
          ) : (
            <PageDetailsPanel
              page={page}
              updatePageVisibility={updatePageVisibility}
              updatePageDescription={updatePageDescription}
              addPageImage={addPageImage}
              addPageFeature={addPageFeature}
              deletePage={deletePage}
              patchFeature={patchFeature}
            />
          )}
        </div>
      </div>
    </div>
  );
}
