import terrains from "./terrains.json";
import weapons from "./weapons.json";

const weaponIdToIndex = {};
weapons.forEach((wp, idx) => {
  weaponIdToIndex[wp.id] = idx;
});
const terrainIdToIndex = {};
terrains.forEach((tr, idx) => {
  terrainIdToIndex[tr.id] = idx;
});

function idIndexer(c) {
  return c.id;
}

function terrainIndexer(c) {
  return c.terrains.length > 0 ? terrainIdToIndex[c.terrains[0]] : 999999999;
}

function weaponIndexer(c) {
  return weaponIdToIndex[c.weapon];
}

function rarityIndexer(c) {
  return c.rarity;
}

function createCompareFunc(indexer, multiplier) {
  return function cmp(c1, c2) {
    const i1 = indexer(c1);
    const i2 = indexer(c2);
    return i1 !== i2 ? multiplier * (i1 - i2) : c1.id - c2.id;
  };
}

const attributedSorters = {
  usesSmallButton: true,
  sorters: [
    [
      {
        id: "id_asc",
        name: "No.▲",
        color: "#274a78",
        func: createCompareFunc(idIndexer, 1),
      },
      {
        id: "id_desc",
        name: "No.▼",
        color: "#274a78",
        func: createCompareFunc(idIndexer, -1),
      },
    ],
    [
      {
        id: "terrain_asc",
        name: "属性▲",
        color: "#007b43",
        func: createCompareFunc(terrainIndexer, 1),
      },
      {
        id: "terrain_desc",
        name: "属性▼",
        color: "#007b43",
        func: createCompareFunc(terrainIndexer, 1),
      },
    ],
    [
      {
        id: "weapon_asc",
        name: "武器▲",
        color: "#eb6238",
        func: createCompareFunc(weaponIndexer, 1),
      },
      {
        id: "weapon_desc",
        name: "武器▼",
        color: "#eb6238",
        func: createCompareFunc(weaponIndexer, 1),
      },
    ],
    [
      {
        id: "rarity_asc",
        name: "★▲",
        color: "#e6b422",
        func: createCompareFunc(rarityIndexer, 1),
      },
      {
        id: "rarity_desc",
        name: "★▼",
        color: "#e6b422",
        func: createCompareFunc(rarityIndexer, 1),
      },
    ],
  ],
};

export default attributedSorters;
