"use client";

import React from "react";
import useShowcase from "@/app/hooks/useShowcase";

export default function ProjectShowcase({ params }) {
  const { project_id } = React.use(params);
  const { project } = useShowcase();

  return (
    <div className="w-full h-full p-3 overflow-auto">
      <div className="w-full border"></div>
    </div>
  );
}
