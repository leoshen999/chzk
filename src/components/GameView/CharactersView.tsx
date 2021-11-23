import { ReactNode } from "react";
import styles from "./CharactersView.module.css";

export default function CharactersView({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
