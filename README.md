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

- **De Teams-chat waarin teams hun formulier plakken.** Zoek in `ontwerp.html` en
  `testen.html` op `class="todo"` en vervang de gele placeholder door de naam van de chat.
- **Bouwtijd en rol van AI** bij de demo's in `data/demos.js`, waar die nog ontbreken.
- **De kleuren van Den Haag** in `assets/style.css` (zie *Huisstijl* hieronder).

## Een demo toevoegen

Open `data/demos.js`, kopieer een blok `{ ... }` en pas de velden aan. Uitleg per veld
staat bovenin het bestand. Met `gemeente: "Rotterdam"` of `gemeente: "Den Haag"` krijgt
de kaart de stadskleur. Screenshots zet je in `img/demos/` (16:9, ± 960×540) en verwijs
je naar met bijvoorbeeld `afbeelding: "img/demos/loopruimte.jpg"`.

## Huisstijl: Rotterdam × Den Haag

Beide gemeenten dragen groen: Rotterdam groen-wit, Den Haag geel-groen (goud en sinopel
uit het stadswapen). Groen is daarom de gedeelde basis en Haags geel het accent. De hero
loopt van Haags naar Rotterdams groen, en de twee overlappende cirkels en de tweekleurige
band bovenaan staan voor de samenwerking. Demokaarten krijgen de kleur van hun gemeente.

- **Rotterdam** (`--rdam-*` in `assets/style.css`): groen `#00811F` en lichtgrijs
  `#EFF4F6` uit de Rotterdamse huisstijl.
- **Den Haag** (`--dh-*`): de gemeente publiceert geen hexcodes op een plek die we konden
  bereiken. Groen `#155429` en geel `#E3C029` zijn uit het logo benaderd. Controleer ze
  bij de huisstijlhandleiding en pas zo nodig de variabelen aan; de rest volgt vanzelf.
- **Letter**: Bolder (Rotterdam) en Thesis (Den Haag) zijn licentiefonts. De site
  gebruikt het systeemfont (Segoe UI op Windows); Den Haag gebruikt online zelf Arial.

De belangrijkste tekst- en achtergrondcombinaties halen WCAG AA (contrast ≥ 4,5:1).

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
- **Kopieer tekst** (de hoofdroute): zet het formulier op het klembord in twee vormen.
  Plak je in Teams of Outlook, dan komt het opgemaakt binnen (kopjes, vet). Plak je in
  een AI-tool of Kladblok, dan krijg je platte Markdown. Zo kunnen de AI-begeleiders de
  tekst uit de chat direct als bouwopdracht gebruiken.
- **Download**: dezelfde inhoud als Markdown-bestand (`.md`), met de naam volgens de
  teamconventie, bijvoorbeeld `261105 Team Blauw ontwerp loopruimte.md`. Reserveroute
  als plakken niet lukt.
- **Print / PDF**: nette afdruk van het ingevulde formulier.
- **Teamnaam** wordt gedeeld tussen beide formulieren op hetzelfde apparaat.

**Papieren back-up**: open het formulier in een privévenster (dus leeg) en print het.
Lege velden worden dan invulvakken.
