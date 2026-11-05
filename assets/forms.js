/*
 * Formulierlogica voor ontwerp.html, testen.html en de toetsformulieren.
 *
 * De vragen staan in de HTML; dit script leest de structuur daaruit:
 *   - elk <fieldset class="step"> is één stap (.step-nr + .step-title),
 *   - elk veld heeft een name, id en bijbehorend <label for="...">.
 * Wie een vraag wil aanpassen, hoeft alleen de HTML te wijzigen.
 *
 * Extra voor de toetsformulieren:
 *   - .q met .q-title: één vraag; de export toont per vraag de gekozen opties
 *     (.choice[data-label]) en ingevulde velden (data-label, data-unit),
 *   - .choice[data-max]: maximaal zoveel vinkjes,
 *   - .step[data-export="table"]: tabel met tr[data-row]; alleen gewijzigde
 *     rijen gaan mee (keuzelijsten met data-default),
 *   - data-file-author op het formulier: veld voor de naam in bestand en onderwerp.
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
  var FIELD_SELECTOR = "input[name], textarea[name], select[name]";
  var fields = Array.prototype.slice.call(form.querySelectorAll(FIELD_SELECTOR));
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

  function all(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
  }

  function isToggle(field) {
    return field.type === "checkbox" || field.type === "radio";
  }

  function getValue(field) {
    return field.type === "checkbox" ? field.checked : field.value;
  }

  function setValue(field, value) {
    if (field.type === "checkbox") field.checked = Boolean(value);
    else if (field.type === "radio") field.checked = value != null && field.value === String(value);
    else field.value = value == null ? "" : String(value);
  }

  // Keuzelijsten hebben een voorgevulde waarde; pas een afwijking telt als ingevuld
  function defaultValue(field) {
    if (field.type === "checkbox") return false;
    if (field.tagName === "SELECT") return field.dataset.default || "";
    return "";
  }

  function isFilled(field) {
    if (isToggle(field)) return field.checked;
    if (field.tagName === "SELECT") return field.value !== defaultValue(field);
    return field.value.trim() !== "";
  }

  function stepFields(step) {
    return all(step, FIELD_SELECTOR);
  }

  function stepIsFilled(step) {
    return stepFields(step).some(isFilled);
  }

  function collect() {
    var values = {};
    fields.forEach(function (field) {
      if (field.type !== "radio") values[field.name] = getValue(field);
      else if (field.checked) values[field.name] = field.value;
      else if (!(field.name in values)) values[field.name] = "";
    });
    return values;
  }

  /* ---------- Weergave ---------- */

  // Textarea's printen niet volledig; daarom spiegelen we de tekst in een div
  function syncPrintCopy(field) {
    if (field.tagName !== "TEXTAREA" && field.type !== "text") return;
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

  // Gewijzigde tabelrijen krijgen een kleur, zodat je ziet wat je hebt aangepast
  function markRow(field) {
    var row = field.closest("tr[data-row]");
    if (row) row.classList.toggle("is-changed", all(row, FIELD_SELECTOR).some(isFilled));
  }

  function refresh(field) {
    syncPrintCopy(field);
    autosize(field);
    markRow(field);
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
  var NOT_ANSWERED = "(niet beantwoord)";

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

      if (step.dataset.export === "table") {
        var changed = tableChanges(step);
        blocks.push(changed.length ? { type: "list", items: changed } : { type: "text", text: "Geen wijzigingen." });
        return;
      }

      all(step, ".q").forEach(function (question) {
        blocks.push({ type: "subhead", text: questionTitle(question) });
        blocks.push({ type: "lines", items: questionLines(question) });
      });

      // Velden buiten een vraagblok: zoals in ontwerp en testen
      var loose = stepFields(step).filter(function (f) {
        return !f.closest(".q");
      });
      if (!loose.length) return;
      var checkboxes = loose.filter(function (f) {
        return f.type === "checkbox";
      });
      var others = loose.filter(function (f) {
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
      if (others.length === 1 && !checkboxes.length && !step.querySelector(".q")) {
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

  // "3 Tekst" in beeld wordt "3. Tekst" in de export
  function questionTitle(question) {
    var title = question.querySelector(".q-title");
    var nr = title && title.querySelector(".q-nr");
    if (!nr) return cleanText(title);
    var rest = title.cloneNode(true);
    rest.querySelector(".q-nr").remove();
    return cleanText(nr) + ". " + cleanText(rest);
  }

  function prefixed(label, value) {
    return label ? label + ": " + value : value;
  }

  function fieldText(field) {
    if (field.tagName === "SELECT") return field.options[field.selectedIndex] ? field.options[field.selectedIndex].text : "";
    var value = field.value.trim();
    return value && field.dataset.unit ? value + " " + field.dataset.unit : value;
  }

  // Eén vraag als regels, bijvoorbeeld "Oordeel: Klopt niet" en "Toelichting: ..."
  function questionLines(question) {
    var lines = [];
    all(question, ".choice").forEach(function (group) {
      var picked = all(group, "input:checked").map(labelFor);
      if (picked.length) lines.push(prefixed(group.dataset.label, picked.join(", ")));
    });
    all(question, FIELD_SELECTOR).forEach(function (field) {
      if (field.closest(".choice") || !isFilled(field)) return;
      lines.push(prefixed(field.dataset.label, fieldText(field)));
    });
    return lines;
  }

  // Alleen de rijen die iemand heeft aangepast, met de oorspronkelijke waarde erbij
  function tableChanges(step) {
    return all(step, "tr[data-row]")
      .map(function (row) {
        var changes = all(row, FIELD_SELECTOR)
          .filter(isFilled)
          .map(function (field) {
            var text = prefixed(field.dataset.label, fieldText(field));
            var original = field.tagName === "SELECT" && field.dataset.default ? field.querySelector('option[value="' + field.dataset.default + '"]') : null;
            return original ? text + " (was: " + original.text + ")" : text;
          });
        return changes.length ? row.dataset.row + ": " + changes.join("; ") : "";
      })
      .filter(Boolean);
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
        case "lines":
          return block.items.length ? block.items.join("  \n") : "_" + NOT_ANSWERED + "_";
        case "list":
          return block.items
            .map(function (item) {
              return "- " + item;
            })
            .join("\n");
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
        case "lines":
          return block.items.length
            ? "<p>" + block.items.map(escapeHtml).join("<br>").replace(/\n/g, "<br>") + "</p>"
            : "<p><em>" + NOT_ANSWERED + "</em></p>";
        case "list":
          return (
            "<ul>" +
            block.items
              .map(function (item) {
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        default:
          return "<p>" + escapeHtml(block.text) + "</p>";
      }
    });
    return parts.join("\n");
  }

  // Bestandsnaam volgens teamconventie: JJMMDD Auteur korte inhoud
  function teamLabel() {
    if (form.dataset.fileAuthor) return form.elements[form.dataset.fileAuthor].value.trim();
    var team = form.elements.team.value.trim();
    return /^team\b/i.test(team) ? "Team" + team.slice(4) : "Team " + team;
  }

  function topicValue() {
    var topicField = form.elements[form.dataset.fileTopic];
    return topicField ? topicField.value.trim() : "";
  }

  function fileName() {
    var name = [yymmdd(new Date()), teamLabel(), form.dataset.fileLabel, topicValue()].filter(Boolean).join(" ");
    name = name
      .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);
    return name + ".md";
  }

  /* ---------- Acties ---------- */

  function requireTeam() {
    var field = form.querySelector(".meta-card [required]");
    if (!field || field.value.trim()) return true;
    field.setAttribute("aria-invalid", "true");
    field.focus();
    toast(form.dataset.requiredMessage || "Vul eerst jullie teamnaam in.");
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
    toast("Gedownload als “" + link.download + "”. Voeg het bestand toe aan een e-mail aan de begeleiders.");
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

  // Kopieert opgemaakte tekst (voor Outlook of Teams) én platte Markdown (voor een AI-tool
  // of Kladblok); de plek waar je plakt kiest zelf de passende vorm.
  // `then(gelukt, opmerking)` bepaalt wat er na het kopiëren gebeurt.
  function copy(then) {
    if (!requireTeam()) return;
    var blocks = buildDocument();
    var text = toMarkdown(blocks);
    var html = toHtml(blocks);
    var warning = emptyStepsWarning();
    var note = warning ? " Let op: " + warning.replace(/Stap /g, "stap ") : "";
    then =
      typeof then === "function"
        ? then
        : function (ok) {
            toast(ok ? "Gekopieerd! Plak de tekst in een e-mail aan de begeleiders." + note : "Kopiëren lukte niet. Gebruik de knop Download.");
          };

    var done = function () {
      then(true, note);
    };
    var failed = function () {
      then(fallbackCopy(text), note);
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

  // Nieuwe mail met ingevuld onderwerp. Het adres geven de begeleiders in de sessie,
  // daarom laten we het leeg. De formuliertekst gaat via het klembord: lange tekst in
  // een mailto-link wordt door Outlook zonder melding afgekapt.
  function mail() {
    copy(function (ok, note) {
      var topic = topicValue();
      var subject = "Themadag: " + form.dataset.fileLabel + " " + teamLabel() + (topic ? " – " + topic : "");
      var body = ok ? "Plak hier het formulier (Ctrl+V)." : "Voeg hier het gedownloade formulier toe als bijlage.";
      window.location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      toast(
        ok
          ? "Tekst gekopieerd. Vul in de mail het adres van de begeleiders in en plak het formulier (Ctrl+V)." + note
          : "Kopiëren lukte niet. Klik op Download en voeg het bestand toe aan de mail."
      );
    });
  }

  function reset() {
    var question = "Weet je zeker dat je alle antwoorden op dit formulier wilt wissen? Dit kan niet ongedaan worden gemaakt.";
    if (!window.confirm(question)) return;
    storage.remove(STORAGE_KEY);
    fields.forEach(function (field) {
      if (field.dataset.shared) storage.remove(SHARED_PREFIX + field.dataset.shared);
      setValue(field, defaultValue(field));
      field.removeAttribute("aria-invalid");
      refresh(field);
    });
    updateProgress();
    showSaved(null);
    toast("Het formulier is leeggemaakt.");
  }

  var actions = {
    download: download,
    copy: function () {
      copy();
    },
    mail: mail,
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

  // Bij .choice[data-max] gaat het vinkje dat te veel is er meteen weer af
  function overMax(field) {
    var group = field.type === "checkbox" && field.checked && field.closest(".choice[data-max]");
    if (!group) return false;
    var max = Number(group.dataset.max);
    if (group.querySelectorAll("input:checked").length <= max) return false;
    field.checked = false;
    toast("Kies er maximaal " + max + ".");
    return true;
  }

  function onEdit(event) {
    var field = event.target;
    if (!field.name || overMax(field)) return;
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

  // Zoekveld boven een lange tabel: rijen en lege groepskoppen verbergen
  all(document, "[data-filter]").forEach(function (input) {
    var table = document.getElementById(input.dataset.filter);
    var countEl = input.dataset.count ? document.getElementById(input.dataset.count) : null;
    function apply() {
      var term = input.value.trim().toLowerCase();
      var shown = 0;
      var group = null;
      var groupHasRows = false;
      all(table, "tbody tr").forEach(function (row) {
        if (row.classList.contains("row-group")) {
          if (group) group.hidden = !groupHasRows;
          group = row;
          groupHasRows = false;
          return;
        }
        var match = !term || (row.dataset.search || "").indexOf(term) !== -1;
        row.hidden = !match;
        if (match) {
          shown += 1;
          groupHasRows = true;
        }
      });
      if (group) group.hidden = !groupHasRows;
      if (countEl) countEl.textContent = shown + " buurten";
    }
    input.addEventListener("input", apply);
    apply();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      fields.forEach(autosize);
    }, 150);
  });
})();
