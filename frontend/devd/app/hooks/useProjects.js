"use client";
import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProjects() {
  const { deleteProjectInDB } = useAxios();

  const deleteProject = (projectId, access_token) => {
    debugger;
    deleteProjectInDB(projectId, access_token);
  };

  return { deleteProject };
}
