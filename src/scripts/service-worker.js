import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

// Precaching generated assets by Webpack
precacheAndRoute(self.__WB_MANIFEST);

// Cache static assets like CSS, JS, and images
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-assets',
  })
);

// Cache Dicoding Restaurant API responses
registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
  new NetworkFirst({
    cacheName: 'restaurant-api',
    networkTimeoutSeconds: 10,
  })
);
