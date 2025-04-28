import { BACKEND_API, ImageUrl } from "@/constants";
import { useProject } from "@/context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Video = () => {
  const { currentProject, projects, setCurrentProject } = useProject();
  const { placeId, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId && projects) {
      const project = projects.find((p) => p._id === projectId);
      if (project) {
        setCurrentProject(project);
        console.log(project)
        if (!project?.video) navigate(`/${placeId}/${projectId}`);
      }
    }
  }, [projectId, projects]);

  return (
    <div>
      <div className="w-full h-screen">
        <video
          loop
          controls
          autoPlay
          muted
          src={`${ImageUrl}/${currentProject?.video}`}
          className="w-full h-full inset-0 object-cover"
        />
      </div>
    </div>
  );
};

export default Video;
