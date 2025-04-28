"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import ModelCustom from "@/components/ModelCustom";
import { Switch } from "@/components/ui/switch";
import { useProject } from "@/context/ProjectContext";
import { ImageUrl } from "@/constants";

const lightImages = [
  { id: 1, thumbnail: "/Rectangle 3 (1).png" },
  { id: 2, thumbnail: "/Rectangle 3 (2).png" },
  { id: 3, thumbnail: "/Rectangle 3 (3).png" },
  { id: 4, thumbnail: "/Rectangle 3 (5).png" },
];

const darkImages = [
  { id: 1, thumbnail: "/Rectangle 3 (7).png" },
  { id: 2, thumbnail: "/Rectangle 3 (8).png" },
  { id: 3, thumbnail: "/Rectangle 5 (2).png" },
  { id: 4, thumbnail: "/Rectangle 3 (1).png.png" },
];

export default function Images() {
  const [isLightMode, setIsLightMode] = useState(true);
  const { currentProject } = useProject();
  const images = isLightMode ? currentProject?.lightImages : currentProject?.darkImages;
  return (
    <div className="relative min-h-screen ">
      {" "}
      <div className="mix-blend-multiply bg-main2 absolute left-0 top-0 z-10 w-full h-full"></div>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img src="/Rectangle 3 (4).png" alt="Background Pattern" className="object-cover w-full h-full bg-fixed" />
      </motion.div>
      <MaxWidthWrapper className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-16 flex flex-col">
          <div className="self-center mx-auto my-5 w-fit flex flex-col items-center text-center">
            <Header title={`${currentProject?.title} Renders`} className="items-center !mx-auto text-center" col />
          </div>
          <div className="  z-10 flex special-font2 items-center mx-auto space-x-4">
            <span className="text-white">Light Renders</span>
            <Switch checked={!isLightMode} onCheckedChange={() => setIsLightMode(!isLightMode)} />
            <span className="text-white">Dark Renders</span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              autoplay={{ delay: 1000 }}
              navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
              className="w-full mt-6"
            >
              {images.map((image) => (
                <SwiperSlide key={image}>
                  <ModelCustom
                    btn={
                      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden group cursor-pointer">
                        <img
                          src={`${ImageUrl}/${image}` || "/placeholder.svg"}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      </div>
                    }
                    content={
                      <div className="  w-screen h-screen">
                        <img
                          src={`${ImageUrl}/${image}` || "/placeholder.svg"}
                          className="w-full h-full absolute inset-0 object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
