import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { HomeButton } from "@/components/PrevNextButtons";
import Label from "@/components/Label";

const places = [
  {
    id: "north-coast",
    name: "North Coast",
    image: "/place1.png",
  },
  {
    id: "alexandria",
    name: "Alexandria",
    image: "/Rectangle 7 (6).png",
  },
  {
    id: "new-zayed",
    name: "New Zayed",
    image: "/place2.png",
  },
];

export default function Places() {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-main2 overflow-hidden">
      {" "}
      <div className="absolute inset-0 mix-blend-multiply ">
        <img src="/Rectangle 3 (8).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <div className=" mix-blend-multiply absolute left-0 top-0 z-10 w-96">
        <AnimatedSvgQ />
      </div>
      <MaxWidthWrapper className="  relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {places.map((place, index) => (
            <Link to={`/${place.id}`} key={place.id}>
              <motion.div
                className="group relative aspect-square  z-[99] rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0  " />
                <Label text={place.name} />
              </motion.div>
            </Link>
          ))}
        </div>{" "}
        <HomeButton onClick={() => navigate("/")} />
      </MaxWidthWrapper>
    </div>
  );
}
