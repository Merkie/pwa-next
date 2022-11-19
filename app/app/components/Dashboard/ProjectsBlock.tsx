"use client";
import { Project } from "@prisma/client";
import ProjectCard from "./ProjectCard";

interface DashboardProjectsProps {
  projects: Project[];
}

function DashboardProjects({ projects }: DashboardProjectsProps) {
  return (
    <>
      <h1 className="p-4 pb-0 text-2xl">Your Projects</h1>
      <div className="w-full grid grid-cols-4 gap-4 p-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <button className="h-[150px] w-full border-gray-600 border-2 border-dashed rounded-md">
          <i className="bx bx-plus"></i>
        </button>
      </div>
    </>
  );
}

export default DashboardProjects;
