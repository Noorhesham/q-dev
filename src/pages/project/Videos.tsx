"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Header from "@/components/Header";
import ModelCustom from "@/components/ModelCustom";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProject } from "@/context/ProjectContext";
import { BACKEND_API } from "@/constants";

const videos = [
  {
    id: 1,
    thumbnail: "/Rectangle 7 (5).png",
    video: "/video-1.mp4",
  },
  {
    id: 2,
    thumbnail: "/Rectangle 7 (5).png",
    video: "/video-2.mp4",
  },
  {
    id: 3,
    thumbnail: "/Rectangle 7 (5).png",
    video: "/video-3.mp4",
  },
  {
    id: 4,
    thumbnail: "/Rectangle 7 (5).png",
    video: "/video-4.mp4",
  },
];

export default function Videos() {
  const { currentProject } = useProject();
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-16">
          <div className=" self-center mx-auto my-5 w-fit flex flex-col !items-center text-center">
            <Header title={`${currentProject?.title} Videos`} className="items-center !mx-auto text-center" col />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              className="w-full"
            >
              {currentProject.videos.map((video) => (
                <SwiperSlide key={video.id}>
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden group cursor-pointer">
                    <video
                      muted
                      src={`${BACKEND_API}/${video}` || "/placeholder.svg"}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="w-12 h-12 rounded-full bg-main2 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="!max-w-full !h-[90vh] bg-transparent w-full  ">
                          <div className=" w-full  ">
                            <video
                              controls
                              src={`${BACKEND_API}/${video}` || "/placeholder.svg"}
                              className="w-full h-full inset-0   absolute object-cover"
                            ></video>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
