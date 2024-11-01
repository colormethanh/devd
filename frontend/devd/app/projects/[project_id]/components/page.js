"use client";
import { useState } from "react";
import ProjectPanel from "../../../components/ComponentPanel";
import HorizontalScrollContainer from "../../../components/utilities/HorizontalScrollContainer";

export default function ComponentsPage() {
  const { components, refreshComponents, isLoading } = useComponents();
  const [activeComponent, setActiveComponent] = useState(0);

  return (
    <div>
      <h1>Projects Page</h1>
      <HorizontalScrollContainer setActiveProject={setActiveProject}>
        {components &&
          components.map((component) => (
            <ProjectPanel key={component._id} project={component} />
          ))}
      </HorizontalScrollContainer>

      <div className="project-info h-80 border border-red-700 mt-6">
        {components[activeComponent] && (
          <h1 className=""> {components[activeComponent].name} </h1>
        )}
      </div>
    </div>
  );
}
