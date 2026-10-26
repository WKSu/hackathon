# AI × Mobiliteit – website Themadag 5 november

Statische website voor de AI-sessie van de Themadag Mobiliteit (Rotterdam × Den Haag).
Geen build-stap, geen externe scripts of fonts: gewone HTML, CSS en JavaScript.

| Pagina | Wat |
| --- | --- |
| `index.html` | Startpagina: doel, verloop van de dag, spelregels |
| `demos.html` | Inspiratie: bestaande AI-demo's, filterbaar op thema |
| `ontwerp.html` | Ochtend: formulier *Van vraagstuk naar AI-prototype* |
| `testen.html` | Middag: formulier *AI-prototype testen* |

## Lokaal bekijken

Dubbelklik op `index.html`. Alles werkt zonder webserver. Wil je toch een server:

```bash
python -m http.server 8000   # daarna http://localhost:8000
```

## Publiceren met GitHub Pages

1. Repository → **Settings → Pages**.
2. *Source*: **Deploy from a branch**, kies de branch en map `/ (root)`.
3. Na een minuut staat de site op `https://<gebruiker>.github.io/<repo>/`.

**Let op:** een GitHub Pages-site is openbaar, ook als niemand de link kent. Zet er
daarom geen interne links, vertrouwelijke informatie of screenshots met
persoonsgegevens op. De pagina's hebben `noindex`, zodat zoekmachines ze niet opnemen,
maar dat is geen beveiliging.

## Vóór de themadag nog invullen

- **Waar teams hun formulier inleveren.** Zoek in `ontwerp.html` en `testen.html` op
  `class="todo"` en vervang de gele placeholder door een e-mailadres of Teams-kanaal.
- **Echte demo's** in `data/demos.js` (de twee huidige kaarten zijn voorbeelden).

## Een demo toevoegen

Open `data/demos.js`, kopieer een blok `{ ... }` en pas de velden aan. Uitleg per veld
staat bovenin het bestand. Screenshots zet je in `img/demos/` (liefst 16:9) en verwijs
je naar met bijvoorbeeld `afbeelding: "img/demos/loopruimte.png"`.

## Formuliervragen aanpassen

De vragen staan gewoon in de HTML van `ontwerp.html` en `testen.html`. Het script
`assets/forms.js` leest de structuur daaruit, dus de download past zich automatisch aan.
Houd je aan deze opbouw:

- elke stap is een `<fieldset class="step">` met een `.step-nr` en `.step-title`;
- elk veld heeft een `name`, een `id` en een `<label for="...">`.

Verander je een `name`, dan raken deelnemers eerder bewaarde antwoorden voor dat veld
kwijt. Dat is alleen een probleem als je dat op de dag zelf doet.

## Hoe de formulieren werken

- **Automatisch bewaren**: antwoorden staan in de `localStorage` van de browser op dat
  apparaat. Er wordt niets naar een server gestuurd. Met *Leegmaken* wis je ze.
- **Download**: een Markdown-bestand (`.md`) met de naam volgens de teamconventie,
  bijvoorbeeld `261105 Team Blauw ontwerp loopruimte.md`. Markdown is leesbaar in elke
  teksteditor en kan direct als bouwopdracht in een AI-tool geplakt worden.
- **Kopieer tekst**: dezelfde inhoud naar het klembord, om in een mail of Teams te plakken.
- **Print / PDF**: nette afdruk van het ingevulde formulier.
- **Teamnaam** wordt gedeeld tussen beide formulieren op hetzelfde apparaat.

**Papieren back-up**: open het formulier in een privévenster (dus leeg) en print het.
Lege velden worden dan invulvakken.
