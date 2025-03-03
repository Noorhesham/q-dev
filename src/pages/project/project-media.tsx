"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import ModelCustom from "@/components/ModelCustom";

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
  const [activeTab, setActiveTab] = useState("light");

  return (
    <div className="relative min-h-screen bg-main2">
      <MaxWidthWrapper className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-16">
          <div className="self-center mx-auto my-5 w-fit flex flex-col items-center text-center">
            <Header className="items-center text-center" col view={false}>
              <div className="flex gap-4 mt-6">
                <Button
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md ${
                    activeTab === "light"
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("light")}
                >
                  Light Images
                </Button>
                <Button
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md ${
                    activeTab === "dark"
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("dark")}
                >
                  Dark Images
                </Button>
              </div>
            </Header>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
              className="w-full mt-6"
            >
              {(activeTab === "light" ? lightImages : darkImages).map((image) => (
                <SwiperSlide key={image.id}>
                  <ModelCustom
                    btn={
                      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden group cursor-pointer">
                        <img
                          src={image.thumbnail || "/placeholder.svg"}
                          alt={`Image ${image.id}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      </div>
                    }
                    content={
                      <div className="  w-screen h-screen">
                        <img
                          src={image.thumbnail || "/placeholder.svg"}
                          alt={`Image ${image.id}`}
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
