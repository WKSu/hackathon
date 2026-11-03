// Gedeelde hulpfuncties voor de themadag-prototypes.
(function () {
  const nf = (d) => new Intl.NumberFormat("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d });
  const cache = {};
  window.fmt = function (v, d = 0) {
    if (v === null || v === undefined || Number.isNaN(v)) return "–";
    if (!Number.isFinite(v)) return "∞";
    return (cache[d] ||= nf(d)).format(v);
  };
  window.$ = (sel, root = document) => root.querySelector(sel);
  window.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  window.clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // Eén tooltip voor de hele pagina.
  let tipEl = null;
  window.tip = {
    show(html, ev) {
      if (!tipEl) { tipEl = document.createElement("div"); tipEl.className = "tip"; document.body.appendChild(tipEl); }
      tipEl.innerHTML = html; tipEl.classList.add("show"); this.move(ev);
    },
    move(ev) {
      if (!tipEl || !ev) return;
      const pad = 14, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      let x = ev.clientX + pad, y = ev.clientY + pad;
      if (x + w > innerWidth - 8) x = ev.clientX - w - pad;
      if (y + h > innerHeight - 8) y = ev.clientY - h - pad;
      tipEl.style.left = x + "px"; tipEl.style.top = y + "px";
    },
    hide() { tipEl && tipEl.classList.remove("show"); },
  };

  // Segmented control: <div class="seg" data-name="x"><button data-v="a">..</button></div>
  window.segmented = function (el, onChange) {
    const btns = $$("button", el);
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.toggle("on", x === b));
      onChange(b.dataset.v);
    }));
    return {
      set(v) { btns.forEach((x) => x.classList.toggle("on", x.dataset.v === String(v))); },
      get() { const on = btns.find((x) => x.classList.contains("on")); return on && on.dataset.v; },
    };
  };

  // SVG-helper
  window.svgEl = function (tag, attrs = {}, parent) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (parent) parent.appendChild(el);
    return el;
  };
})();

// Korte melding onderin beeld.
window.toast = (function () {
  let el, t;
  return function (msg, ms = 2600) {
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(t); t = setTimeout(() => el.classList.remove("show"), ms);
  };
})();
// Nederlands meervoud: plural(1, "plaats", "plaatsen") -> "1 plaats"
window.plural = (n, one, many) => `${fmt(n)} ${Math.abs(n) === 1 ? one : many}`;
