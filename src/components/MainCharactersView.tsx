import { ReactNode } from "react";
import styles from "./MainCharactersView.module.css";

export default function MainCharactersView({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
