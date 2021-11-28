const fs = require("fs");
var request = require("request");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const properties = JSON.parse(fs.readFileSync("./properties.json"));
const charFileList = [
  {
    file: "./black.json",
    rarity: "black",
    firstRange: "白き射手ナナリー",
    firstBoth: "妖狸ヤシマ",
  },
  {
    file: "./platinum(melee).json",
    rarity: "platinum",
    firstRange: "xx",
    firstBoth: "xx",
  },
  {
    file: "./platinum(ranged_both).json",
    rarity: "platinum",
    firstRange: "神速の射手バシラ",
    firstBoth: "妖狸スズネ",
  },
  {
    file: "./sapphire.json",
    rarity: "sapphire",
    firstRange: "時の魔女リゼット",
    firstBoth: "xx",
  },
  {
    file: "./gold.json",
    rarity: "gold",
    firstRange: "鋼鉄弓クレア",
    firstBoth: "帝国飛行士ケイトリッジ",
  },
  {
    file: "./silver.json",
    rarity: "silver",
    firstRange: "弓兵ソーマ",
    firstBoth: "鳶翼の鳥人戦士",
  },
  {
    file: "./bronze.json",
    rarity: "bronze",
    firstRange: "弓兵アルス",
    firstBoth: "鷹翼の鳥人戦士",
  },
  {
    file: "./iron.json",
    rarity: "iron",
    firstRange: "一般兵A【弓】",
    firstBoth: "xx",
  },
];
const classes = JSON.parse(fs.readFileSync("./classes.json"));

// Generate basic characters data.
let characters = [];
charFileList.forEach((cfl) => {
  const chars = JSON.parse(fs.readFileSync(cfl.file));
  let currentType = "melee";
  const defaultGender =
    cfl.rarity === "bronze" || cfl.rarity === "iron" ? "male" : "female";
  const newChars = chars.map((ch) => {
    if (currentType === "melee" && ch.name === cfl.firstRange)
      currentType = "ranged";
    if (currentType === "ranged" && ch.name === cfl.firstBoth)
      currentType = "both";
    return {
      ...ch,
      rarity: cfl.rarity,
      type: currentType,
      gender: defaultGender,
      attributes: [],
    };
  });
  characters = characters.concat(newChars);
});

// Sanity check for character names and classes.
names = {};
characters.forEach((c) => {
  if (c.name in names) console.log("Duplicated: " + c.name);
  names[c.name] = true;
  if (c.name.includes(" ")) console.log("space detected: " + c.name);
  if (c.class.includes(" ")) console.log("space detected: " + c.class);
  if (!classes.includes(c.class)) console.log("class not found: " + c.class);
});

// Inject attributes into characters from properties.
Object.keys(properties).forEach((prop) => {
  const charList = properties[prop];
  const chars = characters.filter((ch) => charList.includes(ch.name));
  if (charList.length !== chars.length) {
    console.log("Bad matching: " + prop);
    console.log("  " + charList.length + " vs " + chars.length);
    console.log(charList.sort());
    console.log(chars.map((ch) => ch.name).sort());
  }
  if (prop === "男性") {
    chars.forEach((ch) => {
      ch.gender = "male";
    });
  } else {
    chars.forEach((ch) => {
      ch.attributes.push(prop);
    });
  }
});

// Add `human` attr.
const nonHumanAttrs = [
  "アンデッド",
  "ヴァンパイア",
  "エルフ",
  "ダークエルフ",
  "ハーフエルフ",
  "オーク",
  "ゴブリン",
  "デーモン",
  "ハーフデーモン",
  "ドワーフ",
  "獣人",
  "天使",
  "竜人",
  "妖怪",
  "聖霊",
  "仙人",
  "魚人",
  "鳥人",
  "天界人",
  "神",
];
const nonHumanNames = [
  "海魔の麗姫スキュレ",
  "狼剣の魔姫ピリカ",
  "暗黒騎士",
  "エリザベス",
  "雷の宝具使いリーエン",
  "降魔の戦姫トコヨ",
  "リリカ",
  "魔狼巫女プニル",
  "自動人形ルイン",
  "万機の祖たる者アージェ",
  "万機の祖たる者アージェ(プラチナ)",
  "魔導を宿す者ラーワル",
  "魔導を宿す者ラーワル(プラチナ)",
  "孤独な迷宮守ニミュエ",
  "メリオダス",
  "異郷の騎士",
  "キング",
  "異郷の妖精",
  "葵",
  "異郷の王女",
  "バン",
  "異郷の盗賊",
  "ディアンヌ",
  "異郷の槌使い",
  "芙蓉",
  "アイリス",
  "祝祭の南瓜姫ミサ",
  "ねんどろいどシビラ",
];
characters.forEach((ch) => {
  if (nonHumanNames.includes(ch.name)) return;
  if (ch.attributes.filter((attr) => nonHumanAttrs.includes(attr)).length > 0)
    return;
  ch.attributes.push("人間");
});

// Add `chibi` attr.
characters.forEach((ch) => {
  if (ch.name.startsWith("ちび")) ch.attributes.push("ちび");
});

// Fetch icon.
(async function () {
  const len = characters.length;
  for (var i = 0; i < len; i++) {
    const ch = characters[i];
    const dst = "../../public/aigis/ch/" + ch.name + ".png";
    const url = ch.img;
    ch.id = i;
    delete ch.img;
    if (fs.existsSync(dst)) continue;
    console.log("Fetch " + ch.name);
    request(url).pipe(fs.createWriteStream(dst));
    await sleep(1000);
  }
})();

// Separate attributes and seasons for better UX.
let attributes = [];
const seasons = [];
let isInSeasons = false;
Object.keys(properties).forEach((prop) => {
  if (prop === "男性") return;
  if (prop === "お正月") isInSeasons = true;
  if (isInSeasons) seasons.push(prop);
  else attributes.push(prop);
});

// Add missing `human` and `chibi` attr.
attributes = ["人間", ...attributes, "ちび"];

// Export.
fs.writeFileSync("characters.json", JSON.stringify(characters, null, 2));
fs.writeFileSync("attributes.json", JSON.stringify(attributes, null, 2));
fs.writeFileSync("seasons.json", JSON.stringify(seasons, null, 2));
