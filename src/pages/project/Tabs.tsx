import { Outlet, useLocation, useParams } from "react-router-dom";
import { NavigationControls } from "@/components/NavigationControls";
import { AnimatePresence } from "framer-motion";
import { useProject } from "@/context/ProjectContext";
import { useEffect } from "react";
import { BACKEND_API } from "@/constants";
import { useNav } from "@/context/NavContext";

export default function ProjectTabs() {
  const location = useLocation();
  const { placeId, projectId } = useParams();
  const { currentProject, projects, setCurrentProject } = useProject();
  const { setTitle } = useNav();

  useEffect(() => {
    if (projectId && projects) {
      const project = projects.find((p) => p._id === projectId);
      if (project) {
        setCurrentProject(project);
        setTitle(project.title);
      }
    }
  }, [projectId, projects]);

  // Check if the current path is exactly "/:placeId/:projectId"
  const isRootProjectPath = location.pathname === `/${placeId}/${projectId}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {isRootProjectPath && currentProject && (
        <>
          <div className="mix-blend-multiply bg-main2 absolute left-0 top-0 z-10 w-full h-full"></div>
          <img
            src={`${BACKEND_API}/${currentProject.lightImages[0]}`}
            className="object-cover w-full absolute inset-0 h-full"
            alt=""
          />
        </>
      )}

      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>

      <NavigationControls />
    </div>
  );
}
