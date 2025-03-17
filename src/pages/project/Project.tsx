import { useProject } from "@/context/ProjectContext";
import Projects from "./ProjectContainer";

export default function ProjectsPage() {
  const { currentPlace, projects } = useProject();
  return <Projects />;
}
