import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5"; // companies list
import Slide6 from "./Slide6"; // company details
import Slide7 from "./Slide7";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { HomeButton, NextButton, PrevButton } from "@/components/PrevNextButtons";
import { useAbout } from "@/context/AboutContext";

// Slide component mapping
const slideComponents = {
  special_numbers: Slide1,
  multi_stuff: Slide2,
  ceo: Slide3,
  board_members: Slide4,
  certificates: Slide7,
  companies: Slide5,
  companies_details: Slide6,
};

// Reorder data to group duplicates
const reorderData = (data) => {
  const typeMap = {};
  data.forEach((item) => {
    if (!typeMap[item.type]) {
      typeMap[item.type] = [];
    }
    typeMap[item.type].push(item);
  });

  const reorderedData = [];
  const addedTypes = new Set();
  data.forEach((item) => {
    if (!addedTypes.has(item.type)) {
      reorderedData.push(...typeMap[item.type]);
      addedTypes.add(item.type);
    }
  });

  return reorderedData;
};

// Create sequence including company details
const createSequence = (reorderedData) => {
  const companiesIndex = reorderedData.findIndex((item) => item.type === "companies");
  const companies = companiesIndex !== -1 ? reorderedData[companiesIndex].companies : [];

  const sequence = [
    ...reorderedData.slice(0, companiesIndex + 1),
    ...companies.map((company) => ({ type: "companies_details", data: company })),
    ...reorderedData.slice(companiesIndex + 1),
  ];

  return sequence;
};

const AboutUs = () => {
  const { data, isLoading } = useAbout();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available.</p>;

  // Reorder data and create sequence
  const reorderedData = reorderData(data);
  const sequence = createSequence(reorderedData);

  const nextSlide = () => {
    if (currentSlide === sequence.length - 1) {
      navigate("/");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const currentItem = sequence[currentSlide];
  const CurrentSlideComponent = slideComponents[currentItem.type];

  if (!CurrentSlideComponent) {
    return <p>Unsupported slide type: {currentItem.type}</p>;
  }

  return (
    <div className={cn("relative overflow-hidden h-screen", currentItem.type !== "companies" && "bg-main2")}>
      <div className="mix-blend-multiply absolute left-0 top-0 z-30 w-96">
        <AnimatedSvgQ />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem._id || currentItem.data?.id || currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute overflow-y-scroll inset-0"
        >
    <CurrentSlideComponent
            data={currentItem.type === "companies_details" ? currentItem.data : currentItem}
            companies={currentItem.type === "companies" ? currentItem.companies : undefined}
            setCurrentSlide={setCurrentSlide}
            detailsStartIndex={currentItem.type === "companies" ? currentSlide + 1 : undefined}
          />

          <MaxWidthWrapper className="fixed z-50 left-10 mt-auto">
            <div className="z-50 relative w-full">
              <div className="special-font absolute bottom-14 left-0 flex items-center gap-4 z-50">
                <PrevButton disabled={currentSlide === 0} onClick={prevSlide} />
                <NextButton onClick={nextSlide} />
              </div>
              <HomeButton onClick={() => navigate("/")} />
            </div>
          </MaxWidthWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AboutUs;