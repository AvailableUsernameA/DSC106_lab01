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
      <select id="set-color">
        <option value='light dark'>Automatic</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
  </label>`,
);
let select = document.querySelector('select#set-color');

if ("colorScheme" in localStorage) {
  select.value = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
}

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value;
});

let emailForm = document.querySelector('form[action="mailto:huc014@ucsd.edu"]');
emailForm?.addEventListener('submit', function (event) {
  event.preventDefault();
  let data = new FormData(emailForm);
  let emailurl = emailForm.action+'?';
  for (let [name, value] of data) {
    // TODO build URL parameters here
    emailurl = emailurl+name+'='+encodeURIComponent(value)+'&';
    console.log(name, value);
  }
  emailurl = emailurl.slice(0, -1);
  console.log(emailurl);
  location.href = emailurl;
})

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    console.log(response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

// export function renderProjects(project, containerElement) {
// export function renderProjects(projects, containerElement) {
//   // Your code will go here
//   containerElement.innerHTML = '';
//   for (const project of projects) {
//     const article = document.createElement('article');
//     article.innerHTML = `
//     <h3>${project.title}</h3>
//     <img src="${project.image}" alt="${project.title}">
//     <p>${project.description}</p>
// `;
//     containerElement.appendChild(article);
//   }
// }

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // write javascript that will allow dynamic heading levels based on previous function
  // const titleElement = document.querySelector('.projects-title');
  // if (titleElement!=null) {
  //   titleElement.textContent = `${projects.length} Projects`;
  // }

  containerElement.innerHTML = '';
  for (const project of projects) {
    const article = document.createElement('article');

    const heading = document.createElement(headingLevel);
    article.innerHTML = `
    <${headingLevel}>${project.title}</${headingLevel}>
    <img src="${project.image}" alt="${project.title}">
    <div>
    <p>${project.description}</p>
    <small class="project-year">c. ${project.year}</small>
    </div>
`;
    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}`);
}