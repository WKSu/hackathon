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
      ["Het concept", r.concept],
      ["Wat is er gebouwd", r.gebouwd],
      ["Wat vonden de deelnemers", r.reflectie],
      ["Nog te controleren", r.controle],
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

    if (r.gevoelig) {
      body.appendChild(el("p", "demo-note", "Dit prototype delen we als HTML-bestand binnen de organisatie, niet via deze openbare site."));
    } else {
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
    }

    card.appendChild(body);
    return card;
  }

  if (!results.length) {
    grid.replaceWith(el("p", "empty-state", "Na de themadag verschijnen hier de resultaten per team: het concept, wat er gebouwd is en wat de deelnemers ervan vonden."));
    return;
  }

  countEl.textContent = results.length + (results.length === 1 ? " prototype" : " prototypes");
  grid.replaceChildren.apply(grid, results.map(renderCard));
})();
