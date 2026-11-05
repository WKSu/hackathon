# AI × Mobiliteit – website Themadag 5 november

Statische website voor de AI-sessie van de Themadag Mobiliteit (Rotterdam × Den Haag).
Geen build-stap, geen externe scripts of fonts: gewone HTML, CSS en JavaScript.

| Pagina | Wat |
| --- | --- |
| `index.html` | Startpagina: doel, verloop van de dag, spelregels |
| `demos.html` | Inspiratie: bestaande AI-demo's, filterbaar op thema |
| `ontwerp.html` | Ochtend: formulier *Van vraagstuk naar AI-prototype* |
| `testen.html` | Middag: formulier *AI-prototype testen* |
| `toetsing-waterbed.html`, `toetsing-lostfound.html` | Toetsformulieren voor de Waterbedmonitor en Lost & Found (na de themadag) |
| `teams.html` | De zeven ontwerpen van de teams, met schema per ontwerp (ingevuld op 5 november) |
| `resultaten.html` | Archief: per prototype wat het is, de uitdaging, het gebruik en waar je op let |
| `prototypes/` | De prototypes voor de deelsessies (met eigen overzicht in `prototypes/index.html`) |
| `demos/` | Losse demo's die op de site zelf staan, zoals het Notitieboek |

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

- **Het e-mailadres voor de formulieren** staat bewust niet op de site: dat geven de
  begeleiders in de sessie. De knop *Open e-mail* opent een mail met ingevuld onderwerp en
  een leeg adresveld.
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
- **Open e-mail** (de hoofdroute): kopieert het formulier en opent een nieuwe mail met
  het onderwerp al ingevuld. Deelnemers vullen het adres in en plakken het formulier.
  De tekst gaat via het klembord, omdat Outlook lange tekst in een mail-link zonder
  melding afkapt.
- **Kopieer tekst**: zet het formulier op het klembord in twee vormen.
  Plak je in Teams of Outlook, dan komt het opgemaakt binnen (kopjes, vet). Plak je in
  een AI-tool of Kladblok, dan krijg je platte Markdown. Zo kunnen de AI-begeleiders de
  tekst uit de chat direct als bouwopdracht gebruiken.
- **Download**: dezelfde inhoud als Markdown-bestand (`.md`), met de naam volgens de
  teamconventie, bijvoorbeeld `261105 Team Blauw ontwerp loopruimte.md`. Reserveroute
  als plakken niet lukt.
- **Print / PDF**: nette afdruk van het ingevulde formulier.
- **Teamnaam** wordt gedeeld tussen beide formulieren op hetzelfde apparaat.

## Toetsformulieren

De toetsformulieren werken als de andere formulieren (bewaren, e-mail, kopiëren,
download), maar per persoon: de naam is verplicht en komt in bestandsnaam en onderwerp.
Een groepsoverzicht is er niet, want de site heeft geen server; de begeleiders bundelen de
mails. De export toont per vraag alleen wat iemand gekozen of ingevuld heeft, en uit de
buurtentabel alleen de gewijzigde rijen (met de oude waarde erbij).

De vragen komen uit de toetspagina's die de teams in Claude maakten. Extra opbouw voor
`assets/forms.js`: `.q` met `.q-title` voor een vraag, `.choice[data-label]` voor
keuzeknoppen (met `data-max` voor een maximum), en `.step[data-export="table"]` met
`tr[data-row]` en keuzelijsten met `data-default` voor een tabel.

## Resultaten toevoegen

Open `data/resultaten.js`, kopieer een blok en vul het in (velden staan bovenin het
bestand). Een prototype met persoonsgegevens of interne informatie krijgt `gevoelig: true`
en geen link naar het prototype zelf; dat gaat als HTML-bestand rechtstreeks naar de
ontvangers. Lost & Found staat online in een versie met fictieve namen en zonder foto's
(`prototypes/lost-and-found/`); het origineel met echte collega's gaat alleen intern rond.

## Prototypes voor de deelsessies

De map `prototypes/` is overgenomen uit het aangeleverde archief, met twee aanpassingen:
een `noindex` op elke pagina, en in de precedentenzoeker zijn e-mailadressen en
telefoonnummers van ambtenaren uit de raadsstukken vervangen door `[e-mailadres]` en
`[telefoonnummer]`. Ververs je die data met `prep_precedenten.py`, doe dat dan opnieuw.

**Papieren back-up**: open het formulier in een privévenster (dus leeg) en print het.
Lege velden worden dan invulvakken.
