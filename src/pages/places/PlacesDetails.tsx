import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { HomeButton, NextButton, PrevButton } from "@/components/PrevNextButtons";
import { useProject } from "@/context/ProjectContext";
import { useEffect } from "react";
import { BACKEND_API, ImageUrl } from "@/constants";
import { useNav } from "@/context/NavContext";

export default function PlaceDetail() {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { currentPlace, fetchPlaceDetails } = useProject();
  const { setTitle } = useNav();
  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId);
    }
  }, [placeId]);

  useEffect(() => {
    if (currentPlace) setTitle(currentPlace.name);
  }, [currentPlace]);
  if (!currentPlace) return null;
  console.log(currentPlace);
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-main2 mix-blend-multiply z-10"></div>
      <img
        src={`${ImageUrl}/${currentPlace.background}`}
        className="object-cover w-full absolute inset-0 h-full"
        alt=""
      />
      <MaxWidthWrapper className="relative flex justify-center  h-full  z-20 text-white">
        <div className="flex justify-center">
          {" "}
          <div className="flex !h-full flex-col gap-12 mt-20">
            <Header
              title={currentPlace.name}
              desc={currentPlace.description}
              className="gap-10"
              paraClassName="!max-w-full"
              view={false}
            />
            <div className=" absolute bottom-10 w-full     ">
              {" "}
              <div className="">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative w-full mt-auto h-96 rounded-[32px] overflow-hidden"
                >
                  <div className="absolute bottom-10 w-full inset-0">
                    <img
                      src={`${ImageUrl}/${currentPlace.photo}`}
                      alt={currentPlace.name}
                      className="w-full h-full object-center object-contain"
                    />
                  </div>
                </motion.div>
                <div className="z-50 relative mt-auto w-full">
                  <div className="special-font   flex items-center gap-4 z-50">
                    <PrevButton onClick={() => navigate(`/places`)} />
                    <NextButton onClick={() => navigate(`/${placeId}/projects`)} />
                  </div>
                  <HomeButton onClick={() => navigate("/")} />
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
