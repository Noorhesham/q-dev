"use client";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ButtonCustom } from "@/components/ButtonCustom";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
//page name
const projectTabs = ["about", "location", "facilities", "masterplan", "videos", "images"];

export function NavigationControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const { placeId, projectId } = useParams();

  // Determine current position in navigation flow
  const getCurrentPosition = () => {
    const path = location.pathname;
    if (path === "/places") return "places";
    if (path === `/${placeId}`) return "placeDetails";
    if (path === `/${placeId}/projects`) return "projects";
    if (path === `/${placeId}/${projectId}/video`) return "video";
    if (path === `/${placeId}/${projectId}`) return "defaultPath";
    if (path.includes(`/${placeId}/${projectId}`)) {
      const currentTab = projectTabs.find((tab) => path.endsWith(tab));
      return currentTab || ""; // Default to "about" instead of "location"
    }
    return "places";
  };

  const position = getCurrentPosition();
  // Navigation logic
  const video = true;

  const goNext = () => {
    if (position === "places") {
      navigate(`/${placeId}`);
    } else if (position === "placeDetails") {
      navigate(`/${placeId}/projects`);
    } else if (position === "projects") {
      navigate(`/${placeId}/${projectId}/about`); // Changed to navigate to "about" first
    }
    if (position === "video") navigate(`/${placeId}/${projectId}`);
    else {
      const currentTabIndex = projectTabs.indexOf(position);
      if (currentTabIndex < projectTabs.length - 1) {
        navigate(`/${placeId}/${projectId}/${projectTabs[currentTabIndex + 1]}`);
      }
      else navigate('/places')
    }
  };
  const params = useParams();
  console.log(position);
  const goPrev = () => {
    if (position === "projects") {
      navigate(`/${placeId}`);
    } else if (position === "about") {
      navigate(`/${placeId}/${projectId}`);
    } else if (position === "placeDetails") {
      navigate("/places");
    }
    if (position === "video") navigate(`/${placeId}/projects`);
    else {
      const currentTabIndex = projectTabs.indexOf(position);
      console.log(currentTabIndex);
      if (currentTabIndex > 0) {
        navigate(`/${placeId}/${projectId}/${projectTabs[currentTabIndex - 1]}`);
      } else {
        video ? navigate(`/${placeId}/${projectId}/video`) : navigate(`/${placeId}/projects`);
      }
    }
  };
  const islast = projectTabs.indexOf(position) === projectTabs.length - 1;
  const goHome = () => {
    if (islast) navigate(`/${placeId}/projects`);
    if (position === "video" || position === "defaultPath") navigate("/");
    else navigate(`/${placeId}/${projectId}`);
  };

  // Determine if buttons should be disabled
  const isNextDisabled = () => {
    if (position === "places" && !placeId) return true;
    return false;
  };

  const isPrevDisabled = () => {
    return position === "places";
  };

  return (
    <MaxWidthWrapper className="z-50 w-full bottom-0 left-28 absolute">
      <div className="special-font flex items-center gap-4 z-50">
        <ButtonCustom
          variant="outline"
          onClick={goPrev}
          disabled={isPrevDisabled()}
          className="backdrop-blur-sm uppercase !py-5 !px-4  "
        >
          {" "}
          <div className=" bg-main text-black  p-1 rounded-full mx-2">
            <ArrowLeft className="h-4 w-4    " />
          </div>
          Prev
        </ButtonCustom>
        <ButtonCustom
          variant="outline"
          onClick={goNext}
          disabled={isNextDisabled()}
          className="backdrop-blur-sm hover:text-white uppercase  !py-5 !px-4  bg-main text-main2 font-semibold special-font"
        >
          Next{" "}
          <div className="bg-main2 text-main  p-1 rounded-full mx-2">
            <ArrowRight className="h-4 w-4    " />
          </div>
        </ButtonCustom>
      </div>

      <Button
        onClick={goHome}
        variant="default"
        size="lg"
        className="fixed !px-4 !py-6 cursor-pointer  hover:bg-main2/40 hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
      >
        {position !== "video" && position !== `defaultPath` ? (
          <img src="/icon.svg" className=" h-5 w-5 object-contain" />
        ) : (
          <Home className="h-10 w-10" />
        )}
      </Button>
    </MaxWidthWrapper>
  );
}
