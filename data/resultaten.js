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
window.RESULTATEN = [];
