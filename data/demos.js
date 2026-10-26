/*
 * Demo's voor de pagina Inspiratie (demos.html).
 *
 * Een demo toevoegen: kopieer een blok { ... }, pas de velden aan en sla op.
 *
 *   titel        (verplicht) naam van de demo
 *   thema        (verplicht) bepaalt het filter, bijv. "Lopen", "OV-bereikbaarheid",
 *                "Werkzaamheden en hinder", "Kennis en advies"
 *   beschrijving (verplicht) wat doet de demo, in 1 à 3 zinnen
 *   gemeente     "Rotterdam" of "Den Haag": kleurt de kaart in de stadskleur
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
];
