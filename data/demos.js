/*
 * Demo's voor de pagina Inspiratie (demos.html).
 *
 * Een demo toevoegen: kopieer een blok { ... }, pas de velden aan en sla op.
 *
 *   titel        (verplicht) naam van de demo
 *   thema        (verplicht) bepaalt het filter, bijv. "Lopen", "OV-bereikbaarheid",
 *                "Werkzaamheden en hinder", "Kennis en advies"
 *   beschrijving (verplicht) wat doet de demo, in 1 à 3 zinnen
 *   watDoetAI    welk deel van het werk doet AI precies?
 *   gebouwdMet   welke tools, modellen of data
 *   bouwtijd     hoe lang het bouwen duurde, bijv. "2 uur" (laat goed zien hoe snel het kan)
 *   afbeelding   pad naar een screenshot, bijv. "img/demos/loopruimte.png" (liefst 16:9)
 *   links        knoppen onder de kaart: [{ tekst: "Open demo", url: "https://..." }]
 *   voorbeeld    true = toont het label 'Voorbeeldkaart'. Verwijder de voorbeelden
 *                zodra er echte demo's staan.
 *
 * Let op: deze site is openbaar. Zet hier geen interne links, vertrouwelijke
 * informatie of screenshots met persoonsgegevens.
 *
 * Dit is bewust een .js-bestand (geen .json): zo werkt de pagina ook als je
 * index.html lokaal opent met een dubbelklik, zonder webserver.
 */
window.DEMOS = [
  {
    titel: "Conceptadvies op basis van beleidsdocumenten",
    thema: "Kennis en advies",
    beschrijving:
      "Een assistent die vragen over mobiliteitsbeleid beantwoordt met verwijzingen naar de bron, en op verzoek een eerste conceptadvies opstelt.",
    watDoetAI: "Zoekt relevante passages op, vat ze samen en schrijft een concept in de gevraagde vorm.",
    gebouwdMet: "Taalmodel met een eigen set openbare beleidsdocumenten",
    bouwtijd: "Vul in",
    links: [],
    voorbeeld: true,
  },
  {
    titel: "Obstakels op de stoep in beeld",
    thema: "Lopen",
    beschrijving:
      "Een kaart die per straat laat zien hoeveel vrije loopruimte er is en waar obstakels zoals fietsen, borden of terrassen de doorgang versmallen.",
    watDoetAI: "Herkent obstakels op foto's en schat de resterende doorloopbreedte.",
    gebouwdMet: "Beeldherkenning en open kaartdata",
    bouwtijd: "Vul in",
    links: [],
    voorbeeld: true,
  },
];
