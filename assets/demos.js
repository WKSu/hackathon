/*
 * Tekent de demokaarten op demos.html op basis van window.DEMOS (data/demos.js).
 */
(function () {
  "use strict";

  var grid = document.getElementById("demo-grid");
  var filterBar = document.getElementById("demo-filters");
  var countEl = document.getElementById("demo-count");
  if (!grid) return;

  var demos = (Array.isArray(window.DEMOS) ? window.DEMOS : []).filter(function (demo) {
    return demo && demo.titel;
  });

  // Kleurparen per thema, in volgorde van voorkomen. Bewust geen groen of geel:
  // die kleuren zijn gereserveerd voor de twee gemeenten.
  var PALETTE = [
    { bg: "#e5eefb", ink: "#1d4f91" },
    { bg: "#efe8fb", ink: "#5b3a99" },
    { bg: "#e0f4f6", ink: "#0f6670" },
    { bg: "#fbe7ea", ink: "#9b2c3f" },
    { bg: "#eceff3", ink: "#3d4a5c" },
  ];

  // Klasse per gemeente; de kleuren staan in style.css
  var CITY_CLASS = { rotterdam: "city-rotterdam", "den haag": "city-denhaag" };

  var ALL = "Alle";
  var themes = [];
  demos.forEach(function (demo) {
    var theme = demo.thema || "Overig";
    if (themes.indexOf(theme) === -1) themes.push(theme);
  });
  var activeTheme = ALL;

  function colorsFor(theme) {
    return PALETTE[themes.indexOf(theme) % PALETTE.length];
  }

  // Kleine helper: element maken met tekst (textContent, dus geen HTML-injectie)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderCard(demo) {
    var theme = demo.thema || "Overig";
    var colors = colorsFor(theme);
    var cityClass = CITY_CLASS[String(demo.gemeente || "").toLowerCase()] || "";
    var card = el("article", "demo-card " + cityClass);
    card.style.setProperty("--theme-bg", colors.bg);
    card.style.setProperty("--theme-ink", colors.ink);

    if (demo.afbeelding) {
      var media = el("div", "demo-media");
      var img = el("img");
      img.src = demo.afbeelding;
      img.alt = "Schermafbeelding van " + demo.titel;
      img.loading = "lazy";
      media.appendChild(img);
      card.appendChild(media);
    }

    var body = el("div", "demo-body");

    var tags = el("div", "demo-tags");
    if (demo.gemeente) tags.appendChild(el("span", "pill pill-city", demo.gemeente));
    tags.appendChild(el("span", "pill", theme));
    if (demo.voorbeeld) tags.appendChild(el("span", "pill pill-example", "Voorbeeldkaart"));
    body.appendChild(tags);

    body.appendChild(el("h2", "demo-title", demo.titel));
    if (demo.beschrijving) body.appendChild(el("p", null, demo.beschrijving));

    var facts = [
      ["Rol van AI", demo.rolVanAI || demo.watDoetAI],
      ["Gebouwd met", demo.gebouwdMet],
      ["Gemaakt door", demo.gemaaktDoor],
      ["Bouwtijd", demo.bouwtijd],
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

    if (demo.voorbeeld) {
      body.appendChild(el("p", "demo-note", "Dit is een voorbeeld. Vervang deze kaart in data/demos.js door een echte demo."));
    }

    var links = Array.isArray(demo.links) ? demo.links : [];
    if (links.length) {
      var linkBar = el("div", "demo-links");
      links.forEach(function (link, index) {
        if (!link || !link.url) return;
        var a = el("a", index === 0 ? "btn btn-primary btn-sm" : "btn btn-sm", link.tekst || "Bekijk demo");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(el("span", "visually-hidden", " (opent in nieuw tabblad)"));
        linkBar.appendChild(a);
      });
      body.appendChild(linkBar);
    }

    card.appendChild(body);
    return card;
  }

  function countLabel(n) {
    return n + (n === 1 ? " demo" : " demo's");
  }

  function render() {
    var visible = demos.filter(function (demo) {
      return activeTheme === ALL || (demo.thema || "Overig") === activeTheme;
    });
    grid.replaceChildren.apply(grid, visible.map(renderCard));
    countEl.textContent = countLabel(visible.length) + (activeTheme === ALL ? "" : " in " + activeTheme);
  }

  function renderFilters() {
    if (themes.length < 2) {
      filterBar.hidden = true;
      return;
    }
    [ALL].concat(themes).forEach(function (theme) {
      var button = el("button", "chip", theme);
      button.type = "button";
      button.setAttribute("aria-pressed", String(theme === activeTheme));
      button.addEventListener("click", function () {
        activeTheme = theme;
        Array.prototype.forEach.call(filterBar.children, function (chip) {
          chip.setAttribute("aria-pressed", String(chip === button));
        });
        render();
      });
      filterBar.appendChild(button);
    });
  }

  if (!demos.length) {
    filterBar.hidden = true;
    grid.replaceWith(el("p", "empty-state", "Er zijn nog geen demo's toegevoegd. Kom later terug!"));
    return;
  }

  renderFilters();
  render();
})();
