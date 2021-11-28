import classes from "./classes.json";

const classToIdx: any = {};
classes.forEach((cl, idx) => {
  classToIdx[cl] = idx;
});

const rarityNameToNumber: any = {
  black: 6,
  platinum: 5,
  sapphire: 4.5,
  gold: 4,
  silver: 3,
  bronze: 2,
  iron: 1,
};

function rarityIndexer(c: any) {
  return rarityNameToNumber[c.rarity];
}

function classIndexer(c: any) {
  return classToIdx[c.class];
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
    id: "rarity_desc",
    name: "★▼",
    color: "#af5f00",
    func: createCompareFunc(rarityIndexer, -1),
  },
  {
    id: "rarity_asc",
    name: "★▲",
    color: "#af5f00",
    func: createCompareFunc(rarityIndexer, 1),
  },
  {
    id: "class_desc",
    name: "クラス▼",
    color: "#af0000",
    func: createCompareFunc(classIndexer, 1),
  },
  {
    id: "class_asc",
    name: "クラス▲",
    color: "#af0000",
    func: createCompareFunc(classIndexer, -1),
  },
];

export default sorters;
