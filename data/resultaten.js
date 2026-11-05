/*
 * Resultaten per team voor de pagina Resultaten (resultaten.html).
 *
 * Na de themadag: kopieer per team het voorbeeldblok hieronder (zonder de //),
 * vul het in en sla op. Velden die je weglaat, worden niet getoond.
 *
 *   titel        (verplicht) naam van het prototype
 *   team         teamnaam
 *   casus        onderwerp of casus
 *   concept      het oorspronkelijke concept uit het ontwerpformulier, in 1 à 3 zinnen
 *   gebouwd      wat er in korte tijd gebouwd is
 *   reflectie    wat de deelnemers ervan vonden (uit het testformulier)
 *   controle     wat het team nog moet bevestigen voordat de uitkomsten kloppen
 *   afbeelding   de concept-plaat of een screenshot, bijv. "img/resultaten/team-blauw.jpg"
 *   links        knoppen: [{ tekst: "Open prototype", url: "prototypes/..." }]
 *   gevoelig     true = geen link tonen; het prototype wordt dan alleen als
 *                HTML-bestand binnen de organisatie gedeeld
 *
 * Let op: deze site is openbaar. Zet hier geen gevoelige prototypes, interne
 * informatie of persoonsgegevens; gebruik daarvoor `gevoelig: true` zonder link.
 *
 * Voorbeeld:
 *
 *   {
 *     titel: "Stoepscanner",
 *     team: "Team Blauw",
 *     casus: "Loopruimte op trottoirs",
 *     concept: "Een kaart die laat zien waar obstakels de doorgang op de stoep versmallen.",
 *     gebouwd: "Een eerste kaart voor één wijk, op basis van openbare BGT-data.",
 *     reflectie: "Handig als gespreksstarter; de data over tijdelijke obstakels ontbreekt nog.",
 *     afbeelding: "img/resultaten/team-blauw.jpg",
 *     links: [{ tekst: "Open prototype", url: "prototypes/team-blauw/index.html" }],
 *   },
 */
window.RESULTATEN = [
  {
    titel: "Waterbedmonitor Parkeren",
    team: "Team Parkeren Rotterdam",
    casus: "Waterbedeffect",
    concept:
      "Voorspellen waar parkeerdruk naartoe schuift als een gebied betaald parkeren krijgt, zodat de gemeente eerder maatregelen kan nemen.",
    gebouwd:
      "Een kaart van Rotterdam en buurgemeenten met drie scenario’s en schuifjes voor de aannames. Per buurt zie je de extra parkeerdruk en waar de auto’s vandaan komen. Echt: subbuurtgrenzen, parkeercapaciteit en autobezit per subbuurt (CBS, 1 januari 2026). Fictief: de huidige bezetting, het uitwijkgedrag en alle cijfers van buurgemeenten.",
    controle:
      "Acht aannames, zoals de indeling binnen en buiten de ring en de tweede auto als benadering voor ‘geen vergunning’. Voor een echte prognose zijn parkeerdrukmetingen en tellingen rond een eerdere invoering nodig. Zie het controledocument.",
    afbeelding: "img/resultaten/waterbedmonitor.jpg",
    links: [
      { tekst: "Open prototype", url: "prototypes/waterbedmonitor/index.html" },
      { tekst: "Controledocument (Word)", url: "prototypes/waterbedmonitor/261105-controle-casus-waterbedeffect.docx" },
    ],
  },
  {
    titel: "Laadlichten: levende kaart van de verkeerslichten",
    team: "Team Laadlichten",
    casus: "Verkeerslichten",
    concept:
      "Een kaart van alle verkeerslichten die zelf ziet waar iets mis is, en per kruispunt een eerste schets van een basisregeling geeft: van geometrie, verkeersdata en beleid naar groentijden.",
    gebouwd:
      "Een kaart met de 292 Rotterdamse verkeerslichten, die zelf signaleert waar de detectie of de datalevering mogelijk hapert (september 2025 tegenover september 2026). Per kruispunt een schets van de groentijden, met knoppen voor ov-prioriteit en regen. Gebouwd in ongeveer 90 minuten met Claude. Online staat een selectie van 8 VRI’s in het centrum. De volledige kaart draait lokaal, omdat de VRI-data niet openbaar is.",
    controle:
      "Wegbeheer heeft de signalen nog niet bevestigd: een stille signaalgroep kan ook dataverlies of een hernummering zijn. De groentijden zijn een capaciteitsschets, niet voor gebruik op straat. Of de volledige kaart online mag, beslist de data-eigenaar.",
    afbeelding: "img/resultaten/laadlichten.jpg",
    links: [
      { tekst: "Open prototype (selectie centrum)", url: "prototypes/laadlichten/index.html" },
      { tekst: "Uitleg", url: "prototypes/laadlichten/uitleg.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadlichten" },
    ],
  },
];
