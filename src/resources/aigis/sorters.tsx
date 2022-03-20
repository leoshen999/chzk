import classes from "./classes.json";

const classToIdx: any = {};

const classTypes = ["melee", "ranged", "both"];
let classCount = 0;
classTypes.forEach((ct) => {
  // @ts-ignore
  classes[ct].forEach((cl) => {
    classToIdx[cl] = classCount;
    classCount = classCount + 1;
  });
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

// Not in use
/*function createCompareFunc(indexer: (c: any) => number, multiplier: number) {
  return function cmp(c1: any, c2: any) {
    const i1 = indexer(c1);
    const i2 = indexer(c2);
    return i1 !== i2 ? multiplier * (i1 - i2) : c1.id - c2.id;
  };
}*/

function createCompareFuncWithFallback(
  indexer: (c: any) => number,
  multiplier: number,
  fallbackIndexer: (c: any) => number
) {
  return function cmp(c1: any, c2: any) {
    const i1 = indexer(c1);
    const i2 = indexer(c2);
    if (i1 !== i2) return multiplier * (i1 - i2);

    const fi1 = fallbackIndexer(c1);
    const fi2 = fallbackIndexer(c2);
    if (fi1 !== fi2) return fi1 - fi2;

    return c1.id - c2.id;
  };
}

const sorters = [
  {
    id: "rarity_desc",
    name: "★▼",
    color: "#af5f00",
    func: createCompareFuncWithFallback(rarityIndexer, -1, classIndexer),
  },
  {
    id: "rarity_asc",
    name: "★▲",
    color: "#af5f00",
    func: createCompareFuncWithFallback(rarityIndexer, 1, classIndexer),
  },
  {
    id: "class_desc",
    name: "クラス▼",
    color: "#af0000",
    func: createCompareFuncWithFallback(classIndexer, 1, rarityIndexer),
  },
  {
    id: "class_asc",
    name: "クラス▲",
    color: "#af0000",
    func: createCompareFuncWithFallback(classIndexer, -1, rarityIndexer),
  },
];

export default sorters;
