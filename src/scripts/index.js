import 'regenerator-runtime';
import '../styles/main.scss';
import App from './views/app';

// Select elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.app-bar__navigation ul');
const appBar = document.querySelector('.app-bar');
const skipToContentLink = document.querySelector('.skip-to-content');

// Initialize App
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#main-content'),
});

// Render the page on hash change or load
window.addEventListener('hashchange', () => app.renderPage());
window.addEventListener('load', () => app.renderPage());

// Toggle navigation menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// App bar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    appBar.classList.add('scrolled');
  } else {
    appBar.classList.remove('scrolled');
  }
});

// Skip to content functionality
skipToContentLink.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('main-content').focus();
});

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
