import styles from "./Navigation.module.css";
import { useEffect, useState } from "react";
import { useStore } from "../../../lib/store";

function Navigation() {
  const [appMode, setAppMode] = useState("normal");
  const setAppModeStore = useStore((state: any) => state.setAppMode);
  const appModeStore = useStore((state: any) => state.AppMode);

  const NavigationData: Array<{ name: string; icon?: string }> = [
    {
      name: "home",
    },
    {
      name: "edit",
      icon: "pencil",
    },
    {
      name: "dashboard",
      icon: "category",
    },
  ];

  useEffect(() => {
    setAppMode(appModeStore);
  }, [appModeStore]);

  return (
    <main className={styles.Navigation}>
      {NavigationData.map((item) => (
        <button
          onClick={() => setAppModeStore(item.name)}
          className={appMode === item.name ? styles.selected : ""}
          key={item.name}
        >
          <i
            className={`bx bx${appMode === item.name ? "s" : ""}-${
              item.icon || item.name
            }`}
          />{" "}
          {item.name}
        </button>
      ))}
    </main>
  );
}

export default Navigation;
