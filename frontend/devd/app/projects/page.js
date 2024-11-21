"use client";
import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { setRequestedProject } from "@/app/store/slices/projectSlice";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import DeleteProjectWarning from "../components/DeleteProjectWarning";
import UserProjectsContainer from "../components/UserProjectsContainer";
import ProjectInfoContainer from "../components/ProjectInfoContainer";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { projects, requestedProject, deleteProject, postProject } =
    useProjects();
  const { accessToken, needsLogin, checkAndRefreshToken, user } = useAuth();
  const [selectedProject, setSelectedProject] = useState();
  const [isAddProjectView, setIsAddProjectView] = useState(false);

  // add project form data
  const [formData, setFormData] = useState({ name: "", description: "" });

  // input change for formData
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handlePostProject = () => {
    postProject(formData, accessToken);
    setFormData({ name: "", description: "" });
    setSelectedProject(undefined);
  };

  const handleOpenModal = () => openModal();

  const handleCloseModal = () => closeModal();

  const handleDeleteProject = (project_id) => {
    deleteProject(project_id, accessToken);
    setFormData({ name: "", description: "" });
    setSelectedProject(undefined);
    closeModal();
  };

  const handleAddProjectView = () => {
    setIsAddProjectView((prev) => !prev);
    setFormData({ name: "", description: "" });
  };

  // Project delete modal
  const { Modal, openModal, closeModal } = useModal(
    "Delete project?",
    <DeleteProjectWarning
      project={selectedProject}
      handleCancel={handleCloseModal}
      onDelete={handleDeleteProject}
    />
  );

  const handleProjectSelect = (i) => {
    setSelectedProject({
      project: projects[i].project_id,
      role: projects[i].role,
    });
    setIsAddProjectView(false);
    setFormData({ name: "", description: "" });
    dispatch(setRequestedProject(projects[i].project_id._id));
  };

  const handleGoToProjectEdit = () =>
    router.push(`/projects/${requestedProject}`);

  const handleGoToProjectShowcase = () =>
    router.push(`/showcase/${selectedProject.project.name}`);

  useEffect(() => {
    const setupPage = async () => {
      if (accessToken !== undefined) {
        await checkAndRefreshToken(accessToken);
        if (needsLogin === true) router.push("/auth");
      }
    };
    setupPage();
  }, [accessToken, user, projects]);

  return (
    <div className="flex flex-row justify-center mt-6 text-center h-full w-full">
      <div className="w-2/3 h-4/5 border p-3 flex flex-col">
        <h1 className="text-3xl mb-3">Welcome Back: {user && user.username}</h1>
        <div className="h-5/6 flex g-3">
          {/* User Projects container */}
          <UserProjectsContainer
            user={user}
            handleAddProjectView={handleAddProjectView}
            handleProjectSelect={handleProjectSelect}
          />

          {/* Project Info Container */}
          <ProjectInfoContainer
            selectedProject={selectedProject}
            isAddProjectView={isAddProjectView}
            handlePostProject={handlePostProject}
            formData={formData}
            handleInputChange={handleInputChange}
            handleGoToProjectEdit={handleGoToProjectEdit}
            handleOpenModal={handleOpenModal}
            handleGoToProjectShowcase={handleGoToProjectShowcase}
          />
        </div>
      </div>
      {Modal}
    </div>
  );
}
