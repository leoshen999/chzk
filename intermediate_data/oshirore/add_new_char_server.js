var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/add_new_char.html"));
});

app.get("/locations.json", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../src/resources/oshirore/locations.json")
  );
});

app.get("/terrains.json", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/../../src/resources/oshirore/terrains.json")
  );
});

app.get("/weapons.json", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/../../src/resources/oshirore/weapons.json")
  );
});

app.post("/submit", bodyParser.json(), (req, res) => {
  console.log(req.body);
  var filePath = path.join(
    __dirname,
    "/../../src/resources/oshirore/characters.json"
  );
  var characters = JSON.parse(fs.readFileSync(filePath, "utf8"));
  var id = characters[characters.length - 1].id + 1;
  characters.push({
    id,
    ...req.body,
  });
  fs.writeFileSync(filePath, JSON.stringify(characters, null, 2));
  res.send("OK, " + id);
});

app.listen(3001, () => {
  console.log("Let's add new char for oshirore");
});
