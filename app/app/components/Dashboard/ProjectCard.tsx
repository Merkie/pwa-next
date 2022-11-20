"use client";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { useStore } from "../../../../lib/store";

interface ProjectCardProps {
  project: Project;
}
function ProjectCard({ project }: ProjectCardProps) {
  const [currentProject, setCurrentProject] = useState(null);
  const currentProjectStore = useStore(
    //@ts-ignore
    (state) => state.CurrentProject
  );

  useEffect(() => {
    setCurrentProject(currentProjectStore);
  }, [currentProjectStore]);

  const setCurrentProjectStore = useStore(
    //@ts-ignore
    (state) => state.setCurrentProject
  );

  return (
    <div
      key={project.id}
      className={`bg-gray-800 shadow-sm min-h-[150px] p-2 rounded-md border ${
        currentProject === project.id
          ? "border-blue-500 hover:border-blue-400"
          : "border-gray-700 hover:border-gray-600"
      } hover:bg-gray-700  cursor-pointer`}
      onClick={() => setCurrentProjectStore(project.id)}
    >
      <h1 className="text-2xl">{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;
