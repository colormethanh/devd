"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProjects() {
  const { deleteProjectInDB, postProjectToDB } = useAxios();

  const deleteProject = (projectId, access_token) => {
    deleteProjectInDB(projectId, access_token);
  };

  const postProject = (formData, accessToken) => {
    debugger;
    postProjectToDB({ formData, accessToken });
  };

  return { deleteProject, postProject };
}
