"use client";
import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
}
function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      key={project.id}
      className="bg-gray-800 shadow-sm min-h-[150px] p-2 rounded-md border border-gray-700 hover:bg-gray-700 hover:border-gray-600 cursor-pointer"
    >
      <h1 className="text-2xl">{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;
