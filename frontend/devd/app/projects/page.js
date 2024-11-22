"use client";
import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import DeleteProjectWarning from "../components/DeleteProjectWarning";
import UserProjectsContainer from "../components/UserProjectsContainer";
import AddProjectForm from "../components/AddProjectForm";

export default function ProjectsPage() {
  const router = useRouter();

  // custom hooks
  const { projects, requestedProject, postProject } = useProjects();
  const { accessToken, needsLogin, checkAndRefreshToken, user } = useAuth();

  // todo: refactor into a useFormData hook

  // Add Project Form setup
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handlePostProject = () => {
    postProject(formData, accessToken);
    closeModal();
    setFormData({ name: "", description: "" });
  };

  const handleCancel = () => {
    handleCloseModal();
    setFormData({ name: "", description: "" });
  };

  const ProjectForm = (
    <AddProjectForm
      handleSubmit={handlePostProject}
      formData={formData}
      handleInputChange={handleInputChange}
      handleCancel={handleCancel}
    />
  );

  // Modal Setup
  const handleCloseModal = () => closeModal();

  const {
    Modal: AddProjectModal,
    openModal,
    closeModal,
  } = useModal("", ProjectForm, () =>
    setFormData({ name: "", description: "" })
  );

  const handleRouteToProject = (project_id) => {
    console.log(project_id);
    router.push(`/projects/${project_id}`);
  };

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
            handleRouteToProject={handleRouteToProject}
            openAddProjectModal={openModal}
          />
        </div>
      </div>
      {AddProjectModal}
    </div>
  );
}
