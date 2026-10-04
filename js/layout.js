const currentPage = window.location.pathname.split("/").pop() || "index.html";
const pages = [
  ["index.html", "Accueil"],
  ["projets.html", "Projets"],
  ["about.html", "À propos"],
  ["contact.html", "Contact"],
];

const navigationLinks = pages
  .map(([file, label]) => {
    const active = currentPage === file;
    return `<a href="${file}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  })
  .join("");

const headerMarkup = `<header>
    <nav aria-label="Navigation principale">
      <a href="index.html" class="logo" aria-label="Accueil Worzz">
        <img src="../img/worzz.png" alt="" />
      </a>
      <div class="links">${navigationLinks}</div>
    </nav>
  </header>`;
const skipLink = document.querySelector(".skip-link");

if (skipLink) {
  skipLink.insertAdjacentHTML("afterend", headerMarkup);
} else {
  document.body.insertAdjacentHTML("afterbegin", headerMarkup);
}

document.body.insertAdjacentHTML(
  "beforeend",
  `<footer>
    <p>Portfolio personnel</p>
    <a href="https://github.com/worzzdev" class="github-button" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    <p class="copyright">© 2026 Worzz</p>
  </footer>`,
);

const linksContainer = document.querySelector(".links");
const activeLink = linksContainer?.querySelector('[aria-current="page"]');

if (linksContainer && activeLink) {
  let previousPage = "";

  try {
    previousPage = sessionStorage.getItem("worzz-active-page") || "";
    sessionStorage.setItem("worzz-active-page", currentPage);
  } catch {
    // L’animation reste utilisable même si le navigateur bloque le stockage de session.
  }

  const previousLink = [...linksContainer.querySelectorAll("a")].find(
    (link) => link.getAttribute("href") === previousPage,
  );
  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  indicator.style.width = `${activeLink.offsetWidth}px`;
  indicator.style.height = `${activeLink.offsetHeight}px`;

  const targetX = activeLink.offsetLeft;
  const startX = previousLink && previousPage !== currentPage ? previousLink.offsetLeft : targetX;
  indicator.style.transform = `translate(${startX}px, -50%)`;
  linksContainer.prepend(indicator);

  if (startX !== targetX) {
    requestAnimationFrame(() => {
      indicator.classList.add("is-ready");
      requestAnimationFrame(() => {
        indicator.style.transform = `translate(${targetX}px, -50%)`;
      });
    });
  } else {
    indicator.classList.add("is-ready");
  }
}
