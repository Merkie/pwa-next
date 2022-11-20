"use client";
import { useState, useContext } from "react";
import { userContext } from "../../ApplicationContext";
// Components
import Sidebar from "./Sidebar";
import ProfileBlock from "./ProfileBlock";
import ProjectsBlock from "./ProjectsBlock";

function Dashboard() {
  const [activeDashboardPage, setActiveDashboardPage] = useState("profile");
  const user = useContext(userContext);

  return (
    <main className="flex-1 flex">
      <Sidebar
        activeDashboardPage={activeDashboardPage}
        setActiveDashboardPage={setActiveDashboardPage}
      />
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl p-4 block capitalize sm:hidden">
          {activeDashboardPage}
        </h1>
        {activeDashboardPage === "profile" && (
          <>
            <ProfileBlock />
            <ProjectsBlock projects={user.projects || []} />
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
