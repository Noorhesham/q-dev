import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCustom } from "@/components/ButtonCustom";

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
        <div className="  z-50 w-full  -bottom-20 left-0   absolute">
          <div className="  special-font flex items-center gap-4 z-50">
            {" "}
            <ButtonCustom variant="outline" onClick={() => navigate(`/places`)} className="backdrop-blur-sm">
              <div className=" bg-main text-black  p-1 rounded-full mx-2">
                <ArrowLeft className="h-4 w-4    " />
              </div>
              Prev{" "}
            </ButtonCustom>
            <ButtonCustom
              variant="outline"
              onClick={() => navigate(`/${params.placeId}/projects`)}
              className="backdrop-blur-sm hover:text-white bg-main text-main2 font-semibold special-font"
            >
              Next{" "}
              <div className="bg-main2 text-main  p-1 rounded-full mx-2">
                <ArrowRight className="h-4 w-4    " />
              </div>
            </ButtonCustom>
          </div>{" "}
          <Button
            onClick={() => navigate("/")}
            variant="default"
            size="lg"
            className="fixed !px-4  !py-6 cursor-pointer hover:bg-white hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
          >
            <Home className="h-8 w-8" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
