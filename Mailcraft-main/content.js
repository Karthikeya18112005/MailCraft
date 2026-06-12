/* MailCraft AI — content.js */
/* Injected into https://mail.google.com */

(function () {
  "use strict";

  if (document.getElementById("mc-panel")) return;

  /* ─── STATE ─────────────────────────────────────────────── */
  let panelOpen = false;
  let generatedEmail = "";
  let selectedTone = "default";
  let selectedType = "default";
  let themeOpen = false;
  let styleOpen = false;

  /* ─── THEMES ─────────────────────────────────────────────── */
  const THEMES = {
    clay: {
      bg: "#beb19e", surface: "#c8bcaa", panelBg: "#d4cabb",
      text: "#53433e", muted: "rgba(83,67,62,0.52)", border: "rgba(83,67,62,0.14)",
      btn: "#53433e", btnText: "#f7f2ec", inputBg: "rgba(83,67,62,0.07)",
      bubbleAi: "rgba(83,67,62,0.08)", hoverBg: "rgba(83,67,62,0.06)",
      accent: "#7a6458", name: "Clay",
    },
    stone: {
      bg: "#ccc9c2", surface: "#d8d5ce", panelBg: "#e2dfda",
      text: "#3a3630", muted: "rgba(58,54,48,0.5)", border: "rgba(58,54,48,0.12)",
      btn: "#3a3630", btnText: "#f5f3f0", inputBg: "rgba(58,54,48,0.06)",
      bubbleAi: "rgba(58,54,48,0.07)", hoverBg: "rgba(58,54,48,0.05)",
      accent: "#6a6860", name: "Stone",
    },
    moss: {
      bg: "#9aaa8a", surface: "#a8ba98", panelBg: "#b8caaa",
      text: "#2a3820", muted: "rgba(42,56,32,0.52)", border: "rgba(42,56,32,0.16)",
      btn: "#2a3820", btnText: "#eaf2e0", inputBg: "rgba(42,56,32,0.08)",
      bubbleAi: "rgba(42,56,32,0.08)", hoverBg: "rgba(42,56,32,0.06)",
      accent: "#4a5a3a", name: "Moss",
    },
    mist: {
      bg: "#b8c8cc", surface: "#c6d4d8", panelBg: "#d2dfe4",
      text: "#1e3038", muted: "rgba(30,48,56,0.5)", border: "rgba(30,48,56,0.13)",
      btn: "#1e3038", btnText: "#eaf4f8", inputBg: "rgba(30,48,56,0.07)",
      bubbleAi: "rgba(30,48,56,0.07)", hoverBg: "rgba(30,48,56,0.05)",
      accent: "#3a5868", name: "Mist",
    },
    dusk: {
      bg: "#b0a8c8", surface: "#beb6d4", panelBg: "#ccc6e0",
      text: "#28204a", muted: "rgba(40,32,74,0.5)", border: "rgba(40,32,74,0.14)",
      btn: "#28204a", btnText: "#ece8f8", inputBg: "rgba(40,32,74,0.07)",
      bubbleAi: "rgba(40,32,74,0.07)", hoverBg: "rgba(40,32,74,0.05)",
      accent: "#483870", name: "Dusk",
    },
    sakura: {
      bg: "#d8b8b8", surface: "#e2c4c4", panelBg: "#ecd4d4",
      text: "#4a1e28", muted: "rgba(74,30,40,0.5)", border: "rgba(74,30,40,0.13)",
      btn: "#4a1e28", btnText: "#faeaec", inputBg: "rgba(74,30,40,0.07)",
      bubbleAi: "rgba(74,30,40,0.07)", hoverBg: "rgba(74,30,40,0.05)",
      accent: "#7a3840", name: "Sakura",
    },
    ink: {
      bg: "#2a2824", surface: "#343230", panelBg: "#3c3a36",
      text: "#e8e0d4", muted: "rgba(232,224,212,0.44)", border: "rgba(232,224,212,0.1)",
      btn: "#e8e0d4", btnText: "#2a2824", inputBg: "rgba(232,224,212,0.07)",
      bubbleAi: "rgba(232,224,212,0.08)", hoverBg: "rgba(232,224,212,0.05)",
      accent: "#b8b0a4", name: "Ink",
    },
  };

  const FONTS = {
    sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono: '"Courier New", Courier, monospace',
  };

  /* ─── PANEL HTML ─────────────────────────────────────────── */
  function buildPanel() {
    const el = document.createElement("div");
    el.id = "mc-panel";
    el.innerHTML = `
      <div class="mc-header">
        <div class="mc-logo">
          <span class="mc-logo-mark">✦</span>
          <span class="mc-logo-name">Mail<b>Craft</b></span>
        </div>
        <div class="mc-header-right">
          <button class="mc-icon-btn" id="mc-theme-btn" title="Theme">◐</button>
          <button class="mc-icon-btn" id="mc-close-btn" title="Close">✕</button>
        </div>
      </div>

      <div class="mc-theme-drawer" id="mc-theme-drawer">
        <div class="mc-theme-drawer-inner">
          <div class="mc-drawer-label">Colour theme</div>
          <div class="mc-theme-dots" id="mc-dots">
            <button class="mc-dot mc-active" data-theme="clay"   style="background:#beb19e;" title="Clay"></button>
            <button class="mc-dot"           data-theme="stone"  style="background:#ccc9c2;" title="Stone"></button>
            <button class="mc-dot"           data-theme="moss"   style="background:#9aaa8a;" title="Moss"></button>
            <button class="mc-dot"           data-theme="mist"   style="background:#b8c8cc;" title="Mist"></button>
            <button class="mc-dot"           data-theme="dusk"   style="background:#b0a8c8;" title="Dusk"></button>
            <button class="mc-dot"           data-theme="sakura" style="background:#d8b8b8;" title="Sakura"></button>
            <button class="mc-dot"           data-theme="ink"    style="background:#2a2824;" title="Ink"></button>
          </div>
          <div class="mc-drawer-label" style="margin-top:2px">Type style</div>
          <div class="mc-font-row">
            <button class="mc-font-opt mc-active" data-font="sans">Clean</button>
            <button class="mc-font-opt"            data-font="serif">Serif</button>
            <button class="mc-font-opt"            data-font="mono">Mono</button>
          </div>
        </div>
      </div>

      <div class="mc-context" id="mc-context">
        <span class="mc-context-label">To</span>
        <span class="mc-context-to" id="mc-context-to">—</span>
      </div>

      <div class="mc-style-bar">
        <button class="mc-style-toggle" id="mc-style-toggle" title="Show style options">Style options ▸</button>
      </div>

      <div class="mc-style-controls" id="mc-style-controls">
        <div class="mc-section">
          <div class="mc-section-label">Tone</div>
          <div class="mc-pills" id="mc-tones">
            <button class="mc-pill mc-active" data-val="default">Default</button>
            <button class="mc-pill" data-val="direct">Direct</button>
            <button class="mc-pill" data-val="warm">Warm</button>
            <button class="mc-pill" data-val="formal">Formal</button>
            <button class="mc-pill" data-val="bold">Bold</button>
            <button class="mc-pill" data-val="curious">Curious</button>
          </div>
        </div>

        <div class="mc-section">
          <div class="mc-section-label">Email type</div>
          <div class="mc-pills" id="mc-types">
            <button class="mc-pill mc-active" data-val="default">Default</button>
            <button class="mc-pill" data-val="cold outreach">Cold</button>
            <button class="mc-pill" data-val="follow-up">Follow-up</button>
            <button class="mc-pill" data-val="post-demo">Post-demo</button>
            <button class="mc-pill" data-val="re-engagement">Re-engage</button>
            <button class="mc-pill" data-val="referral">Referral</button>
          </div>
        </div>
      </div>

      <div class="mc-chat" id="mc-chat">
        <div class="mc-message mc-ai">
          <div class="mc-msg-label">MailCraft AI</div>
          <div class="mc-msg-text">Hello — I'm ready to write your email. Add prospect context below and hit Generate.</div>
        </div>
      </div>

      <div class="mc-input-area">
        <textarea
          class="mc-textarea"
          id="mc-textarea"
          placeholder="Prospect name, company, role, pain point, goal…"
          rows="3"
        ></textarea>
        <div class="mc-action-row">
          <button class="mc-btn-generate" id="mc-generate">
            <span class="mc-gen-icon">✦</span>
            Generate
          </button>
          <button class="mc-btn-insert" id="mc-insert" disabled>
            Insert →
          </button>
        </div>
      </div>
    `;
    return el;
  }

  /* ─── APPLY THEME ────────────────────────────────────────── */
  function applyTheme(name) {
    const t = THEMES[name];
    if (!t) return;
    const p = document.getElementById("mc-panel");
    if (!p) return;
    p.style.setProperty("--mc-bg", t.bg);
    p.style.setProperty("--mc-surface", t.surface);
    p.style.setProperty("--mc-panel-bg", t.panelBg);
    p.style.setProperty("--mc-text", t.text);
    p.style.setProperty("--mc-muted", t.muted);
    p.style.setProperty("--mc-border", t.border);
    p.style.setProperty("--mc-btn", t.btn);
    p.style.setProperty("--mc-btn-text", t.btnText);
    p.style.setProperty("--mc-input-bg", t.inputBg);
    p.style.setProperty("--mc-bubble-ai", t.bubbleAi);
    p.style.setProperty("--mc-hover-bg", t.hoverBg);
    p.style.setProperty("--mc-bubble-user", t.btn);
    p.style.setProperty("--mc-bubble-user-text", t.btnText);
    // Sync compose buttons
    document.querySelectorAll(".mc-compose-btn").forEach((b) => {
      b.style.setProperty("background", t.btn, "important");
      b.style.setProperty("color", t.btnText, "important");
    });
    try {
      chrome.storage.sync.set({ mcTheme: name });
    } catch (e) {
      console.warn("MailCraft: Extension context invalidated. Please refresh the page.");
    }
  }

  function applyFont(name) {
    const f = FONTS[name];
    if (!f) return;
    const p = document.getElementById("mc-panel");
    if (p) p.style.fontFamily = f;
    try {
      chrome.storage.sync.set({ mcFont: name });
    } catch (e) {
      console.warn("MailCraft: Extension context invalidated. Please refresh the page.");
    }
  }

  /* ─── PANEL OPEN / CLOSE ─────────────────────────────────── */
  function openPanel(recipientEmail = "") {
    panelOpen = true;
    const p = document.getElementById("mc-panel");
    p.classList.add("mc-open");
    syncComposeShift();
    if (recipientEmail) {
      document.getElementById("mc-context-to").textContent = recipientEmail;
    }
    setTimeout(() => {
      document.getElementById("mc-textarea")?.focus();
    }, 420);
  }

  function closePanel() {
    panelOpen = false;
    document.getElementById("mc-panel")?.classList.remove("mc-open");
    syncComposeShift();
    if (themeOpen) toggleTheme();
  }

  function getComposeRoots() {
    const roots = new Set();
    const editors = document.querySelectorAll(
      '[contenteditable="true"][aria-label*="Message Body"], [contenteditable="true"][aria-label*="Body"], .Am.Al.editable[contenteditable="true"], [g_editable="true"][contenteditable="true"], [contenteditable="true"].editable, div[role="textbox"][contenteditable="true"]'
    );

    editors.forEach((el) => {
      if (!isVisible(el)) return;
      // Keep the shift scoped to compose popup containers only.
      const root = el.closest(".AD") || el.closest("div[role='dialog']");
      if (root) roots.add(root);
    });

    return Array.from(roots);
  }

  function syncComposeShift() {
    const shifted = document.querySelectorAll(".mc-compose-shifted");
    shifted.forEach((root) => root.classList.remove("mc-compose-shifted"));

    if (!panelOpen) return;

    const roots = getComposeRoots();
    roots.forEach((root) => root.classList.add("mc-compose-shifted"));
  }

  function toggleTheme() {
    themeOpen = !themeOpen;
    document.getElementById("mc-theme-drawer")?.classList.toggle("mc-open", themeOpen);
  }

  function toggleStyleControls() {
    styleOpen = !styleOpen;
    document.getElementById("mc-style-controls")?.classList.toggle("mc-open", styleOpen);
    const btn = document.getElementById("mc-style-toggle");
    if (btn) {
      btn.textContent = styleOpen ? "Style options ▾" : "Style options ▸";
    }
  }

  /* ─── MESSAGES ───────────────────────────────────────────── */
  function addMessage(text, role, isLoading = false) {
    const chat = document.getElementById("mc-chat");
    const wrap = document.createElement("div");
    wrap.className = `mc-message mc-${role}`;
    const id = "mc-msg-" + Date.now();
    wrap.id = id;
    const label = role === "ai" ? "MailCraft AI" : "You";
    wrap.innerHTML = `
      <div class="mc-msg-label">${label}</div>
      <div class="mc-msg-text">${
        isLoading
          ? `<span class="mc-dots"><span></span><span></span><span></span></span>`
          : escapeHtml(text).replace(/\n/g, "<br>")
      }</div>
    `;
    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
    return id;
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function removeMessage(id) {
    document.getElementById(id)?.remove();
  }

  function getStorage(keys) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(keys, (data) => resolve(data || {}));
    });
  }

  function createStreamingAiMessage() {
    const id = addMessage("", "ai", false);
    const wrap = document.getElementById(id);
    const textEl = wrap?.querySelector(".mc-msg-text");
    const chat = document.getElementById("mc-chat");
    let hasToken = false;

    if (wrap) wrap.classList.add("mc-streaming");
    if (textEl) {
      textEl.innerHTML = '<span class="mc-dots"><span></span><span></span><span></span></span>';
    }

    return {
      setText(text) {
        if (!textEl) return;
        hasToken = true;
        textEl.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
        if (chat) chat.scrollTop = chat.scrollHeight;
      },
      finish(finalText) {
        if (textEl && !hasToken) {
          textEl.innerHTML = escapeHtml(finalText || "").replace(/\n/g, "<br>");
        }
        wrap?.classList.remove("mc-streaming");
        if (chat) chat.scrollTop = chat.scrollHeight;
      },
      fail(msg) {
        if (textEl) {
          textEl.innerHTML = escapeHtml(msg).replace(/\n/g, "<br>");
        }
        wrap?.classList.remove("mc-streaming");
      },
      id,
    };
  }

  async function streamGenerate(prompt, onDelta) {
    const data = await getStorage(["mcModel", "mcUrl"]);
    const model = data.mcModel || "mailcraft";
    const baseUrl = (data.mcUrl || "http://localhost:11434").replace(/\/$/, "");

    const body = {
      model,
      prompt,
      stream: true,
      options: {
        temperature: 0.72,
        top_p: 0.9,
        num_predict: 220,
      },
    };

    const res = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
    }
    if (!res.body) {
      throw new Error("No response stream from Ollama.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;
        let chunk;
        try {
          chunk = JSON.parse(line);
        } catch {
          continue;
        }
        if (chunk.response) {
          full += chunk.response;
          onDelta(full);
        }
        if (chunk.done) {
          return full.trim();
        }
      }
    }

    if (buffer.trim()) {
      try {
        const chunk = JSON.parse(buffer.trim());
        if (chunk.response) {
          full += chunk.response;
          onDelta(full);
        }
      } catch {
        // ignore trailing parse issues
      }
    }

    return full.trim();
  }

  function estimateTypingDelay(text) {
    const len = text.length;
    if (len < 90) return 14;
    if (len < 220) return 9;
    return 6;
  }

  function typeAiMessage(text) {
    const id = addMessage("", "ai");
    const wrap = document.getElementById(id);
    const textEl = wrap?.querySelector(".mc-msg-text");
    const chat = document.getElementById("mc-chat");
    if (!textEl || !chat) {
      return;
    }

    let i = 0;
    const delay = estimateTypingDelay(text);
    const tick = () => {
      i = Math.min(i + 2, text.length);
      textEl.innerHTML = escapeHtml(text.slice(0, i)).replace(/\n/g, "<br>");
      chat.scrollTop = chat.scrollHeight;
      if (i < text.length) {
        setTimeout(tick, delay);
      }
    };
    tick();
  }

  function buildGenerationPrompt(recipient, userContext) {
    const hints = [];
    if (recipient && recipient !== "—") {
      hints.push(`Recipient: ${recipient}`);
    }
    if (selectedTone !== "default") {
      hints.push(`Tone: ${selectedTone}`);
    }
    if (selectedType !== "default") {
      hints.push(`Email type: ${selectedType}`);
    }
    if (!hints.length) {
      return userContext;
    }
    return `${hints.join(" | ")}\n\n${userContext}`;
  }

  /* ─── GENERATE ───────────────────────────────────────────── */
  async function handleGenerate() {
    const textarea = document.getElementById("mc-textarea");
    const prompt = textarea.value.trim();
    if (!prompt) {
      textarea.focus();
      return;
    }

    const btn = document.getElementById("mc-generate");
    btn.disabled = true;
    btn.classList.add("mc-loading");
    btn.innerHTML = `<span class="mc-dots"><span></span><span></span><span></span></span>`;

    const recipient = document.getElementById("mc-context-to")?.textContent || "";
    addMessage(prompt, "user");
    textarea.value = "";
    const streamMsg = createStreamingAiMessage();

    try {
      const fullPrompt = buildGenerationPrompt(recipient, prompt);
      const responseText = await streamGenerate(fullPrompt, (currentText) => {
        streamMsg.setText(currentText);
      });

      generatedEmail = responseText;
      streamMsg.finish(responseText);
      document.getElementById("mc-insert").disabled = !responseText;
    } catch (e) {
      streamMsg.fail("⚠ Connection error — check Ollama URL/model in extension popup.");
      document.getElementById("mc-insert").disabled = true;
    }

    btn.disabled = false;
    btn.classList.remove("mc-loading");
    btn.innerHTML = '<span class="mc-gen-icon">✦</span> Generate';
  }

  /* ─── INSERT INTO COMPOSE ────────────────────────────────── */
  function isVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
  }

  function getActiveComposeBody() {
    const focused = document.activeElement;
    if (focused && focused.getAttribute("contenteditable") === "true" && isVisible(focused)) {
      return focused;
    }

    const selectors = [
      '[contenteditable="true"][aria-label*="Message Body"]',
      '[contenteditable="true"][aria-label*="Body"]',
      '.Am.Al.editable[contenteditable="true"]',
      '[g_editable="true"][contenteditable="true"]',
      '[contenteditable="true"].editable',
      'div[role="textbox"][contenteditable="true"]',
    ];

    for (const sel of selectors) {
      const nodes = Array.from(document.querySelectorAll(sel)).filter(isVisible);
      if (nodes.length) {
        return nodes[nodes.length - 1];
      }
    }

    return null;
  }

  function splitSubjectAndBody(text) {
    const lines = (text || "").split(/\r?\n/);
    let subject = "";
    let subjectLineIndex = -1;

    for (let i = 0; i < Math.min(lines.length, 6); i++) {
      const line = lines[i].trim();
      const m = line.match(/^\**\s*subject\s*:\s*(.+?)\s*\**$/i);
      if (m) {
        subject = m[1].trim();
        subjectLineIndex = i;
        break;
      }
    }

    const bodyLines = subjectLineIndex >= 0
      ? lines.filter((_, idx) => idx !== subjectLineIndex)
      : lines;

    const body = bodyLines.join("\n").replace(/^\s+/, "");
    return { subject, body };
  }

  function findSubjectInput(composeBody) {
    const composeRoot = composeBody?.closest('div[role="dialog"], .AD, [data-message-id], .nH');
    const local = composeRoot?.querySelector('input[name="subjectbox"], input[aria-label*="Subject"]');
    if (local && isVisible(local)) return local;

    const global = Array.from(
      document.querySelectorAll('input[name="subjectbox"], input[aria-label*="Subject"]')
    ).filter(isVisible);
    return global[global.length - 1] || null;
  }

  function fillSubjectInput(input, subject) {
    if (!input || !subject) return;
    input.focus();
    input.value = subject;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function replaceComposeBodyText(bodyEl, text) {
    if (!bodyEl) return;
    bodyEl.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(bodyEl);
    selection.removeAllRanges();
    selection.addRange(range);

    const inserted = document.execCommand("insertText", false, text);
    if (!inserted) {
      bodyEl.textContent = text;
      bodyEl.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  function handleInsert() {
    if (!generatedEmail) return;

    const body = getActiveComposeBody();
    const parts = splitSubjectAndBody(generatedEmail);
    const subjectInput = findSubjectInput(body);

    if (body) {
      fillSubjectInput(subjectInput, parts.subject);
      replaceComposeBodyText(body, parts.body || generatedEmail);
      addMessage(
        parts.subject
          ? "✓ Inserted body + filled Subject field."
          : "✓ Inserted into your draft!",
        "ai"
      );
    } else {
      addMessage(
        "Could not find the compose window — make sure it's still open.",
        "ai"
      );
    }
  }

  /* ─── INJECT COMPOSE BUTTON ──────────────────────────────── */
  function injectComposeButton(toolbar) {
    if (toolbar.querySelector(".mc-compose-btn")) return;
    toolbar.setAttribute("data-mc", "1");

    const btn = document.createElement("button");
    btn.className = "mc-compose-btn";
    btn.title = "Generate email with MailCraft AI";
    btn.innerHTML = '<span class="mc-btn-spark">✦</span> MailCraft';

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Try to get recipient
      const compose = toolbar.closest('[data-message-id]') || document.querySelector(".nH .M9") || document.body;
      const recipientEl = compose?.querySelector('[email]') || compose?.querySelector('.vO span[email]');
      const email = recipientEl?.getAttribute("email") || "";
      openPanel(email);
    });

    toolbar.insertBefore(btn, toolbar.firstChild);
  }

  function scanForComposeToolbars() {
    // Gmail's compose toolbar - multiple possible selectors
    const toolbars = document.querySelectorAll(
      '.btC:not([data-mc]), [data-tooltip="Send"]:not([data-mc])'
    );
    toolbars.forEach((t) => {
      const bar = t.closest('.btC') || t.parentElement;
      if (bar && !bar.getAttribute("data-mc")) {
        injectComposeButton(bar);
      }
    });

    if (panelOpen) {
      syncComposeShift();
    }
  }

  /* ─── INIT ───────────────────────────────────────────────── */
  function init() {
    // Build + inject panel
    const panel = buildPanel();
    document.body.appendChild(panel);

    // Load saved prefs
    chrome.storage.sync.get(["mcTheme", "mcFont"], (data) => {
      if (data.mcTheme) {
        applyTheme(data.mcTheme);
        const dot = document.querySelector(`[data-theme="${data.mcTheme}"]`);
        document.querySelectorAll(".mc-dot").forEach((d) => d.classList.remove("mc-active"));
        dot?.classList.add("mc-active");
      }
      if (data.mcFont) {
        applyFont(data.mcFont);
        const opt = document.querySelector(`[data-font="${data.mcFont}"]`);
        document.querySelectorAll(".mc-font-opt").forEach((o) => o.classList.remove("mc-active"));
        opt?.classList.add("mc-active");
      }
    });

    // Header buttons
    document.getElementById("mc-close-btn").addEventListener("click", closePanel);
    document.getElementById("mc-theme-btn").addEventListener("click", toggleTheme);
    document.getElementById("mc-style-toggle").addEventListener("click", toggleStyleControls);

    // Theme dots
    document.getElementById("mc-dots").addEventListener("click", (e) => {
      const dot = e.target.closest(".mc-dot");
      if (!dot) return;
      document.querySelectorAll(".mc-dot").forEach((d) => d.classList.remove("mc-active"));
      dot.classList.add("mc-active");
      applyTheme(dot.getAttribute("data-theme"));
    });

    // Font opts
    document.querySelector(".mc-font-row").addEventListener("click", (e) => {
      const opt = e.target.closest(".mc-font-opt");
      if (!opt) return;
      document.querySelectorAll(".mc-font-opt").forEach((o) => o.classList.remove("mc-active"));
      opt.classList.add("mc-active");
      applyFont(opt.getAttribute("data-font"));
    });

    // Tone pills
    document.getElementById("mc-tones").addEventListener("click", (e) => {
      const pill = e.target.closest(".mc-pill");
      if (!pill) return;
      document.querySelectorAll("#mc-tones .mc-pill").forEach((p) => p.classList.remove("mc-active"));
      pill.classList.add("mc-active");
      selectedTone = pill.getAttribute("data-val");
    });

    // Type pills
    document.getElementById("mc-types").addEventListener("click", (e) => {
      const pill = e.target.closest(".mc-pill");
      if (!pill) return;
      document.querySelectorAll("#mc-types .mc-pill").forEach((p) => p.classList.remove("mc-active"));
      pill.classList.add("mc-active");
      selectedType = pill.getAttribute("data-val");
    });

    // Generate / Insert
    document.getElementById("mc-generate").addEventListener("click", handleGenerate);
    document.getElementById("mc-insert").addEventListener("click", handleInsert);

    // Textarea enter shortcut
    document.getElementById("mc-textarea").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
      }
    });

    // Watch for compose windows
    const obs = new MutationObserver(scanForComposeToolbars);
    obs.observe(document.body, { childList: true, subtree: true });
    scanForComposeToolbars();
  }

  // Wait for Gmail to load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
