/*
 * Tekent de resultaatkaarten op resultaten.html op basis van window.RESULTATEN
 * (data/resultaten.js). Gebruikt dezelfde kaartstijl als de demo's.
 */
(function () {
  "use strict";

  var grid = document.getElementById("result-grid");
  var countEl = document.getElementById("result-count");
  if (!grid) return;

  var results = (Array.isArray(window.RESULTATEN) ? window.RESULTATEN : []).filter(function (r) {
    return r && r.titel;
  });

  // Element maken met tekst (textContent, dus geen HTML-injectie)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderCard(r) {
    var card = el("article", "demo-card city-beide");

    if (r.afbeelding) {
      var media = el("div", "demo-media");
      var img = el("img");
      img.src = r.afbeelding;
      img.alt = "Beeld van " + r.titel;
      img.loading = "lazy";
      media.appendChild(img);
      card.appendChild(media);
    }

    var body = el("div", "demo-body");
    var tags = el("div", "demo-tags");
    if (r.team) tags.appendChild(el("span", "pill pill-city", r.team));
    if (r.casus) tags.appendChild(el("span", "pill", r.casus));
    if (tags.children.length) body.appendChild(tags);
    body.appendChild(el("h2", "demo-title", r.titel));

    var facts = [
      ["Wat is het", r.wat],
      ["De uitdaging", r.uitdaging],
      ["Zo gebruik je het", r.gebruik],
      ["Wat vonden de deelnemers", r.reflectie],
      ["Let op", r.controle],
    ].filter(function (fact) {
      return fact[1];
    });
    if (facts.length) {
      var list = el("dl", "demo-facts");
      facts.forEach(function (fact) {
        var row = el("div");
        row.appendChild(el("dt", null, fact[0]));
        row.appendChild(el("dd", null, fact[1]));
        list.appendChild(row);
      });
      body.appendChild(list);
    }

    // Gevoelig: het prototype zelf staat niet online, maar losse links (zoals een formulier) wel
    if (r.gevoelig) {
      body.appendChild(el("p", "demo-note", "Dit prototype delen we als HTML-bestand binnen de organisatie, niet via deze openbare site."));
    }
    var links = Array.isArray(r.links) ? r.links : [];
    if (links.length) {
      var linkBar = el("div", "demo-links");
      links.forEach(function (link, index) {
        if (!link || !link.url) return;
        var a = el("a", index === 0 ? "btn btn-primary btn-sm" : "btn btn-sm", link.tekst || "Open prototype");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(el("span", "visually-hidden", " (opent in nieuw tabblad)"));
        linkBar.appendChild(a);
      });
      body.appendChild(linkBar);
    }

    // Uitleg en feedback: per prototype dezelfde twee knoppen
    if (r.id) {
      var extra = el("div", "demo-extra");
      if (r.uitleg) {
        var explain = el("button", "btn btn-sm", "Hoe werkt het?");
        explain.type = "button";
        explain.addEventListener("click", function () {
          openUitleg(r, explain);
        });
        extra.appendChild(explain);
      }
      var feedback = el("a", "btn btn-sm", "Geef feedback");
      feedback.href = "feedback.html?p=" + encodeURIComponent(r.id);
      extra.appendChild(feedback);
      body.appendChild(extra);
    }

    card.appendChild(body);
    return card;
  }

  /* ---------- Uitlegvenster ---------- */

  var dialog = document.getElementById("uitleg");

  function list(items) {
    var ul = el("ul");
    (items || []).forEach(function (item) {
      ul.appendChild(el("li", null, item));
    });
    return ul;
  }

  function uitlegContent(r) {
    var frag = document.createDocumentFragment();
    var u = r.uitleg || {};
    var sections = [
      ["Hoe is het gebouwd?", u.bouw ? el("p", null, u.bouw) : null],
      ["Wat zit erin?", u.functies && u.functies.length ? list(u.functies) : null],
      ["Wat kan het nog niet?", u.nogNiet && u.nogNiet.length ? list(u.nogNiet) : null],
      ["Let op", r.controle ? el("p", null, r.controle) : null],
    ];
    sections.forEach(function (section) {
      if (!section[1]) return;
      frag.appendChild(el("h3", null, section[0]));
      frag.appendChild(section[1]);
    });
    return frag;
  }

  var returnFocus = null;
  function openUitleg(r, opener) {
    if (!dialog || typeof dialog.showModal !== "function") {
      window.location.href = "feedback.html?p=" + encodeURIComponent(r.id);
      return;
    }
    returnFocus = opener;
    dialog.querySelector("[data-uitleg-title]").textContent = r.titel;
    dialog.querySelector("[data-uitleg-team]").textContent = [r.team, r.casus].filter(Boolean).join(" · ");
    dialog.querySelector("[data-uitleg-body]").replaceChildren(uitlegContent(r));
    var actions = dialog.querySelector("[data-uitleg-actions]");
    actions.replaceChildren();
    var first = (r.links || []).filter(function (l) {
      return l && l.url;
    })[0];
    if (first && !r.gevoelig) {
      var open = el("a", "btn btn-primary btn-sm", first.tekst || "Open prototype");
      open.href = first.url;
      open.target = "_blank";
      open.rel = "noopener";
      actions.appendChild(open);
    }
    var fb = el("a", "btn btn-sm", "Geef feedback");
    fb.href = "feedback.html?p=" + encodeURIComponent(r.id);
    actions.appendChild(fb);
    dialog.showModal();
  }

  if (dialog) {
    dialog.addEventListener("click", function (event) {
      // Klik op de achtergrond of de sluitknop sluit het venster
      if (event.target === dialog || event.target.closest("[data-uitleg-close]")) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (returnFocus) returnFocus.focus();
    });
  }

  if (!results.length) {
    grid.replaceWith(el("p", "empty-state", "Na de themadag verschijnen hier de resultaten per team: het concept, wat er gebouwd is en wat de deelnemers ervan vonden."));
    return;
  }

  countEl.textContent = results.length + (results.length === 1 ? " prototype" : " prototypes");
  grid.replaceChildren.apply(grid, results.map(renderCard));
})();
