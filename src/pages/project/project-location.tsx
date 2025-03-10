import React, { useState } from "react";
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ShoppingCart, Plane, Building2, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API } from "@/constants";

const locations = [
  {
    time: "10",
    label: "FROM ONE MALL",
    icon: ShoppingCart,
    image: "/Rectangle 3 (8).png", // Add image path for each location
  },
  {
    time: "25",
    label: "FROM CAIRO AIRPORT",
    icon: Plane,
    image: "/Rectangle 7 (7).png",
  },
  {
    time: "05",
    label: "FROM FAMILY PARK",
    icon: Building2,
    image: "/Rectangle 7 (6).png",
  },
  {
    time: "20",
    label: "FROM FUTURE UNIV.",
    icon: GraduationCap,
    image: "/Rectangle 7 (6).png",
  },
];

const Location = () => {
  const { currentProject } = useProject();
  const [selectedLocation, setSelectedLocation] = useState(currentProject?.location.numbers[0]); // Default to the first location

  return (
    <div className="text-white min-h-screen pt-20">
      <div className="mix-blend-multiply bg-main2 absolute left-0 top-0 z-10 w-full h-full"></div>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <img
          src={`${BACKEND_API}/${currentProject?.location.background}`}
          alt="Background Pattern"
          className="object-cover w-full h-full bg-fixed"
        />
      </motion.div>
      <MaxWidthWrapper className="flex relative z-40 flex-col gap-5">
        <Header title={`${currentProject?.title} Location`} desc={currentProject?.location.content} view={false} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {currentProject?.location.numbers.map((loc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedLocation(loc)} // Update selected location on click
                  className={`border ${
                    selectedLocation._id === loc._id ? "border-main" : "border-main/40"
                  } rounded-lg p-6 hover:border-main transition-colors cursor-pointer`}
                >
                  <div className="flex flex-col  items-center justify-center text-center">
                    <div className="text-3xl  text-main font-bold mb-1 special-font">
                      {loc.number} <span className="poppins">{loc.prefix}</span>
                    </div>
                    <div className="text-sm text-gray-400">{loc.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.video
              key={selectedLocation?.video} // Force re-render on video change
              src={`${BACKEND_API}/${selectedLocation?.video}`}
              autoPlay
              muted
              loop
              className="rounded-lg w-full h-full max-h-80 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Location;
