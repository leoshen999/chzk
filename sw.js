self.addEventListener("fetch", (e) => {
  var promise = fetch(e.request);
  e.respondWith(promise);
});
