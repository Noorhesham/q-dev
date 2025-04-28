import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { useNav } from "@/context/NavContext";
import { BACKEND_API, ImageUrl } from "@/constants";

const Counter = ({ value, prefix }: { value: number; prefix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return (
    <div className="flex gap-2 items-center s">
      <motion.span>{rounded}</motion.span>
      <span className="!text-xs flex flex-col special-font">
        {prefix?.split("<br/>").map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </span>
    </div>
  );
};

const Slide1 = ({
  data,
}: {
  data: {
    pageTitle: string;
    title: string;
    content: string;
    background: string;
    numbers: [{ _id: number; prefix: string; number: number; description: string }];
  };
}) => {
  console.log(data);
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle(data.pageTitle || "About Us");
  }, [data]);
  return (
    <div className="relative poppins min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <img src={`${ImageUrl}/${data.background}`} className="object-cover w-full absolute inset-0 h-full" alt="" />

      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="max-w-3xl py-32">
          <h1 className="special-font text-6xl text-cream mb-8">{data.title}</h1>

          <div className="space-y-4 text-sm font-normal text-cream/80">
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">
            {data?.numbers?.map((item) => (
              <div key={item._id} className="text-cream">
                <div className="special-font text-5xl mb-2">
                  <Counter prefix={item.prefix} value={item.number} />
                </div>
                <div className="text-sm opacity-80 uppercase leading-tight text-white">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide1;
