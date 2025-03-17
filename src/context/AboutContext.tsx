"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_API } from "@/constants";

type AboutData = {
  _id: string;
  type: string;
  title: string;
  content: string;
  pageTitle?: string;
  background?: string;
}[];

interface AboutContextType {
  data: AboutData | null;
  isLoading: boolean;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const AboutProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_API}/api/about`);
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
    staleTime: 1000 * 60 * 100, // Cache data for 10 minutes
  });
  console.log(data)
  return <AboutContext.Provider value={{ data: data?.data || null, isLoading }}>{children}</AboutContext.Provider>;
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAbout must be used within an AboutProvider");
  }
  return context;
};
