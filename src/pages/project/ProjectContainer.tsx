import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { HomeButton, PrevButton } from "@/components/PrevNextButtons";
import Label from "@/components/Label";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API } from "@/constants";
import { useEffect } from "react";

export default function Projects() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { projects, currentPlace, fetchPlaceDetails } = useProject();

  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId);
    }
  }, [placeId]);

  if (!projects || !currentPlace) return null;

  return (
    <div className="relative min-h-screen bg-main2 overflow-hidden">
      {" "}
      <div className="absolute inset-0 mix-blend-multiply ">
        <img
          src={`${BACKEND_API}/${currentPlace.background}`}
          alt="Background Pattern"
          className="object-cover w-full z-10 bg-fixed"
        />
      </div>
      <MaxWidthWrapper className="relative justify-center !h-full flex flex-col gap-8 mt-24 z-10">
        <Header
          title={currentPlace.name}
          desc={currentPlace.description}
          className="gap-10"
          paraClassName="!max-w-full"
          view={false}
        />
        <div className="flex items-center justify-center mt-5 h-full  gap-8 ">
          {projects.map((project, index) => (
            <Link to={`/${placeId}/${project._id}/video`} key={project._id}>
              <motion.div
                className="group relative aspect-video w-full h-80 rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={`${BACKEND_API}/${project.lightImages[0]}`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <Label text={project.title} />
              </motion.div>
            </Link>
          ))}
        </div>{" "}
        <div className="  relative mt-auto">
          <div className="z-50 relative w-full">
            <div className="special-font absolute -bottom-14 left-0 flex items-center gap-4 z-50">
              <PrevButton onClick={() => navigate(`/${placeId}`)} />
            </div>

            <HomeButton onClick={() => navigate("/")} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
