"use client";
import type { User } from "@prisma/client";
import Navigation from "./components/Navigation";
import styles from "./Application.module.css";

interface ApplicationProps {
  user: User;
}

function Application({ user }: ApplicationProps) {
  return (
    <main className={styles.Application}>
      <Navigation />
    </main>
  );
}

export default Application;
