"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API } from "@/constants";

export default function MasterPlan({}) {
  const [showDetails, setShowDetails] = useState(false);
  const { currentProject } = useProject();

  if (!currentProject) return null;
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-main2">
      {" "}
      <div className="mix-blend-multiply bg-main2 absolute left-0 top-0 z-10 w-full h-full"></div>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <img
          src={`${BACKEND_API}/${currentProject.master_plan.background}`}
          alt="Background Pattern"
          className="object-cover w-full h-full bg-fixed"
        />
      </motion.div>
      <MaxWidthWrapper className="relative z-10">
        <AnimatePresence mode="wait">
          {!showDetails ? (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" grid gap-5 grid-cols-2"
            >
              <Header
                title={`${currentProject.title} Master Plan`}
                desc={`${currentProject.master_plan.content}`}
                view={false}
                col
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="aspect-[2/1] rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => setShowDetails(true)}
              >
                <img
                  src={`${BACKEND_API}/${currentProject.master_plan.photo}`}
                  alt="Master Plan"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 space-y-12"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex items-center gap-2 text-white hover:text-cream/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {/* <h1 className="text-2xl text-white">Floor Plans</h1> */}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="overflow-y-scroll max-h-96 flex flex-col  w-full gap-3 items-start">
                  {currentProject.master_plan.plans.map((plan) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4  w-full"
                    >
                      <div className=" h-64 w-full rounded-3xl overflow-hidden bg-white/10">
                        <img
                          src={`${BACKEND_API}/${plan}`}
                          alt="First Floor Plan"
                          className="w-full h-full  object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>{" "}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className=" h-96 w-full rounded-3xl overflow-hidden"
                >
                  <img src="/Rectangle 8 (1).png" alt="Property View" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </div>
  );
}
