import { useEffect, useState } from "react";
import { useStore } from "../../../lib/store";

interface NavigationProps {
  appMode: string;
  setAppMode: (appMode: string) => void;
}

function Navigation({ appMode, setAppMode }: NavigationProps) {
  const NavigationData: Array<{
    name: string;
    icon?: string;
    disabled?: () => boolean;
  }> = [
    {
      name: "home",
    },
    {
      name: "edit",
      icon: "pencil",
      disabled: () => ["dashboard"].includes(appMode),
    },
    {
      name: "dashboard",
      icon: "category",
    },
  ];

  return (
    <main className="p-2 gap-2 bg-gray-800 flex border border-gray-600 border-x-0 border-b-0">
      {NavigationData.map((item) => (
        <button
          className={`flex-1 capitalize rounded-md p-2 text-xl border ${
            appMode === item.name
              ? "bg-blue-600 border-blue-500"
              : "bg-gray-700 border-gray-600"
          }`}
          onClick={() => setAppMode(item.name)}
          key={item.name}
          disabled={item.disabled ? item.disabled() : false}
        >
          <i
            className={`bx bx${appMode === item.name ? "s" : ""}-${
              item.icon || item.name
            }`}
          />{" "}
          <span className="hidden sm:inline">{item.name}</span>
        </button>
      ))}
    </main>
  );
}

export default Navigation;
