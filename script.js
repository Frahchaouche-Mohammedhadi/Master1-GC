// Edit this catalog to add modules, categories, and documents in one place.
// Keep resource lists empty until real Drive links are available.
const CURRICULUM = {

  "Béton Armé": { 
    "Cours": [
      {title: "Chapitre 01-Cacul des planchers.pdf",
      url: "https://drive.google.com/file/d/19n79dMOHCw1s_bgmdqRMvahsPv4pW-V2/view?usp=drive_link"
    },
    ], 
    "TD": [], 
    "Examen / Interrogation": [] },


  "DDS 1": { 
    "Cours": [], 
    "TD": [], 
    "Examen / Interrogation": [] },


  "Structures Métalliques": { 
    "Cours": [], 
    "TD": [], 
    "Examen / Interrogation": [] },


  "MDS": { 
    "Cours": [], 
    "TD": [], 
    "Examen / Interrogation": [] },


  "Thermique du bâtiment": { 
    "Cours": [], 
    "Examen": [] },


  "Respect des normes et des règles d'éthique": { 
    "Cours": [
    {title: "Charte d'éthique et de déontologie du mesrs-2021.pdf",
      url: "https://drive.google.com/file/d/1mqhbdUoN5cxqbXeGVjg3H9Pn40dtIzF6/view?usp=drive_link"
    },
    {title: "ميثاق الآداب و الأخلاقيات الجامعية 2021.pdf",
      url: "https://drive.google.com/file/d/1N6yCEM0ahQc-I511K9AiZFIN1m7okHmh/view?usp=drive_link"
    },
  ], "Examen": [] },


  "Matériaux Innovants": { 
    "Cours": [], 
    "TP": [], 
    "Examen": [] },


  "Program Avan Python": { 
    "Cours": [], 
    "TP": [
{title: "Lab 1 _ Introduction to Python.pdf",
      url: "https://drive.google.com/file/d/104vlEkFxVvOeFDygKWIAZHy7mI26VRHd/view?usp=drive_link"
    },
    ], 
    "Examen": [] },


  "Méth Expé": { 
    "TP": [] }
};

// Normalize labels while preserving the catalog order (TD before exams).
Object.values(CURRICULUM).forEach((categories) => {
  const normalized = {};
  Object.entries(categories).forEach(([label, resources]) => {
    const name = label === "TD" ? "TD / Solution TD"
      : label === "Examen / Interrogation" ? "Examens / Interrogations"
      : label === "Examen" ? "Examens"
      : label;
    normalized[name] = [...(normalized[name] || []), ...resources];
  });
  Object.keys(categories).forEach((label) => delete categories[label]);
  Object.assign(categories, normalized);
});

const SEMESTER_MODULES = {
  S1: Object.keys(CURRICULUM),
  S2: []
};

// Add real documents under their module/category as { title, url }.
const state = { semester: "S1", module: null, category: null };
const HISTORY_KEY = "m1gcNavigation";
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
  "Béton Armé": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="2"/><path d="M16 9v30M32 9v30M9 16h30M9 32h30"/><circle cx="12.5" cy="12.5" r="1.4" fill="currentColor"/><circle cx="35.5" cy="12.5" r="1.4" fill="currentColor"/><circle cx="12.5" cy="35.5" r="1.4" fill="currentColor"/><circle cx="35.5" cy="35.5" r="1.4" fill="currentColor"/></svg>',
  "DDS 1": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 14 24 24 36 13M24 24 14 36M24 24l12 12"/><circle cx="12" cy="13" r="4"/><circle cx="37" cy="12" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="13" cy="37" r="4"/><circle cx="37" cy="37" r="4"/></svg>',
  "Structures Métalliques": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h32v7H28v16h12v7H8v-7h12V16H8V9Z"/><path d="M8 12.5h12M28 12.5h12M8 34.5h12M28 34.5h12" stroke-width="1.6"/></svg>',
  "MDS": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m24 7 16 9v17l-16 9-16-9V16l16-9Z"/><path d="m8 16 16 9 16-9M24 25v17M16 11.5l16 9v17"/><circle cx="24" cy="25" r="2" fill="currentColor"/></svg>',
  "Thermique du bâtiment": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 22 17-14 17 14M12 20v20h24V20M21 40V27h7v13"/><path d="M17 14V9h5M31 8c-3 3 3 4 0 7M37 7c-3 3 3 4 0 7"/></svg>',
  "Respect des normes et des règles d'éthique": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="11" y="8" width="27" height="33" rx="3"/><path d="M18 17h14M18 26h14M18 35h8M13 17l1.5 1.5L17 15M13 26l1.5 1.5L17 24M13 35l1.5 1.5L17 33"/></svg>',
  "Matériaux Innovants": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m24 7 10 6v12l-10 6-10-6V13l10-6Z"/><path d="m14 25-7 4v9l8 4 8-5M34 25l7 4v9l-8 4-8-5M24 7v11m10-5-10 5-10-5m10 7v12"/><circle cx="24" cy="20" r="2" fill="currentColor"/></svg>',
  "Program Avan Python": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m17 13-10 11 10 11M31 13l10 11-10 11M27 9l-6 30"/><circle cx="14" cy="24" r="1" fill="currentColor"/><circle cx="34" cy="24" r="1" fill="currentColor"/></svg>',
  "Méth Expé": '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 8h10M21 8v13L11 37a3 3 0 0 0 2.5 4.5h21A3 3 0 0 0 37 37L27 21V8M17 31h15"/><path d="M19 35h2m5-7h2"/><circle cx="23" cy="32" r="1" fill="currentColor"/><circle cx="29" cy="37" r="1" fill="currentColor"/></svg>'
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

function saveNavigationState({ replace = false } = {}) {
  const current = history.state && typeof history.state === "object" ? history.state : {};
  const previousDepth = Number(current[HISTORY_KEY]?.depth) || 0;
  const navigation = {
    semester: state.semester,
    module: state.module,
    category: state.category,
    depth: replace ? previousDepth : previousDepth + 1
  };
  history[replace ? "replaceState" : "pushState"]({ ...current, [HISTORY_KEY]: navigation }, "", location.href);
}

function restoreNavigationState(navigation) {
  if (!navigation || !["S1", "S2"].includes(navigation.semester)) return;
  state.semester = navigation.semester;
  const semesterModules = SEMESTER_MODULES[state.semester] || [];
  state.module = semesterModules.includes(navigation.module) ? navigation.module : null;
  const categories = state.module ? Object.keys(CURRICULUM[state.module] || {}) : [];
  state.category = categories.includes(navigation.category) ? navigation.category : null;
  render();
  focusBrowse();
}

function setSemester(semester, { recordHistory = true } = {}) {
  const viewChanged = state.module !== null || state.category !== null;
  const semesterChanged = state.semester !== semester;
  state.semester = semester;
  state.module = null;
  state.category = null;
  document.querySelectorAll(".semester-button").forEach((button) => {
    const selected = button.dataset.semester === semester;
    button.setAttribute("aria-pressed", String(selected));
    button.className = `semester-button min-h-10 flex-1 rounded-lg px-5 py-2 text-sm font-semibold transition sm:flex-none ${selected
      ? "bg-white text-[#173f5d] shadow-sm dark:bg-[#1c3950] dark:text-sky-200"
      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`;
  });
  document.querySelector("#semester-caption").textContent = semester === "S1" ? "Semestre 1" : "Semestre 2";
  render();
  if (recordHistory && (semesterChanged || viewChanged)) saveNavigationState();
  if (semesterChanged || viewChanged) focusBrowse();
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
    content.innerHTML = `<div class="rounded-2xl border border-dashed border-[#c9d8df] bg-white/75 px-5 py-8 text-center dark:border-white/15 dark:bg-white/[.025] sm:px-8 sm:py-10">
      <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f0f4] text-[#1f4f70] dark:bg-sky-300/10 dark:text-sky-300">${icons.empty}</span>
      <h3 class="mt-4 text-base font-semibold text-slate-900 dark:text-white">Aucun module ajouté au S2 pour le moment.</h3>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Les ressources du premier semestre sont disponibles dans l’onglet S1.</p>
    </div>`;
    return;
  }
  content.className = "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3";
  content.innerHTML = moduleNames.map((name) => {
    const categories = Object.keys(CURRICULUM[name] || {});
    const count = categories.reduce((sum, category) => sum + getResources(name, category).length, 0);
    return `<button type="button" class="group flex min-h-44 flex-col rounded-2xl border border-[#d5e1e7] bg-white p-4 text-left shadow-[0_1px_2px_rgba(28,40,51,.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[#1f4f70]/45 hover:shadow-[0_10px_28px_rgba(28,40,51,.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4f70] active:translate-y-0 dark:border-white/10 dark:bg-[#182a3a] dark:hover:border-sky-300/35 dark:hover:shadow-[0_10px_28px_rgba(0,0,0,.2)] sm:p-5" data-module="${escapeHTML(name)}">
      <span class="flex w-full items-center gap-3.5">
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#bfd4e0] bg-[#e6f1f7] p-1 text-[#173f5d] transition-colors group-hover:bg-[#dcebf3] dark:border-sky-200/20 dark:bg-sky-300/10 dark:text-sky-200 dark:group-hover:bg-sky-300/15">${moduleIcons[name]}</span>
        <span class="min-w-0 text-left text-[15px] font-semibold leading-snug text-slate-900 dark:text-white sm:text-base">${escapeHTML(name)}</span>
      </span>
      <span class="mt-4 flex w-full flex-wrap gap-1.5">${categories.map((category) => `<span class="rounded-md border border-transparent bg-[#fbfcfd] px-2 py-0.5 text-[10px] font-medium leading-4 text-slate-500 dark:bg-white/[.035] dark:text-slate-400">${escapeHTML(category)}</span>`).join("")}</span>
      <span class="mt-auto flex w-full items-center justify-between gap-3 pt-4">
        <span class="text-[10px] font-medium leading-4 text-slate-500 dark:text-slate-400">${count} ressource${count === 1 ? "" : "s"} disponible${count === 1 ? "" : "s"}</span>
        <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9e5eb] bg-[#edf2f5] text-[#1f4f70] transition duration-200 group-hover:translate-x-0.5 group-hover:border-[#1f4f70]/30 group-hover:bg-[#e5f0f4] group-hover:shadow-[0_0_0_3px_rgba(31,79,112,.08)] group-focus-visible:border-[#1f4f70]/40 group-focus-visible:bg-[#e5f0f4] dark:border-white/10 dark:bg-white/[.05] dark:text-sky-300 dark:group-hover:border-sky-300/30 dark:group-hover:bg-sky-300/10 dark:group-hover:shadow-[0_0_0_3px_rgba(131,182,214,.1)] dark:group-focus-visible:border-sky-300/40">${icons.arrow}</span>
      </span>
    </button>`;
  }).join("");
  content.querySelectorAll("[data-module]").forEach((button) => button.addEventListener("click", () => {
    state.module = button.dataset.module;
    state.category = null;
    saveNavigationState();
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
    return `<button type="button" class="group flex min-h-32 flex-col rounded-2xl border border-[#d5e1e7] bg-white p-4 text-left shadow-[0_1px_2px_rgba(28,40,51,.04)] transition hover:border-[#1f4f70]/35 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4f70] active:scale-[.99] dark:border-white/10 dark:bg-[#182a3a] dark:hover:border-sky-300/30 sm:p-5" data-category="${escapeHTML(category)}">
      <span class="flex w-full items-center justify-between"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f0f4] text-[#1f4f70] dark:bg-sky-300/10 dark:text-sky-300">${icons.category}</span><span class="h-5 w-5 text-[#1f4f70] transition group-hover:translate-x-0.5 dark:text-sky-300">${icons.arrow}</span></span>
      <span class="mt-4 block text-base font-semibold text-slate-900 dark:text-white">${escapeHTML(category)}</span>
      <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">${count ? `${count} ressource${count === 1 ? "" : "s"} disponible${count === 1 ? "" : "s"}` : "Aucun document disponible"}</span>
    </button>`;
  }).join("");
  content.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
    state.category = button.dataset.category;
    saveNavigationState();
    render();
    focusBrowse();
  }));
}

function renderResources(moduleName, category) {
  const resources = getResources(moduleName, category);
  heading.textContent = category;
  breadcrumb.textContent = `${state.semester} / ${moduleName} / ${category}`;
  content.className = "grid grid-cols-1 gap-3";
  const rows = resources.map((resource) => `<a class="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-sky-700/30 hover:bg-sky-50/40 dark:border-white/10 dark:bg-[#142535] dark:hover:border-sky-300/30 dark:hover:bg-sky-300/5" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener noreferrer">
    <span class="flex min-w-0 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">${icons.category}</span><span class="truncate text-sm font-medium text-slate-800 dark:text-slate-100">${escapeHTML(resource.title)}</span></span><span class="h-4 w-4 shrink-0 text-[#173f5d] dark:text-sky-300">${icons.external}</span>
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
  const navigation = history.state?.[HISTORY_KEY];
  if (navigation && navigation.depth > 0) {
    history.back();
    return;
  }
  if (state.category) state.category = null;
  else if (state.module) state.module = null;
  else return;
  saveNavigationState();
  render();
  focusBrowse();
}

function updateThemeButton() {
  const dark = document.documentElement.classList.contains("dark");
  document.querySelector("#theme-icon").innerHTML = dark
    ? '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
    : '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>';
  document.querySelector("#theme-toggle").setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0b1520" : "#f5f8fa");
}

document.querySelectorAll(".semester-button").forEach((button) => button.addEventListener("click", () => setSemester(button.dataset.semester)));
document.querySelector("#back-button").addEventListener("click", goBack);
document.querySelector("#home-link").addEventListener("click", (event) => {
  event.preventDefault();
  state.module = null;
  state.category = null;
  saveNavigationState();
  render();
});
document.querySelector("#theme-toggle").addEventListener("click", () => {
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  try { localStorage.setItem("m1gc-theme", dark ? "dark" : "light"); } catch (_) { /* Theme still works for this visit. */ }
  updateThemeButton();
});

updateThemeButton();
history.replaceState({ ...(history.state && typeof history.state === "object" ? history.state : {}), [HISTORY_KEY]: { ...state, depth: 0 } }, "", location.href);
window.addEventListener("popstate", (event) => {
  restoreNavigationState(event.state?.[HISTORY_KEY]);
});
setSemester("S1", { recordHistory: false });
