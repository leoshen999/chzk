
var characters = [];
document.querySelectorAll(".splitinclude-included-page-container").forEach(container => {
  var img = container.querySelector("tbody > tr:nth-child(1) > td:nth-child(1) img");
  var a = container.querySelector("tbody > tr:nth-child(1) > td:nth-child(2) a");
  if (!img || !a) {
    img = container.querySelector("tbody > tr:nth-child(3) > td:nth-child(1) img");
    a = container.querySelector("tbody > tr:nth-child(3) > td:nth-child(2) a");
    if (!img || !a) {
      console.log("failed...");
      console.log(container);
      return;
    }
  }
  
  characters.push({
    img: img.src,
    name: img.getAttribute("title"),
    class: a.textContent.trim(),
  });
});




var props = {};
document.querySelectorAll("tr").forEach(tr=> {
  var prop = tr.querySelector("td:nth-child(1)").textContent.trim();
  if (!(prop in props))
    props[prop] = [];
  tr.querySelectorAll("a").forEach(a=> {
    var name = a.textContent;
    if (!name) return;
    if (props[prop].includes(name.trim())) {
      console.log("Duplicate: " + prop + " " + name.trim());
      return;
    }
    props[prop].push(name.trim());
  });
});
