import styles from "./ShiroCharaItem.module.css";
import clsx from "clsx";
import weapons from "../resources/oshirore/weapons.json";

let weaponIdToTypeMapping: any = {};
weapons.forEach((wp) => {
  weaponIdToTypeMapping[wp.id] = wp.type;
});

function paddingStr(num: number, size: number) {
  var s = "000000000" + num.toString();
  return s.substr(s.length - size);
}

interface Props {
  chara: {
    id: number;
    name: string;
    rarity: number;
    terrains: Array<string>;
    location: string;
    weapon: string;
  };
}

export default function ShiroCharaItem({ chara }: Props) {
  let type = "other";
  if (chara.weapon in weaponIdToTypeMapping)
    type = weaponIdToTypeMapping[chara.weapon];

  const idStr = paddingStr(chara.id, 4);

  return (
    <a
      className={styles.container}
      href={"https://scre.swiki.jp/index.php?" + chara.name}
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        className={styles.icon}
        src={process.env.PUBLIC_URL + "/oshirore_imgs/" + idStr + ".png"}
        alt={chara.name}
      />
      <div
        className={clsx(
          styles.textContainer,
          type === "melee" && styles.textContainerMelee,
          type === "ranged" && styles.textContainerRanged,
          type === "both" && styles.textContainerBoth,
          type === "other" && styles.textContainerOther
        )}
      >
        <div className={styles.id}>{idStr}</div>
        <div className={styles.name}>{chara.name}</div>
      </div>
    </a>
  );
}
