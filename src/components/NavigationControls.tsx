"use client";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { HomeButton, NextButton, PrevButton } from "./PrevNextButtons";
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
      } else navigate("/places");
    }
  };
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
        <PrevButton disabled={isPrevDisabled()} onClick={goPrev} />
        <NextButton disabled={isNextDisabled()} onClick={goNext} />
      </div>

      <HomeButton exit={position !== "video" && position !== `defaultPath`} onClick={goHome} />
    </MaxWidthWrapper>
  );
}
