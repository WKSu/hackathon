/*
 * Formulierlogica voor ontwerp.html en testen.html.
 *
 * De vragen staan in de HTML; dit script leest de structuur daaruit:
 *   - elk <fieldset class="step"> is één stap (.step-nr + .step-title),
 *   - elk veld heeft een name, id en bijbehorend <label for="...">.
 * Wie een vraag wil aanpassen, hoeft alleen de HTML te wijzigen.
 *
 * Er wordt niets verstuurd: antwoorden staan alleen in localStorage van
 * dit apparaat en worden gedownload als Markdown-bestand.
 */
(function () {
  "use strict";

  var form = document.querySelector("form[data-form]");
  if (!form) return;

  var STORAGE_KEY = "themadag:" + form.dataset.form + ":v1";
  var SHARED_PREFIX = "themadag:shared:";

  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var fields = Array.prototype.slice.call(form.querySelectorAll("input[name], textarea[name]"));
  var progressEl = document.querySelector("[data-progress]");
  var savedEl = document.querySelector("[data-saved]");
  var toastEl = document.querySelector("[data-toast]");

  // localStorage kan ontbreken of geblokkeerd zijn (privévenster, beleid)
  var storage = {
    read: function (key) {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    write: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    remove: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        /* niets te doen */
      }
    },
  };

  var storageWorks = storage.write("themadag:test", 1);
  storage.remove("themadag:test");

  /* ---------- Waarden lezen en schrijven ---------- */

  function getValue(field) {
    return field.type === "checkbox" ? field.checked : field.value;
  }

  function setValue(field, value) {
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value == null ? "" : String(value);
  }

  function isFilled(field) {
    return field.type === "checkbox" ? field.checked : field.value.trim() !== "";
  }

  function stepFields(step) {
    return Array.prototype.slice.call(step.querySelectorAll("input[name], textarea[name]"));
  }

  function stepIsFilled(step) {
    return stepFields(step).some(isFilled);
  }

  function collect() {
    var values = {};
    fields.forEach(function (field) {
      values[field.name] = getValue(field);
    });
    return values;
  }

  /* ---------- Weergave ---------- */

  // Textarea's printen niet volledig; daarom spiegelen we de tekst in een div
  function syncPrintCopy(field) {
    if (field.type === "checkbox") return;
    var copy = field.nextElementSibling;
    if (!copy || !copy.classList.contains("print-value")) {
      copy = document.createElement("div");
      copy.className = "print-value";
      copy.setAttribute("aria-hidden", "true");
      field.insertAdjacentElement("afterend", copy);
    }
    copy.textContent = field.value;
  }

  function autosize(field) {
    if (field.tagName !== "TEXTAREA") return;
    field.style.overflowY = "hidden";
    field.style.height = "auto";
    field.style.height = field.scrollHeight + 2 + "px";
  }

  function refresh(field) {
    syncPrintCopy(field);
    autosize(field);
  }

  function updateProgress() {
    var done = steps.filter(stepIsFilled).length;
    progressEl.textContent = done + " van " + steps.length + " stappen ingevuld";
  }

  function showSaved(date) {
    savedEl.classList.toggle("is-warning", !storageWorks);
    if (!storageWorks) {
      savedEl.textContent = "Automatisch bewaren werkt hier niet: download voordat je de pagina sluit";
    } else if (date) {
      savedEl.textContent = "Bewaard " + formatSavedAt(date);
    } else {
      savedEl.textContent = "Wordt automatisch bewaard";
    }
  }

  var toastTimer;
  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 4500);
  }

  /* ---------- Opslaan en herstellen ---------- */

  function save() {
    storageWorks = storage.write(STORAGE_KEY, { values: collect(), savedAt: new Date().toISOString() });
    // Teamnaam delen tussen ontwerp- en testformulier
    fields.forEach(function (field) {
      if (field.dataset.shared) storage.write(SHARED_PREFIX + field.dataset.shared, field.value);
    });
    showSaved(new Date());
  }

  function restore() {
    var saved = storage.read(STORAGE_KEY);
    var values = (saved && saved.values) || {};
    fields.forEach(function (field) {
      var value = values[field.name];
      if ((value == null || value === "") && field.dataset.shared) {
        value = storage.read(SHARED_PREFIX + field.dataset.shared);
      }
      if (value != null) setValue(field, value);
    });
    return saved;
  }

  /* ---------- Export: één opbouw, als Markdown en als opgemaakte HTML ---------- */

  var NOT_FILLED = "(niet ingevuld)";

  function cleanText(node) {
    if (!node) return "";
    var clone = node.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll(".req, .opt"), function (n) {
      n.remove();
    });
    return clone.textContent.replace(/\s+/g, " ").trim();
  }

  function labelFor(field) {
    return cleanText(form.querySelector('label[for="' + field.id + '"]')) || field.name;
  }

  // Het ingevulde formulier als lijst blokken; Markdown en HTML worden hieruit gemaakt
  function buildDocument() {
    var blocks = [
      { type: "title", text: form.dataset.title },
      { type: "text", text: form.dataset.subtitle },
    ];

    var meta = Array.prototype.slice.call(form.querySelectorAll(".meta-card input[name]")).map(function (field) {
      return { label: labelFor(field), value: field.value.trim() || "—" };
    });
    meta.push({ label: "Ingevuld op", value: formatDateTime(new Date()) });
    blocks.push({ type: "meta", items: meta });

    steps.forEach(function (step) {
      blocks.push({
        type: "step",
        text: cleanText(step.querySelector(".step-nr")) + " — " + cleanText(step.querySelector(".step-title")),
      });

      var all = stepFields(step);
      var checkboxes = all.filter(function (f) {
        return f.type === "checkbox";
      });
      var others = all.filter(function (f) {
        return f.type !== "checkbox";
      });

      if (checkboxes.length) {
        blocks.push({
          type: "checklist",
          items: checkboxes.map(function (cb) {
            return { label: labelFor(cb), checked: cb.checked };
          }),
        });
      }

      // Eén vrij tekstveld: alleen het antwoord. Meerdere velden: met tussenkopjes.
      if (others.length === 1 && !checkboxes.length) {
        blocks.push({ type: "answer", text: others[0].value.trim() });
      } else {
        others.forEach(function (field) {
          blocks.push({ type: "subhead", text: labelFor(field) });
          blocks.push({ type: "answer", text: field.value.trim() });
        });
      }
    });

    return blocks;
  }

  function toMarkdown(blocks) {
    var parts = blocks.map(function (block) {
      switch (block.type) {
        case "title":
          return "# " + block.text;
        case "step":
          return "## " + block.text;
        case "subhead":
          return "### " + block.text;
        case "meta":
          return block.items
            .map(function (item) {
              return "**" + item.label + ":** " + item.value;
            })
            .join("  \n");
        case "checklist":
          return block.items
            .map(function (item) {
              return "- [" + (item.checked ? "x" : " ") + "] " + item.label;
            })
            .join("\n");
        case "answer":
          return block.text || "_" + NOT_FILLED + "_";
        default:
          return block.text;
      }
    });
    return parts.join("\n\n") + "\n";
  }

  function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Opgemaakte versie: die gebruiken Teams en Outlook bij plakken
  function toHtml(blocks) {
    var parts = blocks.map(function (block) {
      switch (block.type) {
        case "title":
          return "<h2>" + escapeHtml(block.text) + "</h2>";
        case "step":
          return "<h3>" + escapeHtml(block.text) + "</h3>";
        case "subhead":
          return "<p><strong>" + escapeHtml(block.text) + "</strong></p>";
        case "meta":
          return (
            "<p>" +
            block.items
              .map(function (item) {
                return "<strong>" + escapeHtml(item.label) + ":</strong> " + escapeHtml(item.value);
              })
              .join("<br>") +
            "</p>"
          );
        case "checklist":
          return (
            "<ul>" +
            block.items
              .map(function (item) {
                return "<li>" + (item.checked ? "☑ " : "☐ ") + escapeHtml(item.label) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        case "answer":
          return block.text
            ? "<p>" + escapeHtml(block.text).replace(/\n/g, "<br>") + "</p>"
            : "<p><em>" + NOT_FILLED + "</em></p>";
        default:
          return "<p>" + escapeHtml(block.text) + "</p>";
      }
    });
    return parts.join("\n");
  }

  // Bestandsnaam volgens teamconventie: JJMMDD Auteur korte inhoud
  function fileName() {
    var team = form.elements.team.value.trim();
    var author = /^team\b/i.test(team) ? "Team" + team.slice(4) : "Team " + team;
    var topicField = form.elements[form.dataset.fileTopic];
    var topic = topicField ? topicField.value.trim() : "";
    var name = [yymmdd(new Date()), author, form.dataset.fileLabel, topic].filter(Boolean).join(" ");
    name = name
      .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);
    return name + ".md";
  }

  /* ---------- Acties ---------- */

  function requireTeam() {
    var team = form.elements.team;
    if (team.value.trim()) return true;
    team.setAttribute("aria-invalid", "true");
    team.focus();
    toast("Vul eerst jullie teamnaam in.");
    return false;
  }

  function emptyStepsWarning() {
    var empty = steps
      .filter(function (step) {
        return !stepIsFilled(step);
      })
      .map(function (step) {
        return cleanText(step.querySelector(".step-nr"));
      });
    if (!empty.length) return "";
    var list = empty.length === 1 ? empty[0] : empty.slice(0, -1).join(", ") + " en " + empty[empty.length - 1];
    return list + (empty.length === 1 ? " is" : " zijn") + " nog leeg.";
  }

  function download() {
    if (!requireTeam()) return;
    var warning = emptyStepsWarning();
    if (warning && !window.confirm(warning + " Toch downloaden?")) return;

    var blob = new Blob([toMarkdown(buildDocument())], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    toast("Gedownload als “" + link.download + "”. Zet het bestand in de Teams-chat of stuur het naar de AI-begeleiders.");
  }

  function fallbackCopy(text) {
    var helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    helper.remove();
    return ok;
  }

  // Kopieert opgemaakte tekst (voor Teams/Outlook) én platte Markdown (voor een AI-tool
  // of Kladblok); de plek waar je plakt kiest zelf de passende vorm.
  function copy() {
    if (!requireTeam()) return;
    var blocks = buildDocument();
    var text = toMarkdown(blocks);
    var html = toHtml(blocks);
    var warning = emptyStepsWarning();

    var done = function () {
      var note = warning ? " Let op: " + warning.replace(/Stap /g, "stap ") : "";
      toast("Gekopieerd! Plak de tekst in de Teams-chat." + note);
    };
    var failed = function () {
      if (fallbackCopy(text)) done();
      else toast("Kopiëren lukte niet. Gebruik de knop Download.");
    };
    var plainOnly = function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, failed);
      else failed();
    };

    var item = null;
    try {
      item = new ClipboardItem({
        "text/plain": new Blob([text], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      });
    } catch (e) {
      item = null; // oudere browser zonder ClipboardItem
    }
    if (item && navigator.clipboard && navigator.clipboard.write) navigator.clipboard.write([item]).then(done, plainOnly);
    else plainOnly();
  }

  function reset() {
    var question = "Weet je zeker dat je alle antwoorden op dit formulier wilt wissen? Dit kan niet ongedaan worden gemaakt.";
    if (!window.confirm(question)) return;
    storage.remove(STORAGE_KEY);
    fields.forEach(function (field) {
      if (field.dataset.shared) storage.remove(SHARED_PREFIX + field.dataset.shared);
      setValue(field, field.type === "checkbox" ? false : "");
      field.removeAttribute("aria-invalid");
      refresh(field);
    });
    updateProgress();
    showSaved(null);
    toast("Het formulier is leeggemaakt.");
  }

  var actions = {
    download: download,
    copy: copy,
    print: function () {
      window.print();
    },
    reset: reset,
  };

  /* ---------- Hulpfuncties voor datum en tijd ---------- */

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function yymmdd(date) {
    return pad(date.getFullYear() % 100) + pad(date.getMonth() + 1) + pad(date.getDate());
  }

  function formatTime(date) {
    return pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function formatDateTime(date) {
    return date.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }) + ", " + formatTime(date);
  }

  function formatSavedAt(date) {
    var today = new Date().toDateString() === date.toDateString();
    var day = today ? "" : date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" }) + " ";
    return "om " + day + formatTime(date);
  }

  /* ---------- Start ---------- */

  var saved = restore();
  fields.forEach(refresh);
  updateProgress();
  showSaved(saved && saved.savedAt ? new Date(saved.savedAt) : null);

  function onEdit(event) {
    var field = event.target;
    if (!field.name) return;
    field.removeAttribute("aria-invalid");
    refresh(field);
    updateProgress();
    save();
  }

  form.addEventListener("input", onEdit);
  form.addEventListener("change", onEdit);

  // Enter in een tekstveld mag het formulier niet 'versturen'
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-action]"), function (button) {
    button.addEventListener("click", function () {
      var action = actions[button.dataset.action];
      if (action) action();
    });
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      fields.forEach(autosize);
    }, 150);
  });
})();
