import { BACKEND_API } from "@/constants";
import { useProject } from "@/context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Video = () => {
  const { currentProject } = useProject();
  const { placeId, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If no project or no videos, redirect to project tabs
    if (!currentProject || !currentProject.videos?.length) {
      navigate(`/${placeId}/${projectId}`);
    }
  }, [currentProject, placeId, projectId, navigate]);

  if (!currentProject || !currentProject.videos?.length) return null;

  return (
    <div>
      <div className="w-full h-screen">
        <video
          loop
          controls
          autoPlay
          muted
          src={`${BACKEND_API}/${currentProject.videos[0]}`}
          className="w-full h-full inset-0 object-cover"
        />
      </div>
    </div>
  );
};

export default Video;
