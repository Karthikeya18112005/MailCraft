/* MailCraft AI — popup.js */

const THEME_NAMES = {
  clay: "Clay", stone: "Stone", moss: "Moss",
  mist: "Mist", dusk: "Dusk", sakura: "Sakura", ink: "Ink",
};

let currentTheme = "clay";
let currentFont = "sans";

/* ─── OLLAMA STATUS CHECK ────────────────────────────────── */
async function checkOllama(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

/* ─── INIT ───────────────────────────────────────────────── */
async function init() {
  const data = await chrome.storage.sync.get(["mcTheme", "mcFont", "mcModel", "mcUrl"]);

  currentTheme = data.mcTheme || "clay";
  currentFont  = data.mcFont  || "sans";
  const model  = data.mcModel || "mailcraft";
  const url    = data.mcUrl   || "http://localhost:11434";

  // Restore inputs
  document.getElementById("popup-model").value = model;
  document.getElementById("popup-url").value   = url;

  // Restore theme dots
  setActiveDot(currentTheme);
  setActiveFont(currentFont);
  document.getElementById("popup-theme-name").textContent = THEME_NAMES[currentTheme] || currentTheme;

  // Check Ollama
  const ok = await checkOllama(url);
  const dot  = document.getElementById("status-dot");
  const text = document.getElementById("status-text");
  dot.className  = "status-dot " + (ok ? "ok" : "err");
  text.textContent = ok ? `Connected — ${model}` : "Ollama not running";

  // Dot clicks
  document.getElementById("popup-dots").addEventListener("click", (e) => {
    const d = e.target.closest(".pop-dot");
    if (!d) return;
    currentTheme = d.getAttribute("data-theme");
    setActiveDot(currentTheme);
    document.getElementById("popup-theme-name").textContent = THEME_NAMES[currentTheme];
  });

  // Font clicks
  document.getElementById("popup-fonts").addEventListener("click", (e) => {
    const f = e.target.closest(".pop-font");
    if (!f) return;
    currentFont = f.getAttribute("data-font");
    setActiveFont(currentFont);
  });

  // Save
  document.getElementById("popup-save").addEventListener("click", save);
}

function setActiveDot(theme) {
  document.querySelectorAll(".pop-dot").forEach((d) => {
    d.classList.toggle("pop-active", d.getAttribute("data-theme") === theme);
  });
}

function setActiveFont(font) {
  document.querySelectorAll(".pop-font").forEach((f) => {
    f.classList.toggle("pop-active", f.getAttribute("data-font") === font);
  });
}

async function save() {
  const btn = document.getElementById("popup-save");
  btn.textContent = "Saving…";

  const model = document.getElementById("popup-model").value.trim() || "mailcraft";
  const url   = document.getElementById("popup-url").value.trim()   || "http://localhost:11434";

  await chrome.storage.sync.set({
    mcTheme: currentTheme,
    mcFont:  currentFont,
    mcModel: model,
    mcUrl:   url,
  });

  btn.textContent = "Saved ✓";
  setTimeout(() => { btn.textContent = "Save settings"; }, 1500);
}

init();
