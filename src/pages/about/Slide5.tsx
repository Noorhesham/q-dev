import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";
import { BACKEND_API } from "@/constants";

interface Company {
  _id: string;
  title: string;
  content: string;
  photo: string;
}

interface CompaniesData {
  pageTitle: string;
  background: string;
  content: string;
  companies: Company[];
}

interface Slide5Props {
  data?: CompaniesData;
  setSelectedCompany: (company: Company) => void;
}

const Slide5 = ({ data, setSelectedCompany }: Slide5Props) => {
  const { setTitle, setCompaniesLength } = useNav();
  console.log(data);
  useEffect(() => {
    setTitle(data?.pageTitle || "Our Partners");
    setCompaniesLength(data?.companies);
  }, [data?.pageTitle]);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute h-full left-0 top-0 z-20 w-full bg-main2 mix-blend-multiply"></div>
      <div className="absolute !w-full !h-full inset-0">
        <img
          src={`${BACKEND_API}/${data?.background}`}
          alt="Background Pattern"
          className="object-cover w-full h-full z-10 bg-fixed"
        />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="py-32">
          <div className="flex flex-col gap-4 my-5">
            <h2 className="special-font text-5xl text-cream text-center">{data?.pageTitle || "Our Partners"}</h2>
            <div className="text-center" dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
          </div>
          <div className="grid mt-20 grid-cols-4 gap-8">
            {data?.companies?.map((company, index) => (
              <motion.div
                onClick={() => setSelectedCompany(company)}
                className="cursor-pointer"
                key={company._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <img src={`${BACKEND_API}/${company.photo}`} alt={company.title} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide5;
