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

interface Company {
  id: string;
  title: string;
  content: string;
  photo: string;
}

// Hardcoded companies
const companies: Company[] = [
  { id: "1", title: "Company A", content: "Details about Company A", photo: "/images/companyA.jpg" },
  { id: "2", title: "Company B", content: "Details about Company B", photo: "/images/companyB.jpg" },
  { id: "3", title: "Company C", content: "Details about Company C", photo: "/images/companyC.jpg" },
];

// Mapping type to Slide component
const slideComponents: Record<string, React.ComponentType<any>> = {
  special_numbers: Slide1,
  multi_stuff: Slide2,
  ceo: Slide3,
  board_members: Slide4,
  certificates: Slide7,
  companies: Slide5,
  companies_details: Slide6,
};

const AboutUs = () => {
  const { data, isLoading } = useAbout();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide === data.length - 1) {
      navigate("/");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available.</p>;

  const currentItem = currentSlide === -1 ? null : data[currentSlide];
  const CurrentSlideComponent = selectedCompany
    ? slideComponents["companies_details"]
    : slideComponents[currentItem.type];

  if (!CurrentSlideComponent) {
    return <p>Unsupported slide type: {currentItem?.type}</p>;
  }
  console.log(currentSlide);
  return (
    <div className={cn("relative overflow-hidden h-screen", currentItem?.type !== "companies" && "bg-main2")}>
      <div className="mix-blend-multiply absolute left-0 top-0 z-30 w-96">
        <AnimatedSvgQ />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide === -1 ? selectedCompany?.id : currentItem?._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute overflow-y-scroll inset-0"
        >
          <CurrentSlideComponent
            data={currentItem}
            companies={companies} // Pass hardcoded companies to Slide5
            selectedCompany={selectedCompany}
            setSelectedCompany={handleCompanySelect}
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
          />

          {!selectedCompany && (
            <MaxWidthWrapper className="fixed z-50 left-10 mt-auto">
              <div className="z-50 relative w-full">
                <div className="special-font absolute bottom-14 left-0 flex items-center gap-4 z-50">
                  <PrevButton disabled={currentSlide === 0} onClick={prevSlide} />
                  <NextButton onClick={nextSlide} />
                </div>
                <HomeButton onClick={() => navigate("/")} />
              </div>
            </MaxWidthWrapper>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AboutUs;
