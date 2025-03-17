"use client";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import SpcialButton from "./SpcialButton";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { useProject } from "@/context/ProjectContext";

const getAvailableTabs = (currentProject: any) => {
  const tabs = [];
  if (currentProject?.about?.content) {
    tabs.push({ id: "about", label: "About" });
  }
  // Always show About tab

  // Add Location if content exists
  if (currentProject?.location?.content) {
    tabs.push({ id: "location", label: "Location" });
  }

  // Add Facilities if facilities array exists and not empty
  if (currentProject?.facilities?.facilities?.length > 0) {
    tabs.push({ id: "facilities", label: "Facilities" });
  }

  // Add Master Plan if plans array exists and not empty
  if (currentProject?.master_plan?.plans?.length > 0) {
    tabs.push({ id: "masterplan", label: "Master Plan" });
  }

  // Add Videos if videos array exists and not empty
  if (currentProject?.videos?.length > 0) {
    tabs.push({ id: "videos", label: "Videos" });
  }

  // Add Images if either lightImages or darkImages exist
  if (currentProject?.lightImages?.length > 0 || currentProject?.darkImages?.length > 0) {
    tabs.push({ id: "images", label: "Images" });
  }

  return tabs;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Start = () => {
  const { placeId, projectId } = useParams();
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const availableTabs = getAvailableTabs(currentProject);
  const firstRow = availableTabs.slice(0, 4);
  const secondRow = availableTabs.slice(4);
  console.log(availableTabs, currentProject);
  return (
    <div className="min-h-screen flex justify-center flex-col bg-main2">
      <MaxWidthWrapper className="relative z-10 flex items-center flex-col gap-8">
        <motion.img
          layoutId="shared-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/logocol.svg"
          className="w-72"
          alt="Q Developments"
        />
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
          {firstRow.length > 0 && (
            <div className={`gap-5 mt-5 grid mx-auto grid-cols-${firstRow.length}`}>
              {firstRow.map((tab) => (
                <motion.div key={tab.id} variants={item}>
                  <Link to={`/${placeId}/${projectId}/${tab.id}`}>
                    <SpcialButton className="!text-base !font-bold special-font">{tab.label}</SpcialButton>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          {secondRow.length > 0 && (
            <div className={`gap-5 mt-5 grid mx-auto grid-cols-${secondRow.length}`}>
              {secondRow.map((tab) => (
                <motion.div key={tab.id} variants={item}>
                  <Link to={`/${placeId}/${projectId}/${tab.id}`}>
                    <SpcialButton className="!text-base !font-bold special-font">{tab.label}</SpcialButton>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Start;
