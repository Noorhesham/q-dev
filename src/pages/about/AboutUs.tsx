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
import { useAbout } from "@/context/AboutContext";

interface Company {
  _id: string;
  title: string;
  content: string;
  photo: string;
}

const slides = [
  { id: "special_numbers", component: Slide1 },
  { id: "multi_stuff", component: Slide2 },
  { id: "ceo", component: Slide3 },
  { id: "board_members", component: Slide4 },
  { id: "certificates", component: Slide7 },
  { id: "companies", component: Slide5 },
  { id: "companies_details", component: Slide6 },
];

const AboutUs = () => {
  const { data, isLoading } = useAbout();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const navigate = useNavigate();

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setCurrentSlide(6); // Move to Slide6
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className={cn("relative overflow-hidden h-screen", currentSlide !== 5 && "bg-main2")}>
      <div className="mix-blend-multiply absolute left-0 top-0 z-30 w-96">
        <AnimatedSvgQ />
      </div>
      {slides.map((slide, index) => (
        <AnimatePresence key={slide.id}>
          {index === currentSlide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {React.createElement(slide.component, {
                data: data.find((item) => item.type === slide.id),
                setSelectedCompany: handleCompanySelect,
                selectedCompany: selectedCompany,
              })}
              <MaxWidthWrapper className="relative mt-auto">
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
    </div>
  );
};

export default AboutUs;
