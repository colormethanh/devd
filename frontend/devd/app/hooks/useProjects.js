"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProjects() {
  const { deleteProjectInDB, postProjectToDB } = useAxios();

  const projects = useSelector((state) => state?.auth?.user?.projects) || [];
  const requestedProject = useSelector(
    (state) => state.project.requestedProject
  );

  const deleteProject = (projectId, access_token) => {
    deleteProjectInDB(projectId, access_token);
  };

  const postProject = (formData, accessToken) => {
    postProjectToDB({ formData, accessToken });
  };

  return { projects, requestedProject, deleteProject, postProject };
}
