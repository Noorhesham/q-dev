"use client";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { HomeButton, NextButton, PrevButton } from "./PrevNextButtons";
import { useProject } from "@/context/ProjectContext";

export function NavigationControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const { placeId, projectId } = useParams();
  const { currentProject } = useProject();

  const getAvailableTabs = () => {
    if (!currentProject) return [];
    const tabs = ["about"];

    if (currentProject.location?.content) tabs.push("location");
    if (currentProject.facilities?.facilities?.length > 0) tabs.push("facilities");
    if (currentProject.master_plan?.plans?.length > 0) tabs.push("masterplan");
    if (currentProject.videos?.length > 0) tabs.push("videos");
    if (currentProject.lightImages?.length > 0 || currentProject.darkImages?.length > 0) tabs.push("images");

    return tabs;
  };

  // Determine current position in navigation flow
  const getCurrentPosition = () => {
    const path = location.pathname;
    if (path === "/places") return "places";
    if (path === `/${placeId}`) return "placeDetails";
    if (path === `/${placeId}/projects`) return "projects";
    if (path === `/${placeId}/${projectId}/video`) return "video";
    if (path === `/${placeId}/${projectId}`) return "defaultPath";

    const availableTabs = getAvailableTabs();
    const currentTab = availableTabs.find((tab) => path.endsWith(tab));
    return currentTab || "defaultPath";
  };

  const position = getCurrentPosition();
  const availableTabs = getAvailableTabs();

  const goNext = () => {
    if (position === "places") {
      navigate(`/${placeId}`);
    } else if (position === "placeDetails") {
      navigate(`/${placeId}/projects`);
    } else if (position === "projects") {
      navigate(`/${placeId}/${projectId}/about`);
    } else if (position === "video") {
      navigate(`/${placeId}/${projectId}`);
    } else {
      const currentTabIndex = availableTabs.indexOf(position);
      if (currentTabIndex < availableTabs.length - 1) {
        navigate(`/${placeId}/${projectId}/${availableTabs[currentTabIndex + 1]}`);
      } else {
        navigate("/places");
      }
    }
  };

  const goPrev = () => {
    if (position === "projects") {
      navigate(`/${placeId}`);
    } else if (position === "placeDetails") {
      navigate("/places");
    } else if (position === "video") {
      navigate(`/${placeId}/projects`);
    } else {
      const currentTabIndex = availableTabs.indexOf(position);
      if (currentTabIndex > 0) {
        navigate(`/${placeId}/${projectId}/${availableTabs[currentTabIndex - 1]}`);
      } else {
        navigate(`/${placeId}/projects`);
      }
    }
  };

  const isLast = availableTabs.indexOf(position) === availableTabs.length - 1;

  const goHome = () => {
    if (isLast) navigate(`/${placeId}/projects`);
    if (position === "video" || position === "defaultPath") navigate("/");
    else navigate(`/${placeId}/${projectId}`);
  };

  return (
    <MaxWidthWrapper className="z-50 w-full bottom-0 left-28 absolute">
      <div className="special-font flex items-center gap-4 z-50">
        <PrevButton onClick={goPrev} />
        <NextButton onClick={goNext} />
      </div>
      <HomeButton exit={position !== "video" && position !== "defaultPath"} onClick={goHome} />
    </MaxWidthWrapper>
  );
}
