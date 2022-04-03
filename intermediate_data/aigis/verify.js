var fs = require("fs");

var classes = JSON.parse(
  fs.readFileSync(__dirname + "/../../src/resources/aigis/classes.json", "utf8")
);
classes = [...classes["melee"], ...classes["ranged"], ...classes["both"]];

var rarities = [
  "black",
  "platinum",
  "sapphire",
  "gold",
  "silver",
  "bronze",
  "iron",
];

var genders = ["male", "female"];

var allAttributes = JSON.parse(
  fs.readFileSync(
    __dirname + "/../../src/resources/aigis/attributes.json",
    "utf8"
  )
);

var seasons = JSON.parse(
  fs.readFileSync(__dirname + "/../../src/resources/aigis/seasons.json", "utf8")
);

var characters = JSON.parse(fs.readFileSync(__dirname + "/raw.json", "utf8"));

const allNames = [];

function die(msg) {
  console.log(msg);
  process.exit(1);
}

function checkString(ch, field) {
  if (typeof ch[field] !== "string")
    die("Invalid " + field + ": " + ch.name + " " + ch[field]);
}

characters.map((ch) => {
  checkString(ch, "name");
  checkString(ch, "class");
  checkString(ch, "rarity");
  checkString(ch, "gender");
  checkString(ch, "icon");
  ch.attributes.forEach((attr) => {
    if (typeof attr !== "string") die("Invalid attr: " + ch.name + " " + attr);
  });

  if (ch.name in allNames) die("Duplicated name: " + ch.name);
  allNames[ch.name] = true;

  if (!classes.includes(ch.class))
    die("Unknown class: " + ch.name + " " + ch.class);

  if (!rarities.includes(ch.rarity))
    die("Unknown rarity: " + ch.name + " " + ch.rarity);

  if (!genders.includes(ch.gender))
    die("Unknown gender: " + ch.name + " " + ch.gender);

  var thisAttrs = {};
  ch.attributes.forEach((attr) => {
    if (attr in thisAttrs) die("Duplicated attribute: " + ch.name + " " + attr);
    if (!allAttributes.includes(attr) && !seasons.includes(attr))
      die("Unknown attribute: " + ch.name + " " + attr);

    thisAttrs[attr] = true;
  });
});

console.log("No error found");
