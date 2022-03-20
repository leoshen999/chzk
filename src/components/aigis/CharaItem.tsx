import styles from "./CharaItem.module.css";
import clsx from "clsx";
import classes from "../../resources/aigis/classes.json";

const classToType: any = {};
Object.keys(classes).forEach((ct) => {
  // @ts-ignore
  classes[ct].forEach((cl: string) => {
    classToType[cl] = ct;
  });
});

interface Props {
  chara: {
    id: number;
    name: string;
    class: string;
    rarity: number;
    gender: string;
    attributes: Array<string>;
  };
  shows: boolean;
}

export default function CharaItem({ chara, shows }: Props) {
  const type = classToType[chara.class];
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
          type === "melee" && styles.textContainerMelee,
          type === "ranged" && styles.textContainerRanged,
          type === "both" && styles.textContainerBoth
        )}
      >
        <div className={styles.name}>{chara.name}</div>
      </div>
    </a>
  );
}
