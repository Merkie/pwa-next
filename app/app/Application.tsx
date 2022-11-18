"use client";
import type { User } from "@prisma/client";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import SentenceBuilder from "./components/SentenceBuilder";
import TileGrid from "./components/TileGrid";
import { useStore } from "../../lib/store";
import Dashboard from "./components/Dashboard";

interface ApplicationProps {
  user: User;
}

function Application({ user }: ApplicationProps) {
  const [appMode, setAppMode] = useState("dashboard");

  return (
    <main className="h-screen bg-gray-900 text-gray-50 flex flex-col">
      {["edit", "home"].includes(appMode) && (
        <>
          <SentenceBuilder />
          <TileGrid />
        </>
      )}
      {["dashboard"].includes(appMode) && <Dashboard user={user} />}
      <Navigation appMode={appMode} setAppMode={setAppMode} />
    </main>
  );
}

export default Application;
