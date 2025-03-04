import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { HomeButton, PrevButton } from "@/components/PrevNextButtons";
import Label from "@/components/Label";

const projects = [
  {
    id: "q-north",
    name: "Q North Project",
    image: "/p1.png",
  },
  {
    id: "q-six",
    name: "Q Six Project",
    image: "/p2.png",
  },
];

export default function Projects() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const video = true;
  return (
    <div className="relative min-h-screen bg-main2 overflow-hidden">
      {" "}
      <div className="absolute inset-0 mix-blend-multiply ">
        <img src="/Rectangle 3 (8).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <MaxWidthWrapper className="relative flex flex-col gap-8 mt-24 z-10">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {projects.map((project, index) => (
            <Link to={video ? `/${placeId}/${project.id}/video` : `/${placeId}/${project.id}`} key={project.id}>
              <motion.div
                className="group relative aspect-video rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <Label text={project.name} />
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
