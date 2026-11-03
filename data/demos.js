/*
 * Demo's voor de pagina Inspiratie (demos.html).
 *
 * Een demo toevoegen: kopieer een blok { ... }, pas de velden aan en sla op.
 *
 *   titel        (verplicht) naam van de demo
 *   thema        (verplicht) bepaalt het filter, bijv. "Lopen", "OV-bereikbaarheid",
 *                "Werkzaamheden en hinder", "Kennis en advies"
 *   beschrijving (verplicht) wat doet de demo, in 1 à 3 zinnen
 *   probeer      een concreet voorbeeld om mee te beginnen ("Probeer: ...")
 *   gemeente     "Rotterdam", "Den Haag" of "Rotterdam × Den Haag": kleurt de kaart in de stadskleur
 *   gemaaktDoor  team of afdeling
 *   rolVanAI     wat heeft AI gedaan: in de tool zelf, of bij het bouwen ervan?
 *   gebouwdMet   welke tools, modellen of data
 *   bouwtijd     hoe lang het bouwen duurde, bijv. "2 dagen" (laat goed zien hoe snel het kan)
 *   afbeelding   pad naar een screenshot, bijv. "img/demos/naam.jpg" (16:9, ± 960×540)
 *   links        knoppen onder de kaart: [{ tekst: "Open demo", url: "https://..." }]
 *   voorbeeld    true = toont het label 'Voorbeeldkaart'
 *
 * Velden die je weglaat, worden niet getoond.
 *
 * Let op: deze site is openbaar. Zet hier geen interne links, vertrouwelijke
 * informatie of screenshots met persoonsgegevens.
 *
 * Dit is bewust een .js-bestand (geen .json): zo werkt de pagina ook als je
 * index.html lokaal opent met een dubbelklik, zonder webserver.
 */
window.DEMOS = [
  {
    titel: "Invloedsgebied ov-haltes Den Haag",
    thema: "OV-bereikbaarheid",
    gemeente: "Den Haag",
    gemaaktDoor: "Team Mobiliteitsdata",
    beschrijving:
      "Kaart waarop elk gebouw gekleurd is naar de loopafstand over straten en paden tot de dichtstbijzijnde halte (norm 500 m, rond grote knopen 1000 m). Filter op modaliteit, frequentie, tijdstip en toegankelijkheid, toets een ontwerp-vervoerplan per buurt, en zie waar nieuwe haltes of doorsteken de meeste adressen binnen loopafstand brengen.",
    gebouwdMet: "Interactieve kaart met open data: BAG, dienstregeling (GTFS), OpenStreetMap-looproutes en CBS-buurtcijfers",
    afbeelding: "img/demos/ov-haltes-den-haag.jpg",
    links: [{ tekst: "Open demo", url: "https://sosvisx.github.io/Invloedsgebied-openbaar-vervoer-Den-Haag/" }],
  },
  {
    titel: "Gebiedsprofiel Overschie in cijfers",
    thema: "Gebiedsprofiel",
    gemeente: "Rotterdam",
    gemaaktDoor: "Afdeling Mobiliteit",
    beschrijving:
      "Interactief dashboard over wie er in een gebied wonen, hoe ze wonen en wat dat betekent voor mobiliteit: ov, fiets, verplaatsingspatronen, verkeersongevallen en voorzieningen, met vergelijkingen met de rest van Rotterdam. Elke grafiek toont bron en peiljaar. Prototype: de cijfers zijn niet gecontroleerd.",
    rolVanAI: "De code en de datapijplijn zijn met AI (Claude Code) geschreven. Het dashboard zelf gebruikt geen AI.",
    gebouwdMet: "Python-datapijplijn met open data van CBS, PDOK, GTFS, ODiN, OpenStreetMap en Rijkswaterstaat",
    afbeelding: "img/demos/gebiedsprofiel-overschie.jpg",
    links: [{ tekst: "Open demo", url: "https://wksu.github.io/prototype-overschie/" }],
  },
  {
    titel: "Straatprofiel-casino",
    thema: "Straat en kruispunt",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "Een echte straat uit de BGT, van gevel tot gevel. Speel meters als fiches tussen voetpad, fiets, OV, auto, parkeren en groen, en zie direct of de minimummaten nog gehaald worden en hoe elk perspectief erop vooruit- of achteruitgaat.",
    probeer: "Laan van Meerdervoort → ‘Parkeren eruit, bomen erin’. Zie 36 parkeerplaatsen verdwijnen en plek voor 22 extra bomen ontstaan.",
    gebouwdMet: "BGT via PDOK, vijf straten in Rotterdam en Den Haag",
    afbeelding: "prototypes/assets/thumbs/a2.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/a2-straatprofiel/index.html" }],
  },
  {
    titel: "Regelingsschets kruispunt",
    thema: "Straat en kruispunt",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "Is STOMP ontwerpen ook STOMP regelen? Cyclustijd, groentijden en wachttijd per reiziger voor vier regelvarianten, met en zonder tramprioriteit. Didactisch: dit vervangt geen regelingsontwerp.",
    probeer: "‘Fietsdrukte’ → rondom groen fiets. De cyclus loopt op naar 120 s en de fietser wacht langer dan in de standaardregeling.",
    gebouwdMet: "Rekenmodel van Webster, vereenvoudigd",
    afbeelding: "prototypes/assets/thumbs/a3.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/a3-regeling/index.html" }],
  },
  {
    titel: "Oversteken en mengen",
    thema: "Straat en kruispunt",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "Hoe lang wacht een voetganger aan een druk fietspad, en wanneer kun je fietsers en voetgangers nog mengen? Met een live simulatie en vier ontwerpopties naast elkaar: middeneiland, zebra of verkeerslicht.",
    probeer: "Weena: 21 s wachten, met een rollator 85 s. Een middeneiland brengt de gemiddelde voetganger terug naar 5 s.",
    gebouwdMet: "Poisson-model en formule van Adams, LOS volgens HCM",
    afbeelding: "prototypes/assets/thumbs/a1.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/a1-oversteek/index.html" }],
  },
  {
    titel: "Bereikbaarheidsatlas: omgekeerde verdichtingskaart",
    thema: "OV-bereikbaarheid",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "Waar is de bereikbaarheid al goed genoeg om te verdichten? Per vierkant van 100 m: OV-vertrekken in de spits over het echte looppadennetwerk, tegen het aantal woningen. Met stellingen die je direct toetst.",
    probeer: "klik de stelling ‘Waar het OV al goed is, is nog ruimte’. Rotterdam: 826 ha, theoretisch ruim 33.000 woningen extra.",
    gebouwdMet: "CBS 100 m-vierkanten (2024), dienstregeling GTFS NL, OpenStreetMap-looppaden, adreszoeker van PDOK",
    afbeelding: "prototypes/assets/thumbs/b.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/b-bereikbaarheid/index.html" }],
  },
  {
    titel: "Parkeernorm-tweeling",
    thema: "Parkeren",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "Hetzelfde woningproject door de Rotterdamse en de Haagse parkeerregels, stap voor stap met artikelverwijzing. Zet daarna ‘aanbieder valt weg’ aan: hoeveel plekken ontbreken dan?",
    probeer: "Zomerhofkwartier: Rotterdam 48 plaatsen, Den Haag 80. Zet ‘aanbieder valt weg’ aan: dan ontbreken er 32 en 29.",
    gebouwdMet: "Beleidsregel Parkeernormen Rotterdam 2025 en Nota Parkeernormen Den Haag 2024, gecontroleerd op een echte parkeerbijlage",
    afbeelding: "prototypes/assets/thumbs/c.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/c-parkeren/index.html" }],
  },
  {
    titel: "Precedentenzoeker raadsstukken",
    thema: "Kennis en advies",
    gemeente: "Rotterdam × Den Haag",
    beschrijving:
      "2.714 openbare raadsstukken van beide steden over mobiliteit, verdichting en participatie (2018–2026): moties, besluiten, brieven en inspraak, met tijdlijn, thema’s per jaar en CSV-export.",
    probeer: "zoek ‘deelmobiliteit borging’. Den Haag nam in 2026 een motie aan over borging bij de Anna van Hannoverstraat.",
    gebouwdMet: "Open Raadsinformatie",
    afbeelding: "prototypes/assets/thumbs/d.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/d-precedenten/index.html" }],
  },
  {
    titel: "Raadzoeker",
    thema: "Kennis en advies",
    gemeente: "Rotterdam",
    beschrijving:
      "Zoeken in de Rotterdamse raadsinformatie: raadsbesluiten, moties en andere raadsstukken op één plek.",
    links: [{ tekst: "Open Raadzoeker", url: "https://raadzoeker.nl/" }],
  },
  {
    titel: "Notitieboek: aantekeningen en acties",
    thema: "Werkorganisatie",
    gemeente: "Rotterdam",
    beschrijving:
      "Schrijf aantekeningen van overleggen in gewone tekst. Regels die beginnen met ACTIE of VOLG worden vanzelf acties of volgpunten, met trekker (@naam) en datum (!dd-mm-jjjj). Bekijk ze als planning of als bord, en kopieer een weekoverzicht naar mail of Teams. Werkt in Edge en Chrome; in de demo wordt niets bewaard tot je een werkmap kiest.",
    gebouwdMet: "Eén HTML-bestand, zonder server of internet. Gegevens staan in een JSON-bestand in een map op je eigen computer.",
    afbeelding: "img/demos/notitieboek.jpg",
    links: [{ tekst: "Probeer het uit", url: "demos/notitieboek.html" }],
  },
];
