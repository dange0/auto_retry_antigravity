(() => {
  const RETRY_LABELS = ["retry", "try again", "重试", "重新尝试"];
  const CLICK_COOLDOWN_MS = 1500;
  const lastClick = new WeakMap();

  function isDisabled(el) {
    return el.disabled || el.getAttribute("aria-disabled") === "true";
  }

  function getText(el) {
    return (el.innerText || el.textContent || "").trim().toLowerCase();
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function matchesRetry(el) {
    const text = getText(el);
    return RETRY_LABELS.some(label => text.includes(label));
  }

  function clickIfRetry(el) {
    if (!el || isDisabled(el) || !isVisible(el) || !matchesRetry(el)) return false;
    const now = Date.now();
    const prev = lastClick.get(el) || 0;
    if (now - prev < CLICK_COOLDOWN_MS) return false;
    lastClick.set(el, now);
    try {
      el.click();
      return true;
    } catch (_) {
      return false;
    }
  }

  function findAndClick(root) {
    let clicked = false;

    // 1) Exact class match from your DOM
    const exact = root.querySelectorAll?.("button.cursor-pointer.bg-ide-button-background") || [];
    for (const el of exact) {
      if (clickIfRetry(el)) clicked = true;
    }

    // 2) Fallbacks
    const candidates = root.querySelectorAll?.("button, [role='button'], .monaco-button") || [];
    for (const el of candidates) {
      if (clickIfRetry(el)) clicked = true;
    }

    return clicked;
  }

  function collectRoots() {
    const roots = [];
    const seen = new Set();
    const stack = [document];

    while (stack.length) {
      const root = stack.pop();
      if (!root || seen.has(root)) continue;
      seen.add(root);
      roots.push(root);

      const all = root.querySelectorAll ? root.querySelectorAll("*") : [];
      for (const el of all) {
        if (el.shadowRoot) stack.push(el.shadowRoot);
        if (el.tagName === "IFRAME") {
          try {
            if (el.contentDocument) stack.push(el.contentDocument);
          } catch (_) {
            // cross-origin iframe, ignore
          }
        }
      }
    }

    return roots;
  }

  function run() {
    const roots = collectRoots();
    for (const root of roots) findAndClick(root);
  }

  window.addEventListener("load", () => {
    run();
    setInterval(run, 500);
    const obs = new MutationObserver(run);
    obs.observe(document.documentElement, { childList: true, subtree: true });
  });
})();
