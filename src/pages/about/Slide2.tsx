"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import ItemCardGrid from "@/components/ItemCardGrid";
import { useEffect } from "react";
import { useNav } from "@/context/NavContext";
import { BACKEND_API } from "@/constants";

const Slide2 = ({ data }: { data?: any }) => {
  console.log(data);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Mission , Vision & Values");
  }, []);
  return (
    <div className="relative min-h-screen  ">
      <div className="absolute h-full left-0 top-0 z-20 w-full bg-main2 mix-blend-multiply"></div>
      <div className="absolute inset-0  ">
        <img src={`${BACKEND_API}/${data.background}`} className="object-cover w-full absolute inset-0 h-full" alt="" />
      </div>

      <MaxWidthWrapper className="relative  pt-20 z-40">
        <motion.div className=" flex flex-col gap-4" variants={container} initial="hidden" animate="show">
          {data.items.map((InnerItem, i) => (
            <div>
              <ItemCardGrid
                reverse={i % 2 === 0}
                item={item}
                desc={InnerItem.description}
                image={i === data.items.length - 1 ? "/our-values.webp" : `${BACKEND_API}/${InnerItem.photo}`}
                title={InnerItem.title}
              />
            </div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide2;
