import terrains from "./terrains.json";
import weapons from "./weapons.json";
import locations from "./locations.json";

const filtersGroups = [
  {
    id: "terrain",
    filters: terrains.map((terrain) => ({
      id: terrain.id,
      name: terrain.name,
      color: terrain.color,
      usesSmallButton: true,
      func: (chara: any) => chara.terrains.includes(terrain.id),
    })),
  },
  {
    id: "weapon",
    filters: weapons.map((weapon) => ({
      id: weapon.id,
      img:
        process.env.PUBLIC_URL + "/oshirore/weapons/" + weapon.id + ".png",
      name: weapon.name,
      color: weapon.color,
      usesSmallButton: true,
      func: (chara: any) => chara.weapon === weapon.id,
    })),
  },
  {
    id: "rarity",
    filters: [...Array(7).keys()]
      .map((r) => r + 1)
      .map((r) => ({
        id: "rarity_" + r,
        name: "★ " + r.toString(),
        color: "#af5f00",
        usesSmallButton: true,
        func: (chara: any) => chara.rarity === r,
      })),
  },
  {
    id: "location",
    filters: locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      color: loc.color,
      usesSmallButton: true,
      func: (chara: any) => chara.location === loc.id,
    })),
  },
];

export default filtersGroups;
