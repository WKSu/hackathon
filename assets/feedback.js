/*
 * Feedbackpagina (feedback.html?p=<id>): één formulier voor alle prototypes.
 *
 * Dit script draait vóór forms.js. Het zoekt het prototype op in window.RESULTATEN
 * (data/resultaten.js), vult kop en uitleg, en geeft het formulier een eigen
 * opslagnaam per prototype. Zonder geldig id toont het een keuzelijst.
 */
(function () {
  "use strict";

  var results = Array.isArray(window.RESULTATEN) ? window.RESULTATEN : [];
  var id = new URLSearchParams(window.location.search).get("p") || window.location.hash.slice(1);
  var r = results.filter(function (x) {
    return x && x.id && x.id === id;
  })[0];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function q(selector) {
    return document.querySelector(selector);
  }

  // Geen of onbekend prototype: laat kiezen
  if (!r) {
    var lijst = q("[data-fb-lijst]");
    results
      .filter(function (x) {
        return x && x.id;
      })
      .forEach(function (x) {
        var li = el("li");
        var a = el("a", null, x.titel);
        a.href = "feedback.html?p=" + encodeURIComponent(x.id);
        li.appendChild(a);
        if (x.team) li.appendChild(el("span", "fb-lijst-team", " · " + x.team));
        lijst.appendChild(li);
      });
    q("[data-fb-kies]").hidden = false;
    return;
  }

  document.title = "Feedback: " + r.titel + " – AI × Mobiliteit";
  q("[data-fb-eyebrow]").textContent = ["Feedback", r.team].filter(Boolean).join(" · ");
  q("[data-fb-title]").textContent = r.titel;

  // Uitleg: dezelfde inhoud als achter "Hoe werkt het?" op de prototypepagina
  var u = r.uitleg || {};
  var body = q("[data-fb-uitleg-body]");
  function section(title, node) {
    if (!node) return;
    body.appendChild(el("h3", null, title));
    body.appendChild(node);
  }
  function list(items) {
    if (!items || !items.length) return null;
    var ul = el("ul");
    items.forEach(function (item) {
      ul.appendChild(el("li", null, item));
    });
    return ul;
  }
  var over = q("#fb-over");
  if (r.wat) over.insertAdjacentElement("afterend", el("p", "fb-wat", r.wat));
  section("Hoe is het gebouwd?", u.bouw ? el("p", null, u.bouw) : null);
  section("Wat zit erin?", list(u.functies));
  section("Wat kan het nog niet?", list(u.nogNiet));
  section("Let op", r.controle ? el("p", null, r.controle) : null);
  if (!body.children.length) q(".fb-details").hidden = true;

  // Links: het prototype zelf, en een uitgebreid toetsformulier als dat er is
  var links = q("[data-fb-links]");
  (r.links || []).forEach(function (link, index) {
    if (!link || !link.url) return;
    var isToets = /^toetsing-/.test(link.url);
    if (!(index === 0 && !r.gevoelig) && !isToets) return;
    var a = el("a", index === 0 ? "btn btn-primary btn-sm" : "btn btn-sm", isToets ? "Uitgebreid toetsformulier" : link.tekst || "Open prototype");
    a.href = link.url;
    if (!isToets) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    links.appendChild(a);
  });
  var terug = el("a", "btn btn-ghost btn-sm", "Alle prototypes");
  terug.href = "resultaten.html";
  links.appendChild(terug);
  q("[data-fb-uitleg]").hidden = false;

  // Formulier: eigen opslag per prototype, titel en bestandsnaam met het prototype
  var form = q("[data-fb-form]");
  form.dataset.form = "feedback-" + r.id;
  form.dataset.title = "Feedback: " + r.titel;
  form.dataset.fileLabel = "feedback " + r.id.replace(/-/g, " ");
  form.hidden = false;
})();
