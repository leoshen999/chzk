import terrains from "./terrains.json";
import weapons from "./weapons.json";
import locations from "./locations.json";

const attributedFiltersGroups = [
  {
    id: "terrain",
    name: "地形",
    usesSmallButton: true,
    filters: terrains.map((terrain) => ({
      id: terrain.id,
      name: terrain.name,
      color: terrain.color,
      func: (chara) => chara.terrains.includes(terrain.id),
    })),
  },
  {
    id: "weapon",
    name: "武器",
    usesSmallButton: true,
    filters: weapons.map((weapon) => ({
      id: weapon.id,
      img: "%PUBLIC_URL%/weapon_imgs/" + weapon.id + ".png",
      name: weapon.name,
      color: weapon.color,
      func: (chara) => chara.weapon === weapon.id,
    })),
  },
  {
    id: "rarity",
    name: "レア度",
    usesSmallButton: true,
    filters: [...Array(7).keys()].map((r) => ({
      id: "rarity_" + r,
      name: "★ " + r.toString(),
      color: "#e0815e",
      func: (chara) => chara.rarity === r,
    })),
  },
  {
    id: "location",
    name: "地域",
    usesSmallButton: true,
    filters: locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      color: loc.name,
      func: (chara) => chara.location === loc,
    })),
  },
];

export default attributedFiltersGroups;
