console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact'},
    { url: 'CV.html', title: 'CV'},
    { url: 'https://github.com/AvailableUsernameA', title: 'GitHub'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/DSC106_lab01/";         // GitHub Pages repo name

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    url = !url.startsWith('http') ? BASE_PATH + url : url;
    // next step: create link and add it to nav
    // nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    if (a.host !== location.host) {
        a.target = "_blank";
    }
    nav.append(a);
   }

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
      Theme:
      <select>
        <option value='light dark'>Automatic</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
  </label>`,
);