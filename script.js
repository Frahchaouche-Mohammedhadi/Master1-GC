// Edit this catalog to add modules, categories, and documents in one place.
// Keep resource lists empty until real Drive links are available.
const CURRICULUM = {
  "Béton Armé": { "Cours": [
    { title: "Cours 01 !", url: "https://drive.google.com/file/d/1nlA5A_uINdhFdnPTg2prrpO-4LGeU1lX/view?usp=drive_link" },
    { title: "Cours 02 :D", url: "https://drive.google.com/file/d/1nlA5A_uINdhFdnPTg2prrpO-4LGeU1lX/view?usp=drive_link" },
    { title: "Cours 03 :)", url: "https://drive.google.com/file/d/1nlA5A_uINdhFdnPTg2prrpO-4LGeU1lX/view?usp=drive_link" }
  ], "TD": [
{ title: "TD 01 !", url: "https://drive.google.com/file/d/1nlA5A_uINdhFdnPTg2prrpO-4LGeU1lX/view?usp=drive_link" },
{ title: "Cours 01 !", url: "https://drive.google.com/file/d/1nlA5A_uINdhFdnPTg2prrpO-4LGeU1lX/view?usp=drive_link" }
  ], "Examen / Interrogation": [] },
  "DDS 1": { "Cours": [], "TD": [], "Examen / Interrogation": [] },
  "Structures Métalliques": { "Cours": [], "TD": [], "Examen / Interrogation": [] },
  "MDS": { "Cours": [], "TD": [], "Examen / Interrogation": [] },
  "Thermique du bâtiment": { "Cours": [], "Examen": [] },
  "Respect des normes et des règles d'éthique": { "Cours": [], "Examen": [] },
  "Matériaux Innovants": { "Cours": [], "TP": [], "Examen": [] },
  "Program Avan Python": { "Cours": [], "TP": [], "Examen": [] },
  "Méth Expé": { "TP": [] }
};

const SEMESTER_MODULES = {
  S1: Object.keys(CURRICULUM),
  S2: []
};

// Add real documents under their module/category as { title, url }.
const state = { semester: "S1", module: null, category: null };
const content = document.querySelector("#content");
const heading = document.querySelector("#content-heading");
const breadcrumb = document.querySelector("#breadcrumb");
const backButton = document.querySelector("#back-button");

const icons = {
  category: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
  empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 14h6"/></svg>'
};

// Each module gets its own small, inline vector mark; no icon CDN is needed.
const moduleIcons = {
  "Béton Armé": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="2"/><path d="M16 9v30M32 9v30M9 16h30M9 32h30"/><circle cx="12.5" cy="12.5" r="1.4" fill="currentColor"/><circle cx="35.5" cy="12.5" r="1.4" fill="currentColor"/><circle cx="12.5" cy="35.5" r="1.4" fill="currentColor"/><circle cx="35.5" cy="35.5" r="1.4" fill="currentColor"/></svg>',
  "DDS 1": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 14 24 24 36 13M24 24 14 36M24 24l12 12"/><circle cx="12" cy="13" r="4"/><circle cx="37" cy="12" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="13" cy="37" r="4"/><circle cx="37" cy="37" r="4"/></svg>',
  "Structures Métalliques": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h32v7H28v16h12v7H8v-7h12V16H8V9Z"/><path d="M8 12.5h12M28 12.5h12M8 34.5h12M28 34.5h12" stroke-width="1.2"/></svg>',
  "MDS": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m24 7 16 9v17l-16 9-16-9V16l16-9Z"/><path d="m8 16 16 9 16-9M24 25v17M16 11.5l16 9v17"/><circle cx="24" cy="25" r="2" fill="currentColor"/></svg>',
  "Thermique du bâtiment": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 22 17-14 17 14M12 20v20h24V20M21 40V27h7v13"/><path d="M17 14V9h5M31 8c-3 3 3 4 0 7M37 7c-3 3 3 4 0 7"/></svg>',
  "Respect des normes et des règles d'éthique": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="11" y="8" width="27" height="33" rx="3"/><path d="M18 17h14M18 26h14M18 35h8M13 17l1.5 1.5L17 15M13 26l1.5 1.5L17 24M13 35l1.5 1.5L17 33"/></svg>',
  "Matériaux Innovants": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m24 7 10 6v12l-10 6-10-6V13l10-6Z"/><path d="m14 25-7 4v9l8 4 8-5M34 25l7 4v9l-8 4-8-5M24 7v11m10-5-10 5-10-5m10 7v12"/><circle cx="24" cy="20" r="2" fill="currentColor"/></svg>',
  "Program Avan Python": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m17 13-10 11 10 11M31 13l10 11-10 11M27 9l-6 30"/><circle cx="14" cy="24" r="1" fill="currentColor"/><circle cx="34" cy="24" r="1" fill="currentColor"/></svg>',
  "Méth Expé": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 8h10M21 8v13L11 37a3 3 0 0 0 2.5 4.5h21A3 3 0 0 0 37 37L27 21V8M17 31h15"/><path d="M19 35h2m5-7h2"/><circle cx="23" cy="32" r="1" fill="currentColor"/><circle cx="29" cy="37" r="1" fill="currentColor"/></svg>'
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getResources(moduleName, category) {
  const resources = CURRICULUM[moduleName]?.[category] || [];
  return resources.filter((resource) => resource && typeof resource.title === "string" && isSafeLink(resource.url));
}

function isSafeLink(url) {
  try {
    return ["https:", "http:"].includes(new URL(url).protocol);
  } catch (_) {
    return false;
  }
}

function setSemester(semester) {
  const semesterChanged = state.semester !== semester;
  state.semester = semester;
  state.module = null;
  state.category = null;
  document.querySelectorAll(".semester-button").forEach((button) => {
    const selected = button.dataset.semester === semester;
    button.setAttribute("aria-pressed", String(selected));
    button.className = `semester-button min-h-10 flex-1 rounded-lg px-5 py-2 text-sm font-semibold transition sm:flex-none ${selected
      ? "bg-white text-[#126c62] shadow-sm dark:bg-[#29423b] dark:text-emerald-200"
      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`;
  });
  document.querySelector("#semester-caption").textContent = semester === "S1" ? "Semestre 1" : "Semestre 2";
  render();
  if (semesterChanged) focusBrowse();
}

function focusBrowse() {
  window.requestAnimationFrame(() => {
    heading.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 639px)").matches) {
      document.querySelector("#browse-section").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function render() {
  const semesterModules = SEMESTER_MODULES[state.semester] || [];
  const totalResources = semesterModules.reduce((sum, name) => sum + Object.values(CURRICULUM[name] || {}).flat().filter((item) => item && isSafeLink(item.url)).length, 0);
  document.querySelector("#module-count").textContent = `${semesterModules.length} modules · ${totalResources} ressource${totalResources === 1 ? "" : "s"}`;
  breadcrumb.classList.toggle("hidden", !state.module);
  backButton.style.display = state.module ? "inline-flex" : "none";
  backButton.innerHTML = state.category
    ? '<span aria-hidden="true">←</span> Retour aux catégories'
    : '<span aria-hidden="true">←</span> Retour aux modules';

  if (!state.module) return renderModules(semesterModules);
  if (!state.category) return renderCategories(state.module);
  renderResources(state.module, state.category);
}

function renderModules(moduleNames) {
  heading.textContent = "Modules du semestre";
  breadcrumb.textContent = `${state.semester} / Modules`;
  if (moduleNames.length === 0) {
    content.className = "block";
    content.innerHTML = `<div class="rounded-2xl border border-dashed border-[#d9d6cb] bg-white/75 px-5 py-8 text-center dark:border-white/15 dark:bg-white/[.025] sm:px-8 sm:py-10">
      <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f2ed] text-[#216b60] dark:bg-emerald-300/10 dark:text-emerald-300">${icons.empty}</span>
      <h3 class="mt-4 text-base font-semibold text-slate-900 dark:text-white">Aucun module ajouté au S2 pour le moment.</h3>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Les ressources du premier semestre sont disponibles dans l’onglet S1.</p>
    </div>`;
    return;
  }
  content.className = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
  content.innerHTML = moduleNames.map((name, index) => {
    const categories = Object.keys(CURRICULUM[name] || {});
    const count = categories.reduce((sum, category) => sum + getResources(name, category).length, 0);
    return `<button type="button" class="group flex min-h-36 flex-col rounded-2xl border border-[#e6e3da] bg-white p-4 text-left shadow-[0_1px_2px_rgba(32,43,42,.04)] transition hover:border-[#216b60]/35 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216b60] active:scale-[.99] dark:border-white/10 dark:bg-[#1d2421] dark:hover:border-emerald-300/30 sm:p-5" data-module="${escapeHTML(name)}">
      <span class="flex w-full items-center justify-between gap-3"><span class="flex items-center gap-2.5"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f2ed] p-1.5 text-[#216b60] dark:bg-emerald-300/10 dark:text-emerald-300">${moduleIcons[name]}</span><span class="font-mono text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500">${String(index + 1).padStart(2, "0")}</span></span><span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">${count} ressource${count === 1 ? "" : "s"}<span class="h-4 w-4 text-[#216b60] transition group-hover:translate-x-0.5 dark:text-emerald-300">${icons.arrow}</span></span></span>
      <span class="mt-3 block w-full text-base font-semibold leading-snug text-slate-900 dark:text-white sm:text-[17px]">${escapeHTML(name)}</span>
      <span class="mt-3 flex w-full flex-wrap gap-1.5">${categories.map((category) => `<span class="rounded-md bg-[#f4f3ef] px-2 py-1 text-[10px] font-medium leading-4 text-slate-600 dark:bg-white/5 dark:text-slate-300">${escapeHTML(category)}</span>`).join("")}</span>
    </button>`;
  }).join("");
  content.querySelectorAll("[data-module]").forEach((button) => button.addEventListener("click", () => {
    state.module = button.dataset.module;
    render();
    focusBrowse();
  }));
}

function renderCategories(moduleName) {
  heading.textContent = moduleName;
  breadcrumb.textContent = `${state.semester} / ${moduleName}`;
  content.className = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
  content.innerHTML = Object.keys(CURRICULUM[moduleName] || {}).map((category) => {
    const count = getResources(moduleName, category).length;
    return `<button type="button" class="group flex min-h-32 flex-col rounded-2xl border border-[#e6e3da] bg-white p-4 text-left shadow-[0_1px_2px_rgba(32,43,42,.04)] transition hover:border-[#216b60]/35 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216b60] active:scale-[.99] dark:border-white/10 dark:bg-[#1d2421] dark:hover:border-emerald-300/30 sm:p-5" data-category="${escapeHTML(category)}">
      <span class="flex w-full items-center justify-between"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1f2ed] text-[#216b60] dark:bg-emerald-300/10 dark:text-emerald-300">${icons.category}</span><span class="h-5 w-5 text-[#216b60] transition group-hover:translate-x-0.5 dark:text-emerald-300">${icons.arrow}</span></span>
      <span class="mt-4 block text-base font-semibold text-slate-900 dark:text-white">${escapeHTML(category)}</span>
      <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">${count ? `${count} ressource${count === 1 ? "" : "s"} disponible${count === 1 ? "" : "s"}` : "Aucun document disponible"}</span>
    </button>`;
  }).join("");
  content.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
    state.category = button.dataset.category;
    render();
    focusBrowse();
  }));
}

function renderResources(moduleName, category) {
  const resources = getResources(moduleName, category);
  heading.textContent = category;
  breadcrumb.textContent = `${state.semester} / ${moduleName} / ${category}`;
  content.className = "grid grid-cols-1 gap-3";
  const rows = resources.map((resource) => `<a class="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-700/30 hover:bg-emerald-50/40 dark:border-white/10 dark:bg-[#182321] dark:hover:border-emerald-300/30 dark:hover:bg-emerald-300/5" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener noreferrer">
    <span class="flex min-w-0 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">${icons.category}</span><span class="truncate text-sm font-medium text-slate-800 dark:text-slate-100">${escapeHTML(resource.title)}</span></span><span class="h-4 w-4 shrink-0 text-[#087f70] dark:text-emerald-300">${icons.external}</span>
  </a>`).join("");
  const emptyState = `<div class="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-7 text-center dark:border-white/15 dark:bg-white/[.025]">
      <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300">${icons.empty}</span>
      <p class="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Aucun document disponible pour le moment.</p>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Les ressources apparaîtront ici dès qu'un lien sera ajouté.</p>
      <button type="button" class="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-400 disabled:opacity-100 dark:border-white/10 dark:bg-white/[.03] dark:text-slate-500" aria-disabled="true" disabled>Lien à ajouter</button>
    </div>`;
  content.innerHTML = rows || emptyState;
}

function goBack() {
  if (state.category) state.category = null;
  else if (state.module) state.module = null;
  render();
  focusBrowse();
}

function updateThemeButton() {
  const dark = document.documentElement.classList.contains("dark");
  document.querySelector("#theme-icon").innerHTML = dark
    ? '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
    : '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>';
  document.querySelector("#theme-toggle").setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
}

document.querySelectorAll(".semester-button").forEach((button) => button.addEventListener("click", () => setSemester(button.dataset.semester)));
document.querySelector("#back-button").addEventListener("click", goBack);
document.querySelector("#home-link").addEventListener("click", (event) => {
  event.preventDefault();
  state.module = null;
  state.category = null;
  render();
});
document.querySelector("#theme-toggle").addEventListener("click", () => {
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  try { localStorage.setItem("m1gc-theme", dark ? "dark" : "light"); } catch (_) { /* Theme still works for this visit. */ }
  updateThemeButton();
});

updateThemeButton();
setSemester("S1");
