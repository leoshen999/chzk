import attributes from "./attributes.json";
import seasons from "./seasons.json";

const rarities = [
  {
    id: "black",
    name: "ブラック",
    color: "#080808",
  },
  {
    id: "platinum",
    name: "プラチナ",
    color: "#8787af",
  },
  {
    id: "sapphire",
    name: "サファイア",
    color: "#000087",
  },
  {
    id: "gold",
    name: "ゴールド",
    color: "#875f00",
  },
  {
    id: "silver",
    name: "シルバー",
    color: "#6c6c6c",
  },
  {
    id: "bronze",
    name: "ブロンズ",
    color: "#af0000",
  },
  {
    id: "iron",
    name: "アイアン",
    color: "#303030",
  },
];

const types = [
  {
    id: "melee",
    name: "近距離",
    color: "#5f0000",
  },
  {
    id: "ranged",
    name: "遠距離",
    color: "#875f00",
  },
  {
    id: "both",
    name: "遠近距離",
    color: "#00005f",
  },
];

const genders = [
  {
    id: "male",
    name: "男性",
    color: "#5f5faf",
  },
  {
    id: "female",
    name: "女性",
    color: "#875f5f",
  },
];

const filterGroups = [
  {
    id: "rarity",
    filters: rarities.map((r) => ({
      id: r.id,
      name: r.name,
      color: r.color,
      func: (chara: any) => chara.rarity === r.id,
    })),
  },
  {
    id: "type",
    filters: types.map((t) => ({
      id: t.id,
      name: t.name,
      color: t.color,
      func: (chara: any) => chara.type === t.id,
    })),
  },
  {
    id: "gender",
    filters: genders.map((g) => ({
      id: g.id,
      name: g.name,
      color: g.color,
      func: (chara: any) => chara.gender === g.id,
    })),
  },
  {
    id: "attribute",
    filters: attributes.map((a, idx) => ({
      id: "attr_" + idx.toString(),
      name: a,
      color: "#6c6c6c",
      func: (chara: any) => chara.attributes.includes(a),
    })),
  },
  {
    id: "season",
    filters: seasons.map((s, idx) => ({
      id: "season_" + idx.toString(),
      name: s,
      color: "#5f875f",
      func: (chara: any) => chara.attributes.includes(s),
    })),
  },
];

export default filterGroups;
