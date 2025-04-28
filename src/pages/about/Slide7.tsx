"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";
import ModelCustom from "@/components/ModelCustom";
import { BACKEND_API, ImageUrl } from "@/constants";

interface CertificatesData {
  _id: string;
  type: string;
  title: string;
  content: string;
  pageTitle: string;
  certificates?: Array<{
    _id: string;
    title: string;
    description: string;
    photo: string;
  }>;
}

const Slide7 = ({ data, setSelectedCompany }: { data?: CertificatesData }) => {
  const { setTitle } = useNav();
  console.log(data);
  useEffect(() => {
    setTitle(data?.pageTitle || "Certificates");
  }, [data?.pageTitle]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-main2 z-20 mix-blend-multiply" />
      <div className="absolute inset-0 w-full h-full bg-white/30 z-10"></div>
      <video src="/pattern v03.mp4" loop autoPlay muted className="absolute inset-0 w-full h-full object-cover" />
      <MaxWidthWrapper className="text-white z-30 relative">
        <div className="pt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto mb-6"
          >
            <h2 className="special-font text-5xl text-cream mb-6">{data?.title || "Certificates"}</h2>
            <div className="text-cream/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.images?.map((cert, index) => (
              <ModelCustom
                key={cert._id}
                btn={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative cursor-pointer aspect-[3/4] bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <img src={`${ImageUrl}/${cert}`} alt={cert} className="object-contain p-4" />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold mb-1">{cert.title}</h3>
                        <p className="text-sm text-cream/80">{cert.description}</p>
                      </div>
                    </div> */}
                  </motion.div>
                }
                content={<img src={`${ImageUrl}/${cert}`} alt={cert} className="object-contain p-4" />}
              />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide7;
