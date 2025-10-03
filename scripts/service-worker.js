const CACHE_NAME = "my-pwa-cache-v3"; // Increment the version when you update the cache!
const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "scripts/groups.js",
  "scripts/main.js",
  "scripts/left_case_loader.js",
  "scripts/clear_feedback_form.js",
  "scripts/train_case.js",
  "scripts/string_manipulation.js",
  "scripts/user_saved.js",
  "scripts/scrambles/basic_scrambles.js",
  "scripts/scrambles/basic_scrambles_back.js",
  "scripts/scrambles/advanced_scrambles.js",
  "scripts/scrambles/expert_scrambles.js",
  "scripts/algorithms/basic_algorithms.js",
  "scripts/algorithms/basic_algorithms_back.js",
  "scripts/algorithms/advanced_algorithms.js",
  "scripts/algorithms/expert_algorithms.js",
  "images/arrow_collapse_down.svg",
  "images/arrow_collapse_right.svg",
  "images/arrow_left.svg",
  "images/arrow_right.svg",
  "images/cancel.svg",
  "images/change_learning_state.svg",
  "images/change_learning_state_hollow.svg",
  "images/confirm.svg",
  "images/edit.svg",
  "images/feedback.svg",
  "images/info.svg",
  "images/mirror1.svg",
  "images/settings.svg",
];

// Install Event:  Cache essential resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Event:  Serve cached content or fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Not in cache - try to fetch from network
      return fetch(event.request)
        .then((response) => {
          // Check if response is valid
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response; // Don't cache invalid responses
          }

          // Clone the response and cache it for future use
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If we get here, it's a network error *and* the request isn't cached.
          // Provide a fallback response (e.g., an offline page).

          // if (event.request.mode === "navigate") {
          //   return caches.match("/offline.html"); // Serve offline page
          // }

          return undefined; // Or a generic error response
        });
    })
  );
});

// Activate Event:  Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
