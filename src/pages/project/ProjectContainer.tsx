import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ButtonCustom } from "@/components/ButtonCustom";
import { ArrowLeft, ChevronLeft, Home } from "lucide-react";

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
        <Header view={false} />
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
                <div className=" flex items-stretch  absolute bottom-6 left-0">
                  <img src="/q.png" className=" h-12 mix-blend-multiply" alt="" />
                  <h2 className="text-2xl bg-main2   mix-blend-multiply h-full  px-10 py-2 rounded-r-2xl text-white font-semibold">
                    {project.name}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>{" "}
        <div className="z-50 w-full -bottom-20 left-28 absolute">
          <ButtonCustom
            variant="outline"
            onClick={() => navigate(`/${placeId}`)}
            className="backdrop-blur-sm uppercase  special-font flex items-center gap-4 z-50 !py-5 !px-4  "
          >
            {" "}
            <div className=" bg-main text-black  p-1 rounded-full mx-2">
              <ArrowLeft className="h-4 w-4    " />
            </div>
            Prev
          </ButtonCustom>
          <Button
            onClick={() => navigate("/")}
            variant="default"
            size="lg"
            className="fixed !px-4 !py-6 cursor-pointer hover:bg-white hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
          >
            <Home className="h-8 w-8" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
