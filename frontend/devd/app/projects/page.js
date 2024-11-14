"use client";
import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import Button from "../components/utilities/Button";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import useHelpers from "../hooks/useHelpers";
import Image from "next/image";
import { setRequestedProject } from "@/app/store/slices/projectSlice";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import DeleteProjectWarning from "../components/DeleteProjectWarning";
import Form from "../components/utilities/Form";

export default function ProjectsPage() {
  const { deleteProject, postProject } = useProjects();
  const projects = useSelector((state) => state?.auth?.user?.projects) || [];
  const { accessToken, needsLogin, checkAndRefreshToken, user } = useAuth();
  const [selectedProject, setSelectedProject] = useState();
  const { formatDate } = useHelpers();
  const requestedProject = useSelector(
    (state) => state.project.requestedProject
  );
  const [isAddProjectView, setIsAddProjectView] = useState(false);

  // add project form data
  const [formData, setFormData] = useState({ name: "", description: "" });

  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleOpenModal = () => {
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

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

  const handleGoToProject = () => {
    router.push(`/projects/${requestedProject}`);
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
          <div className="h-full w-1/2 p-3">
            <div className="w-full flex gap-2">
              <h3 className="text-start text-lg font-bold mb-1">
                {" "}
                Your projects{" "}
              </h3>

              <div
                className="h-8 w-8  text-lg p-1 hover:cursor-pointer"
                onClick={handleAddProjectView}
              >
                <div className="border w-full h-full flex justify-center items-center ">
                  {" "}
                  {"+"}{" "}
                </div>
              </div>
            </div>
            <div className="h-5/6 w-full">
              <div
                className="gap-4 overflow-auto no-scrollbar w-full h-full border border-gray-500 p-3
          "
              >
                {user !== undefined &&
                  user.projects.map((project, i) => {
                    return (
                      <div
                        key={project._id}
                        className={`h-16 my-3 w-full transition-all hover:cursor-pointer border flex flex-col md:flex-row  items-center px-3 hover:bg-white hover:text-black `}
                        onClick={() => handleProjectSelect(i)}
                      >
                        <div className="w-1/2 text-start">
                          {project.project_id?.name}
                        </div>{" "}
                        <div className="text-start">
                          {" "}
                          Access: {project.role}{" "}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Project Info Container */}
          <div className="h-full w-1/2 p-3">
            <h3 className="text-start text-lg font-bold mb-1"> Project </h3>
            {/* Project info */}
            <div className="border border-gray-500 h-5/6 p-3 overflow-auto">
              {isAddProjectView && (
                <>
                  {" "}
                  <Form title={"add A Project"} onSubmit={handlePostProject}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-start font-medium text-gray-300"
                      >
                        Project name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData["name"]}
                        onChange={handleInputChange}
                        required
                        autoComplete="username"
                        className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm text-start font-medium text-gray-300"
                      >
                        Description
                      </label>
                      <textarea
                        className="w-full border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
                        name="description"
                        rows={"3"}
                        value={formData["description"]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form>
                </>
              )}
              {selectedProject !== undefined && !isAddProjectView && (
                <>
                  <h1 className="text-xl font-bold underline m-3">
                    {" "}
                    {selectedProject.project.name}{" "}
                  </h1>
                  <div className="border border-gray-500 text-start p-3 h-20 overflow-auto my-3">
                    {selectedProject.project.description}
                  </div>
                  <p className="text-start my-1">
                    {" "}
                    Created At:{" "}
                    {formatDate(selectedProject.project.date_created)}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Tasks: {selectedProject.project.tasks.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Features: {selectedProject.project.features.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Pages: {selectedProject.project.pages.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Component: {selectedProject.project.components.length}{" "}
                  </p>
                  <div className="w-full h-8 flex justify-end my-3">
                    <Button
                      clickCallback={handleGoToProject}
                      addStyle="py-0 px-0 text-sm"
                    >
                      {" "}
                      View Project{" "}
                    </Button>
                    <div
                      className="w-10 p-1 h-full border border-red-400 hover:border-red-700 mx-3 flex justify-center hover:cursor-pointer"
                      onClick={handleOpenModal}
                    >
                      {" "}
                      <Image
                        src={"/static/trashIcon-white.png"}
                        height={30}
                        width={22}
                        alt="delete project icon"
                      />{" "}
                    </div>
                  </div>
                </>
              )}

              {selectedProject === undefined && !isAddProjectView && (
                <>
                  <div className="w-full h-full flex justify-center items-center">
                    {" "}
                    <h1 className="text-2xl">
                      {" "}
                      ⬅️ Select a project from the left to view it's details{" "}
                    </h1>{" "}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {Modal}
    </div>
  );
}
