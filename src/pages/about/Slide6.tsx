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
  setCurrentSlide: (slide: number) => void;
  currentSlide: number;
}

const Slide6 = ({ selectedCompany, setSelectedCompany, setCurrentSlide, currentSlide }: Slide6Props) => {
  const { data } = useAbout();
  const { setTitle } = useNav();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCompany && data) {
      const companiesData = data.find((d) => d.type === "companies");
      if (companiesData?.companies?.length) {
        setSelectedCompany(companiesData.companies[0]);
      }
    }
  }, [data, selectedCompany, setSelectedCompany]);

  useEffect(() => {
    const companiesData = data?.find((d) => d.type === "companies");
    setTitle(companiesData?.pageTitle || "Our Partners");
  }, [data, setTitle]);

  if (!selectedCompany) return null;

  const handleNext = () => {
    const companiesData = data?.find((d) => d.type === "companies")?.companies || [];
    const currentIndex = companiesData.findIndex((c) => c._id === selectedCompany._id);
    if (companiesData.length > 1) {
      if (currentIndex === companiesData.length - 1) {
        // No more companies, proceed to the next slide or home
        if (data?.length > currentSlide) {
          setSelectedCompany(null); // Reset selected company
          setCurrentSlide(currentSlide + 1); // Move to the next slide
        } else {
          navigate("/"); // Navigate to home if no more slides
        }
      } else {
        // Proceed to the next company in the list
        setSelectedCompany(companiesData[currentIndex + 1]);
      }
    } else {
      navigate("/"); // Navigate to home if there is only one company
    }
  };

  const handlePrev = () => {
    const companiesData = data?.find((d) => d.type === "companies")?.companies || [];
    const currentIndex = companiesData.findIndex((c) => c._id === selectedCompany._id);
    if (currentIndex > 0) {
      // Set the previous company
      setSelectedCompany(companiesData[currentIndex - 1]);
    } else {
      selectedCompany && setSelectedCompany(null); // Reset selected company if at the first company
    }
  };

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
      <MaxWidthWrapper className="text-white gap-8 flex items-center justify-between z-30 relative container mx-auto">
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
        <div className="relative w-full z-50">
          <img
            src={`/Rectangle 3 (5).png`}
            className="object-left w-full h-auto rounded-2xl"
            alt={selectedCompany.title}
          />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="relative mt-auto">
        <div className="z-50 relative w-full">
          <div className="special-font absolute bottom-14 left-0 flex items-center gap-4 z-50">
            <PrevButton onClick={handlePrev} />
            <NextButton onClick={handleNext} />
          </div>
          <HomeButton onClick={() => navigate("/")} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide6;
