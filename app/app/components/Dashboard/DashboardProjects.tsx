import { Project } from "@prisma/client";

interface DashboardProjectsProps {
  projects: Project[];
}

function DashboardProjects({ projects }: DashboardProjectsProps) {
  return (
    <div className="w-full grid grid-cols-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-gray-600 p-4 border-x-0 border-t-0"
        >
          <h1 className="text-2xl">{project.name}</h1>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardProjects;
