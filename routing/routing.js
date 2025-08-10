// // /js/routing.js
// import { initCurrencyConverter } from '../currency-converter/currencyConverter.js';

// const pages = {
//   home: document.getElementById('home'),
//   converter: document.getElementById('converter'),
// };

// function showPage(name) {
//   // Hide all pages
//   Object.values(pages).forEach(sec => sec.classList.remove('active'));

//   // Show requested page
//   const page = pages[name] || pages.home;
//   page.classList.add('active');

//   // Initialize converter only when its page opens
//   if (name === 'converter') {
//     initCurrencyConverter();
//   }
// }


// // Listen to hash changes
// window.addEventListener('hashchange', () => {
//   const route = location.hash.replace('#', '');
//   showPage(route);
// });

// // On initial load
// const initialRoute = location.hash.replace('#', '') || 'home';
// showPage(initialRoute);

// window.onhashchange = function() {
//     const route = window.location.hash.substr(1);
//     if (route === 'converter') {
//         fetch('currency-converter {
//         fetch('currency-converter.html')
//             .then(response => response.text())
//             .then(html => {
//                 document.getElementById('main-content').innerHTML = html;
//             });
//     }
// };
