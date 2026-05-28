const CACHE_NAME = 'coffee-assistant-v4.6'; // 升级缓存版本号
// 需要拦截并缓存的文件列表
const ASSETS = [
  './index.html',
  './manifest.json',
  './favicon.svg',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&display=swap'
];

// 安装阶段：把网页文件存入手机缓存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 核心功能：拦截网络请求，如果没网，直接从本地缓存里拿文件
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});