"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function ProjectDetails() {
  const router = useRouter();
  const { project_id } = useParams();

  useEffect(() => {
    console.log(project_id);
  }, []);

  return <div>ProjectDetails</div>;
}
