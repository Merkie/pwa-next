import { User } from "@prisma/client";
import { useState } from "react";
import DashboardNavigation from "./DashboardNavigation";
import DashboardProfilePage from "./DashboardProfilePage";
interface DashboardProps {
  user: User;
}

function Dashboard({ user }: DashboardProps) {
  const [activeDashboardPage, setActiveDashboardPage] = useState("profile");
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
          <DashboardProfilePage user={user} />
        )}
      </div>
    </main>
  );
}

export default Dashboard;
