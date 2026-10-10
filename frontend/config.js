// Base URL of the Django backend on Render (no trailing slash).
// Update PRODUCTION_API_URL after creating the Render service, e.g. the
// onrender.com URL or "https://api.ozstarfactory.com" once DNS is set up.
// Leave it empty to show the built-in message without calling the backend.
(function () {
  var PRODUCTION_API_URL = "https://api.ozstarfactory.com";
  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

  window.OZSTAR_CONFIG = {
    API_URL: isLocal ? "http://127.0.0.1:8000" : PRODUCTION_API_URL,
  };
})();
