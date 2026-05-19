const CACHE = 'fdr-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.open-meteo.com') || e.request.url.includes('sencrop.com') || e.request.url.includes('fonts.googleapis.com')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});