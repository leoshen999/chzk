import styles from "./CharaItem.module.css";
import clsx from "clsx";

interface Props {
  chara: {
    id: number;
    name: string;
    class: string;
    rarity: number;
    type: string;
    gender: string;
    attributes: Array<string>;
  };
  shows: boolean;
}

export default function CharaItem({ chara, shows }: Props) {
  return (
    <a
      className={clsx(styles.container, !shows && styles.containerHidden)}
      href={"https://wikiwiki.jp/aigiszuki/" + chara.name}
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        className={styles.icon}
        src={process.env.PUBLIC_URL + "/aigis/ch/" + chara.name + ".png"}
        alt={chara.name}
        loading="lazy"
      />
      <div
        className={clsx(
          styles.textContainer,
          chara.type === "melee" && styles.textContainerMelee,
          chara.type === "ranged" && styles.textContainerRanged,
          chara.type === "both" && styles.textContainerBoth
        )}
      >
        <div className={styles.name}>{chara.name}</div>
      </div>
    </a>
  );
}
