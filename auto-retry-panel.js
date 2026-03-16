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
    if (!text || text.length > 30) return false;
    return RETRY_LABELS.some(label => {
      if (text === label) return true;
      if (text.includes(label) && text.length <= label.length + 8) return true;
      return false;
    });
  }

  function isSafeToClick(el) {
    // Exact button tags are usually safe
    if (el.tagName === "BUTTON" || (el.classList && el.classList.contains("monaco-button"))) return true;
    // Don't click internal IDE tree structures that aren't buttons
    if (el.closest && el.closest(".part.sidebar, .pane-header, .monaco-list, .monaco-list-row")) return false;
    return true;
  }

  function clickIfRetry(el) {
    if (!el || isDisabled(el) || !isVisible(el) || !matchesRetry(el) || !isSafeToClick(el)) return false;
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
    const exact = root.querySelectorAll?.("button.cursor-pointer.bg-ide-button-background") || [];
    for (const el of exact) if (clickIfRetry(el)) clicked = true;

    const candidates = root.querySelectorAll?.("button, [role='button']") || [];
    for (const el of candidates) if (clickIfRetry(el)) clicked = true;

    return clicked;
  }

  function run() {
    findAndClick(document);
  }

  window.addEventListener("load", () => {
    run();
    setInterval(run, 500);
    const obs = new MutationObserver(run);
    obs.observe(document.documentElement, { childList: true, subtree: true });
  });
})();
