import terrains from "./terrains.json";
import weapons from "./weapons.json";

const weaponIdToIndex: any = {};
weapons.forEach((wp, idx) => {
  weaponIdToIndex[wp.id] = idx;
});
const terrainIdToIndex: any = {};
terrains.forEach((tr, idx) => {
  terrainIdToIndex[tr.id] = idx;
});

function idIndexer(c: any) {
  return c.id;
}

function terrainIndexer(c: any) {
  return c.terrains.length > 0 ? terrainIdToIndex[c.terrains[0]] : 999999999;
}

function weaponIndexer(c: any) {
  return weaponIdToIndex[c.weapon];
}

function rarityIndexer(c: any) {
  return c.rarity;
}

function createCompareFunc(indexer: (c: any) => number, multiplier: number) {
  return function cmp(c1: any, c2: any) {
    const i1 = indexer(c1);
    const i2 = indexer(c2);
    return i1 !== i2 ? multiplier * (i1 - i2) : c1.id - c2.id;
  };
}

const sorters = [
  {
    id: "id_asc",
    name: "No.▲",
    color: "#005faf",
    usesSmallButton: true,
    func: createCompareFunc(idIndexer, 1),
  },
  {
    id: "id_desc",
    name: "No.▼",
    color: "#005faf",
    usesSmallButton: true,
    func: createCompareFunc(idIndexer, -1),
  },
  {
    id: "terrain_asc",
    name: "地形▲",
    color: "#00875f",
    usesSmallButton: true,
    func: createCompareFunc(terrainIndexer, 1),
  },
  {
    id: "terrain_desc",
    name: "地形▼",
    color: "#00875f",
    usesSmallButton: true,
    func: createCompareFunc(terrainIndexer, -1),
  },
  {
    id: "weapon_asc",
    name: "武器▲",
    color: "#af0000",
    usesSmallButton: true,
    func: createCompareFunc(weaponIndexer, 1),
  },
  {
    id: "weapon_desc",
    name: "武器▼",
    color: "#af0000",
    usesSmallButton: true,
    func: createCompareFunc(weaponIndexer, -1),
  },
  {
    id: "rarity_asc",
    name: "★▲",
    color: "#af5f00",
    usesSmallButton: true,
    func: createCompareFunc(rarityIndexer, 1),
  },
  {
    id: "rarity_desc",
    name: "★▼",
    color: "#af5f00",
    usesSmallButton: true,
    func: createCompareFunc(rarityIndexer, -1),
  },
];

export default sorters;
