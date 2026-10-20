const CACHE = 'entreno-202610201125';
const FILES = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'support.js',
  'vendor/react.production.min.js', 'vendor/react-dom.production.min.js', 'vendor/fonts.css',
  'vendor/SpaceGrotesk-1.woff2', 'vendor/SpaceGrotesk-2.woff2', 'vendor/SpaceGrotesk-3.woff2',
  'vendor/SpaceMono-4.woff2', 'vendor/SpaceMono-5.woff2', 'vendor/SpaceMono-6.woff2',
  'vendor/SpaceMono-7.woff2', 'vendor/SpaceMono-8.woff2', 'vendor/SpaceMono-9.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r && r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; }).catch(() => hit || caches.match('index.html'));
    return hit || net;
  }));
});
