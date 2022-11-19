"use client";
import { useContext, useState } from "react";
import Navigation from "./components/Navigation";
import SentenceBuilder from "./components/Application/SentenceBuilder";
import TileGrid from "./components/Application/TileGrid";
import Dashboard from "./components/Dashboard/Dashboard";
import { userContext } from "./ApplicationContext";

function Application() {
  const [appMode, setAppMode] = useState("dashboard");
  const user = useContext(userContext);

  return (
    <userContext.Provider value={user}>
      <main className="h-screen bg-gray-900 text-gray-50 flex flex-col">
        {["edit", "home"].includes(appMode) && (
          <>
            <SentenceBuilder />
            <TileGrid />
          </>
        )}
        {["dashboard"].includes(appMode) && <Dashboard />}
        <Navigation appMode={appMode} setAppMode={setAppMode} />
      </main>
    </userContext.Provider>
  );
}

export default Application;
