const CACHE_NAME = 'coffee-assistant-v8.22'; // 升级缓存版本号
// 需要预缓存的本地文件列表（注意：cache.addAll 是原子操作，任何一个失败都会导致 SW 安装失败，
// 所以这里只放同源文件，绝不放第三方 CDN / 字体）
const ASSETS = [
  './index.html',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// 安装阶段：把网页文件存入缓存，并立即进入激活状态（不等旧 SW 退役）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活阶段：清理旧缓存，并立即接管所有已打开的页面
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 页面导航（包括直接访问 ./ 根路径）：网络优先拿最新版，断网时回退到缓存的 index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // 静态资源：缓存优先。ignoreSearch 让 ?v=x.y 版本参数也能命中缓存
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
