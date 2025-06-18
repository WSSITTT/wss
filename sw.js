const CACHE_NAME = 'waterloo-robotics-v1';
const urlsToCache = [
  '/',
  '/Index.html',
  '/Preview.html',
  '/AboutUs.html',
  '/PastEvents.html',
  '/Xslss.html',
  'https://i.postimg.cc/KzJpnb3x/Robotic-Logo.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});