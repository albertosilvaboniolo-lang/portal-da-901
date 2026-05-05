const CACHE_NAME = 'portal-901-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação e Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Busca na rede ou cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// ESCUTADOR DE NOTIFICAÇÕES PUSH
self.addEventListener('push', function(event) {
  const options = {
    body: 'O Mural da 901 foi atualizado! Toque para ver.',
    icon: 'icon.png', // Nome exato do arquivo na sua imagem
    badge: 'icon.png',
    vibrate: [100, 50, 100],
    data: { url: './' }
  };

  event.waitUntil(
    self.registration.showNotification('Portal 901', options)
  );
});

// Clique na notificação abre o site
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

