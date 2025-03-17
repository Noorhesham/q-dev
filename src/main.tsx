import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import NavBar from "./components/NavBar.tsx";
import { AnimatedRoutes } from "./components/AnimatedRoutes.tsx";
import { NavProvider } from "./context/NavContext.tsx";
import { AboutProvider } from "./context/AboutContext.tsx";
import { ProjectProvider } from "./context/ProjectContext.tsx";

// Initialize TanStack Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AboutProvider>
        <ProjectProvider>
          <BrowserRouter>
            <NavProvider>
              <NavBar />
              <AnimatedRoutes />
            </NavProvider>
          </BrowserRouter>
        </ProjectProvider>
      </AboutProvider>
    </QueryClientProvider>
  </StrictMode>
);
