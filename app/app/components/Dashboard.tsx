import { User } from "@prisma/client";
import { useState } from "react";
import DashboardNavigation from "./DashboardNavigation";
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
      <div className="flex-1 p-4 flex flex-col "></div>
    </main>
  );
}

export default Dashboard;
