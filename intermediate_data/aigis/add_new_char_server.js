var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/add_new_char.html"));
});

app.get("/classes.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../../src/resources/aigis/classes.json"));
});

app.get("/seasons.json", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../src/resources/aigis/seasons.json"));
});

app.get("/attributes.json", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/../../src/resources/aigis/attributes.json")
  );
});

app.post("/submit", bodyParser.json(), (req, res) => {
  console.log(req.body);
  var filePath = path.join(__dirname, "raw.json");
  var characters = JSON.parse(fs.readFileSync(filePath, "utf8"));
  characters.push(req.body);
  fs.writeFileSync(filePath, JSON.stringify(characters, null, 2));
  res.send("OK");
});

app.listen(3001, () => {
  console.log("Let's add new char for aigis");
});
