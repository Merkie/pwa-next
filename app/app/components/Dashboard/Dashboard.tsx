"use client";
import { useState, useContext } from "react";
import { userContext } from "../../ApplicationContext";
// Components
import DashboardNavigation from "./DashboardNavigation";
import DashboardProfilePage from "./DashboardProfilePage";
import DashboardProjects from "./DashboardProjects";

function Dashboard() {
  const [activeDashboardPage, setActiveDashboardPage] = useState("profile");
  const user = useContext(userContext);

  return (
    <main className="flex-1 flex">
      <DashboardNavigation
        activeDashboardPage={activeDashboardPage}
        setActiveDashboardPage={setActiveDashboardPage}
      />
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl p-4 block capitalize sm:hidden">
          {activeDashboardPage}
        </h1>
        {activeDashboardPage === "profile" && (
          <>
            <DashboardProfilePage />
            {/* <DashboardProjects
              projects={[
                { name: "Hello, world!", description: "Hello, world!" },
              ]}
            /> */}
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
