const CACHE = 'fdr-v2';
const ASSETS = ['/ferme-rebond/', '/ferme-rebond/index.html', '/ferme-rebond/manifest.json', '/ferme-rebond/icon-192.png', '/ferme-rebond/icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.open-meteo.com') || e.request.url.includes('sencrop.com') || e.request.url.includes('fonts.googleapis.com') || e.request.url.includes('fonts.gstatic.com')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(()=>new Response('Offline'))));
});