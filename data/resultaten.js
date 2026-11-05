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
      "Een kaart van Rotterdam en buurgemeenten met drie scenario’s en schuifjes voor de aannames. Per buurt zie je de extra parkeerdruk en waar de auto’s vandaan komen. Nieuw: de verandering in autobezit van 2019 tot 2026 en een voor- en nameting rond de invoering van betaald parkeren. Echt: subbuurtgrenzen, parkeercapaciteit en autobezit per subbuurt (CBS, 1 januari 2026). Fictief: de huidige bezetting, het uitwijkgedrag en alle cijfers van buurgemeenten.",
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
      { tekst: "Open de kaart: Boompjes - Erasmusbrug", url: "prototypes/laadlichten/index.html#vri=11160" },
      { tekst: "Uitleg", url: "prototypes/laadlichten/uitleg.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadlichten" },
    ],
  },
  {
    titel: "Laadpalen: waar is ruimte voor een nieuwe laadpaal?",
    team: "Team Laadlichten",
    casus: "Laadpalen",
    concept:
      "Typ een adres in en zie binnen 200 meter welke parkeervakken volgens het Rotterdamse plaatsingsbeleid geschikt zijn voor een nieuwe laadpaal, en waar die het hardst nodig is.",
    gebouwd:
      "Een kaart voor de zes vooroorlogse buurten van Noord, met 16.372 openbare parkeervakken. Elk vak is getoetst aan de Beleidsregel plaatsing laadpunten 2025: kandidaat, maatwerk of ongeschikt, met de reden per criterium. Met schuifjes voor stoepbreedte, boomafstand en de norm, en een voorstel voor de beste nieuwe locaties op basis van het tekort aan laadpunten. Eerste bevinding: bij de helft van de adressen is minder dan 3,3% van de vakken binnen 200 meter een laadvak, tegenover een norm van 1 op 10. Voor elektrisch rijden per adres gebruikt de kaart woningen per 100 m-vak, geen kentekens. De kaart draait alleen lokaal: de gemeentelijke lagen zijn nog niet bevestigd als open data.",
    controle:
      "Een kaart is geen besluit: elke kandidaat krijgt nog een verkeerskundige toets en een verkeersbesluit. Kabels, inritten en nooddeuren staan niet in de data en moeten ter plaatse worden gecheckt. De drempels, zoals ‘grote boom nabij’, zijn aannames die het team nog moet bevestigen. Daarna beslist de data-eigenaar of de kaart online mag.",
    links: [
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/case/lp/cases/laadpalen" },
    ],
  },
  {
    titel: "M4H Parkeerhubs",
    team: "Team Parkeren Rotterdam",
    casus: "M4H parkeerbalans",
    concept:
      "De losse parkeerbalansen van Merwe-Vierhavens samenbrengen tot één overzicht van de parkeervraag en de verdeling over de mobiliteitshubs.",
    gebouwd:
      "Een kaart van M4H met alle plots en hubs, en een tijdlijn van 2025 tot 2045. Per jaar wordt elke plot gekoppeld aan een hub binnen 400 meter, en je ziet waar de hubcapaciteit knelt. Klik een hub of plot aan om programma of capaciteit te wijzigen; het totaal rekent direct mee. Gebaseerd op openbare plannen: de mobiliteitsstrategie, de beleidsregel parkeernormen, het stedenbouwkundig plan Merwehaven 2025 en raadsvoorstellen.",
    controle:
      "De plotgrenzen zijn overgetrokken van plankaarten en het programma per plot is ingeschat; alle uitkomsten zijn indicatief. Het team moet de normen, de kortingen en de koppeling van plots aan hubs nog nalopen.",
    afbeelding: "img/resultaten/m4h-parkeerhubs.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/m4h-parkeerhubs/index.html" }],
  },
  {
    titel: "Hubkompas",
    team: "Team Sharing is Caring",
    casus: "Deelmobiliteit",
    concept:
      "Een potentiekaart voor deelmobiliteitshubs in Rotterdam en Den Haag: plaats een hub en zie direct hoe kansrijk de plek is en wat hij doet voor het netwerk.",
    gebouwd:
      "Een kaart van vier gebieden (Den Haag Centrum en Moerwijk, Rotterdam Centrum en Feijenoord) met een kansrijkheid per 100 × 100 m. Je kiest het moment van de dag en de weging van zeven factoren, zoals dichtheid, functies en ov. Plaats of versleep een hub en zie het bereik binnen 300 m, het effect op deelritten en of de plek in de openbare ruimte past. Gebouwd op open data: CBS, BAG, BGT, OpenStreetMap en de dienstregeling.",
    controle:
      "Het model rekent met indicatieve kengetallen. De weging, de aannames voor deelritten en de eisen aan een plek moet het team nog toetsen aan de praktijk.",
    afbeelding: "img/resultaten/hubkompas.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/hubkompas/index.html" }],
  },
  {
    titel: "Lost & Found: vind je collega bij Mobiliteit",
    team: "Team Lost & Found",
    casus: "Gebiedskennis",
    concept:
      "Per gebied vindbaar maken wat er speelt en wie het aanspreekpunt is, en belanghebbenden actief informeren als er iets verandert.",
    gebouwd:
      "Een site per gebied van Mobiliteit met de aanspreekpunten, de lopende projecten en thema’s, en meldingen met een maandmail. Het prototype gebruikt echte namen, rollen en foto’s van collega’s; die versie delen we alleen binnen de organisatie. Online staat een smoelenboek met 500 fictieve collega’s dat hetzelfde idee laat zien.",
    controle:
      "Voor een echte versie moeten collega’s instemmen met hun naam en foto, en is een vaste bron nodig, zoals een SharePoint-lijst met een eigenaar.",
    afbeelding: "img/resultaten/smoelenboek.jpg",
    links: [{ tekst: "Smoelenboek (fictieve gegevens)", url: "prototypes/smoelenboek/index.html" }],
  },
  {
    titel: "Dashboard contractmanagement: wie moet wat doen, en wanneer?",
    team: "Team Contractmanagement",
    casus: "Contractmanagement",
    concept:
      "Een dashboard dat per rol laat zien hoe de contracten ervoor staan op tijd, geld, kwaliteit en rollen. Met signalen bij aflopende contracten, personele wisselingen en niet-belegde rollen, en doorklikken van totaal naar thema naar contract.",
    gebouwd:
      "Een dashboard op fictieve contracten in dezelfde 15 kolommen als de contractexport. Eerst één zin en vier stoplichten, details op aanvraag. Elk signaal wordt een actie: wat, wie en vóór wanneer, met de status Open, Opgepakt of Klaar. Aflopende contracten krijgen een uiterste startdatum voor de aanbesteding (± 18 maanden boven de Europese drempel, ± 6 eronder). Verder een vertrekbord, werkverdeling tegen een norm, signalen uit de Aanbestedingswet en een maandbericht per persoon. Gebouwd met Claude. Klik in het dashboard op ‘Demo: simuleer een maand gebruik’ om te zien hoe de stoplichten reageren.",
    controle:
      "Alle personen, leveranciers en bedragen zijn fictief. Het team moet de doorlooptijden, de Europese drempel en de norm per contractmanager nog bevestigen. Verlengingsopties, uitputting en KPI-scores staan niet in de export: die vul je nu met de hand aan, en dat blijft alleen in je eigen browser bewaard.",
    afbeelding: "img/resultaten/contractmanagement.jpg",
    links: [
      { tekst: "Open het dashboard", url: "prototypes/contractmanagement/index.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/contractmanagement" },
    ],
  },
];
