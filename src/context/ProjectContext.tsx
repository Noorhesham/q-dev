import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_API } from "@/constants";

interface Location {
  content: string;
  numbers: any[];
}

interface Facility {
  title: string;
  photo: string;
  _id: string;
}

interface Facilities {
  content: string;
  facilities: Facility[];
}

interface MasterPlan {
  content: string;
  photo: string;
  plans: string[];
}

interface Project {
  _id: string;
  title: string;
  location: Location;
  facilities: Facilities;
  master_plan: MasterPlan;
  videos: string[];
  darkImages: string[];
  lightImages: string[];
  place: string;
}

interface Place {
  _id: string;
  name: string;
  photo: string;
  description: string;
  background: string;
  id?: string;
}

interface ProjectContextType {
  places: Place[] | null;
  currentPlace: Place | null;
  currentProject: Project | null;
  setCurrentPlace: (place: Place) => void;
  setCurrentProject: (project: Project) => void;
  isLoading: boolean;
  projects: Project[] | null;
  fetchPlaceDetails: (placeId: string) => Promise<void>;
  clearCurrentData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPlace, setCurrentPlace] = useState<Place | null>(() => {
    try {
      const saved = localStorage.getItem("currentPlace");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    try {
      const saved = localStorage.getItem("currentProject");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [projects, setProjects] = useState<Project[] | null>(() => {
    try {
      const saved = localStorage.getItem("projects");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch all places
  const { data: placesData, isLoading: isLoadingPlaces } = useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_API}/api/places`);
      if (!res.ok) throw new Error("Failed to fetch places");
      const data = await res.json();
      return data.data.place;
    },
  });

  // Function to fetch place details and its projects
  const fetchPlaceDetails = async (placeId: string) => {
    setIsLoadingDetails(true);
    try {
      // Clear current data before fetching new data
      setCurrentProject(null);
      localStorage.removeItem("currentProject");

      const res = await fetch(`${BACKEND_API}/api/places/${placeId}`);
      if (!res.ok) throw new Error("Failed to fetch place details");
      const data = await res.json();

      setCurrentPlace(data.data.place);
      setProjects(data.data.projects);

      localStorage.setItem("currentPlace", JSON.stringify(data.data.place));
      localStorage.setItem("projects", JSON.stringify(data.data.projects));
    } catch (error) {
      console.error("Error fetching place details:", error);
      clearCurrentData();
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Clear function to reset state
  const clearCurrentData = () => {
    setCurrentPlace(null);
    setCurrentProject(null);
    setProjects(null);
    localStorage.removeItem("currentPlace");
    localStorage.removeItem("currentProject");
    localStorage.removeItem("projects");
  };

  // Update ProjectContextType to include isLoadingDetails
  const isLoading = isLoadingPlaces || isLoadingDetails;

  return (
    <ProjectContext.Provider
      value={{
        places: placesData || null,
        currentPlace,
        currentProject,
        setCurrentPlace,
        setCurrentProject: (project: Project) => {
          setCurrentProject(project);
          localStorage.setItem("currentProject", JSON.stringify(project));
        },
        isLoading,
        projects,
        fetchPlaceDetails,
        clearCurrentData,
      }}
    >
      {isLoadingPlaces ? null : children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
