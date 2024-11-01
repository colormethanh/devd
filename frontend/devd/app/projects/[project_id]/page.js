"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useProjectDetails from "@/app/hooks/useProjectDetails";
import SideBar from "@/app/components/utilities/SideBar";

export default function ProjectDetails() {
  const router = useRouter();
  const { project_id } = useParams();
  const { project, isLoading } = useProjectDetails(project_id);

  useEffect(() => {
    console.log(project_id);
  }, []);

  return (
    <div className="h-full w-full border border-red-500">
      <SideBar />
    </div>
  );
}
