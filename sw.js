// Motor de Notificações - Portal 901
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('push', function(event) {
  let msg = 'O representante postou novidades no Mural!';
  if (event.data) {
    msg = event.data.text();
  }

  const options = {
    body: msg,
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968204.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/5968/5968204.png',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now() }
  };

  event.waitUntil(
    self.registration.showNotification('Portal 901', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

