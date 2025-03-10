import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCustom } from "@/components/ButtonCustom";
import { HomeButton, NextButton, PrevButton } from "@/components/PrevNextButtons";

export default function PlaceDetail() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="relative  min-h-screen  overflow-hidden">
      <div className=" absolute inset-0 w-full h-full bg-main2 z mix-blend-multiply z-10"></div>

      <img src="/Rectangle 3.png" className="object-cover w-full absolute inset-0 h-full" alt="" />
      <MaxWidthWrapper className="relative z-20  text-white  ">
        <div className="flex flex-col gap-12 mt-20">
          <Header className=" gap-10" paraClassName=" !max-w-full" view={false} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative w-full  h-80 rounded-[32px] overflow-hidden"
          >
            <div className="absolute inset-0 ">
              <img src="/Group.png" alt="North Coast Map" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>{" "}
        <div className="  relative mt-auto">
          <div className="z-50 relative w-full">
            <div className="special-font absolute -bottom-20 left-0 flex items-center gap-4 z-50">
              <PrevButton onClick={() => navigate(`/places`)} />
              <NextButton onClick={() => navigate(`/${params.placeId}/projects`)} />
            </div>

            <HomeButton onClick={() => navigate("/")} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
