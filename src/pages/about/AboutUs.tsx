"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5";
import Slide6 from "./Slide6";
import Slide7 from "./Slide7";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { HomeButton, NextButton, PrevButton } from "@/components/PrevNextButtons";

const slides = [
  { id: 1, component: Slide1 },
  { id: 2, component: Slide2 },
  { id: 3, component: Slide3 },
  { id: 4, component: Slide4 },
  { id: 5, component: Slide5 },
  { id: 6, component: Slide6 },
  { id: 7, component: Slide7 },
];

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const navigate = useNavigate();
  return (
    <div className={cn("relative  overflow-hidden h-screen", currentSlide !== 5 && "bg-main2")}>
      <div className=" mix-blend-multiply absolute left-0 top-0 z-30 w-96">
        <AnimatedSvgQ />
      </div>
      {slides.map((slide, index) => (
        <AnimatePresence initial={false} key={slide.id}>
          {index === currentSlide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {React.createElement(slide.component, { setCurrentSlide, setSelectedLogo, selectedLogo })}{" "}
              <MaxWidthWrapper className="  relative mt-auto">
                <div className="z-50 relative w-full">
                  <div className="special-font absolute bottom-14 left-0 flex items-center gap-4 z-50">
                    <PrevButton disabled={currentSlide === 0} onClick={prevSlide} />
                    <NextButton onClick={() => (currentSlide === slides.length - 1 ? navigate("/") : nextSlide())} />
                  </div>

                  <HomeButton onClick={() => navigate("/")} />
                </div>
              </MaxWidthWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Centralized Navigation */}
    </div>
  );
};

export default AboutUs;
