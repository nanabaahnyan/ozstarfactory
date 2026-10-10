(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  var apiUrl = (window.OZSTAR_CONFIG && window.OZSTAR_CONFIG.API_URL) || "";
  if (!apiUrl) return;

  // The page already shows a default message; the backend only refines it.
  // Render's free tier can take a while to wake up, so give it some time.
  var controller = "AbortController" in window ? new AbortController() : null;
  var timer = setTimeout(function () {
    if (controller) controller.abort();
  }, 15000);

  fetch(apiUrl.replace(/\/$/, "") + "/api/status/", {
    signal: controller ? controller.signal : undefined,
  })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      if (data.title) document.getElementById("title").textContent = data.title;
      if (data.message) document.getElementById("message").textContent = data.message;
      if (data.eta) {
        var eta = document.getElementById("eta");
        eta.textContent = "Expected back: " + data.eta;
        eta.hidden = false;
      }
    })
    .catch(function () {
      /* keep the built-in message */
    })
    .finally(function () {
      clearTimeout(timer);
    });
})();
