import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";
import { HomeButton } from "@/components/PrevNextButtons";
import Label from "@/components/Label";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API, ImageUrl } from "@/constants";
import { useEffect } from "react";
import { useNav } from "@/context/NavContext";

export default function Places() {
  const navigate = useNavigate();
  const { places, isLoading } = useProject();
  const { setTitle } = useNav();

  if (isLoading) return null;
  if (!places?.length) return null;
  useEffect(() => {
    setTitle("Places");
  }, []);
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-main2 overflow-hidden">
      {" "}
      <div className="absolute inset-0 mix-blend-multiply ">
        <img
          src={`${ImageUrl}/${places[0].background}`}
          alt="Background Pattern"
          className="object-cover w-full z-10 bg-fixed"
        />
      </div>
      <div className=" mix-blend-multiply absolute left-0 top-0 z-10 w-96">
        <AnimatedSvgQ />
      </div>
      <MaxWidthWrapper className="  relative z-10">
        <div className="flex items-center   justify-center gap-8 mt-16">
          {places.map((place, index) => (
            <Link to={`/${place._id}`} key={place._id}>
              <motion.div
                className="group relative aspect-square w-96  z-[99] rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={`${ImageUrl}/${place.background}`}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0  " />{" "}
                <div>
                  <div className={` flex items-stretch  absolute bottom-6 left-0`}>
                    <img src="/Vector (18).png" alt="Q" className="w-[42px]  h-auto" />
                    <h2
                      className="text-2xl bg-main2 h-full special-font2  px-10 py-2  rounded-r-2xl
     text-white font-semibold"
                    >
                      {place.name}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>{" "}
        <HomeButton onClick={() => navigate("/")} />
      </MaxWidthWrapper>
    </div>
  );
}
