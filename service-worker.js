// 定義要緩存的資源清單
const cacheName = 'my-cache';
const resourcesToCache = [
    'index.html',
    'video-production.html',
    'visual-strategies.html',
    'logo-design.html',
    'commissions.html',
    'css/bootstrap.min.css',
    'css/style.css',
    'js/bootstrap.min.js',
    'js/app.js',
    'img/logo.webp',
    // 其他要緩存的檔案路徑
];

// 安裝 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToCache);
            })
            .then(() => self.skipWaiting()) // 立即激活 Service Worker
    );
});

// 啟用 Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(name => name !== cacheName)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim()) // 立即控制所有頁面
    );
});

// 攔截網路請求
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });

                return response || fetchPromise;
            });
        })
    );
});