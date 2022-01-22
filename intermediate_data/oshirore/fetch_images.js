var fs = require("fs");
var request = require("request");

function padding_str(num, size) {
  var s = "000000000" + num.toString();
  return s.substr(s.length - size);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

var musumes = JSON.parse(
  fs.readFileSync(
    __dirname + "/../../src/resources/oshirore/characters.json",
    "utf8"
  )
);

var target_dir = __dirname + "/../../public/oshirore/ch/";
if (!fs.existsSync(target_dir)) fs.mkdirSync(target_dir);

(async function () {
  for (const musume of musumes) {
    const target_path = target_dir + padding_str(musume.id, 4) + ".png";
    if (fs.existsSync(target_path)) continue;

    process.stdout.write(
      "Fetch " + padding_str(musume.id, 4) + " " + musume.name + " ... "
    );
    const url =
      "https://image.swiki.jp/img0/?host=scre&page=%E7%94%BB%E5%83%8F%E3%81%A7%E4%B8%80%E8%A6%A7RE&src=" +
      encodeURIComponent(musume.name) +
      ".png";
    request(url).pipe(fs.createWriteStream(target_path));
    process.stdout.write("done\n");
    await sleep(3 * 1000);
  }
})();
