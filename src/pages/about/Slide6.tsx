import { motion } from "framer-motion";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { useEffect } from "react";
import { useNav } from "@/context/NavContext";
import { BACKEND_API } from "@/constants";
import { useAbout } from "@/context/AboutContext";
import { HomeButton, NextButton, PrevButton } from "@/components/PrevNextButtons";
import { useNavigate } from "react-router-dom";

interface Company {
  _id: string;
  title: string;
  content: string;
  photo: string;
}

interface Slide6Props {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
}

const Slide6 = ({ selectedCompany, setSelectedCompany, setCurrentSlide }: Slide6Props) => {
  const { data } = useAbout();
  const { setTitle, companiesLength } = useNav();

  useEffect(() => {
    // Set initial company if none selected
    if (!selectedCompany && data) {
      const companiesData = data.find((d) => d.type === "companies");
      if (companiesData?.companies?.length) {
        setSelectedCompany(companiesData.companies[0]);
      }
    }
  }, [data, selectedCompany, setSelectedCompany]);

  useEffect(() => {
    // Set page title from about data
    const companiesData = data?.find((d) => d.type === "companies");
    setTitle(companiesData?.pageTitle || "Our Partners");
  }, [data, setTitle]);
  const navigate = useNavigate();

  if (!selectedCompany) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <div className="absolute inset-0">
        <img src="/Rectangle 3 (5).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="py-32 flex max-w-2xl flex-col gap-5 items-start">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={`${BACKEND_API}/${selectedCompany.photo}`}
            className="object-left w-80"
            alt={selectedCompany.title}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="special-font text-5xl text-cream mb-2"
          >
            {selectedCompany.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base"
            dangerouslySetInnerHTML={{ __html: selectedCompany.content }}
          />
        </div>
      </MaxWidthWrapper>{" "}
      <MaxWidthWrapper className="relative mt-auto">
        <div className="z-50 relative w-full">
          <div className="special-font absolute bottom-14 left-0 flex items-center gap-4 z-50">
            <PrevButton onClick={() => setCurrentSlide(5)} />
            <NextButton
              onClick={() => {
                const companiesData = data?.find((d) => d.type === "companies")?.companies || [];
                if (companiesData.length > 1) {
                  const currentIndex = companiesData.findIndex((c) => c._id === selectedCompany._id);
                  if (currentIndex === companiesData.length - 1) {
                    navigate("/"); // Navigate to home if it's the last company
                  } else {
                    setSelectedCompany(companiesData[currentIndex + 1]); // Move to the next company
                  }
                } else {
                  navigate("/");
                }
              }}
            />
          </div>
          <HomeButton onClick={() => navigate("/")} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide6;
