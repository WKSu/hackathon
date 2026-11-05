/*
 * Resultaten per team voor de pagina Resultaten (resultaten.html).
 *
 * Kopieer per prototype een blok hieronder, vul het in en sla op. Velden die je
 * weglaat, worden niet getoond. Houd elk veld bij één of twee korte zinnen.
 *
 *   titel        (verplicht) naam van het prototype
 *   team         teamnaam
 *   casus        onderwerp of casus
 *   wat          wat is het?
 *   uitdaging    welk probleem uit de casus lost het op?
 *   gebruik      hoe gebruik je het?
 *   id           korte naam zonder spaties, voor het feedbackformulier (feedback.html?p=id)
 *   controle     waar moet je op letten / wat moet nog bevestigd worden?
 *   uitleg       { bouw: "hoe het gebouwd is", functies: [...], nogNiet: [...] }
 *                verschijnt achter de knop "Hoe werkt het?"
 *   afbeelding   screenshot, 16:9 (960×540), bijv. "img/resultaten/team-blauw.jpg"
 *   links        knoppen: [{ tekst: "Open prototype", url: "prototypes/..." }]
 *   gevoelig     true = de kaart meldt dat het prototype alleen binnen de
 *                organisatie gedeeld wordt; zet dan geen link naar het prototype zelf
 *
 * Let op: deze site is openbaar. Zet hier geen gevoelige prototypes, interne
 * informatie of persoonsgegevens; gebruik daarvoor `gevoelig: true`.
 */
window.RESULTATEN = [
  {
    id: "waterbedmonitor",
    titel: "Waterbedmonitor Parkeren",
    team: "Team Parkeren Rotterdam",
    casus: "Waterbedeffect",
    wat: "Een kaart die voorspelt waar auto’s naartoe uitwijken als een buurt betaald parkeren krijgt.",
    uitdaging: "Bij de uitrol van betaald parkeren buiten de ring wil de gemeente eerder zien waar de parkeerdruk naartoe schuift.",
    gebruik: "Kies een scenario en schuif met de aannames. Per buurt zie je de extra parkeerdruk en waar de auto’s vandaan komen.",
    controle: "De huidige bezetting en de cijfers van buurgemeenten zijn fictief. De aannames staan in het controledocument.",
    uitleg: {
      bouw: "Gebouwd met Claude op de themadag, op basis van het ontwerpformulier en het groepsgesprek. Eén HTML-pagina met de kaart en alle cijfers erin. Echt: subbuurtgrenzen, parkeercapaciteit en autobezit (CBS, 2026).",
      functies: [
        "Drie scenario’s voor de uitrol van betaald parkeren",
        "Schuifjes voor de aannames: hoeveel auto’s uitwijken en hoe ver",
        "Per buurt de extra parkeerdruk en waar de auto’s vandaan komen",
        "Verandering in autobezit 2019–2026, met een voor- en nameting",
      ],
      nogNiet: [
        "Rekenen met echte parkeerdrukmetingen: de huidige bezetting is verzonnen",
        "Andere reacties dan uitwijken, zoals de auto wegdoen of een vergunning nemen",
        "Verschil tussen dag, avond en weekend: het rekent met één moment",
        "Betrouwbare cijfers voor de buurgemeenten",
      ],
    },
    afbeelding: "img/resultaten/waterbedmonitor.jpg",
    links: [
      { tekst: "Open prototype", url: "prototypes/waterbedmonitor/index.html" },
      { tekst: "Controledocument (Word)", url: "prototypes/waterbedmonitor/261105-controle-casus-waterbedeffect.docx" },
      { tekst: "Toets de monitor (formulier)", url: "toetsing-waterbed.html" },
    ],
  },
  {
    id: "laadlichten",
    titel: "Laadlichten: levende kaart van de verkeerslichten",
    team: "Team Laadlichten",
    casus: "Verkeerslichten",
    wat: "Een kaart van de verkeerslichten die zelf ziet waar de detectie of de data hapert, met per kruispunt een schets van de groentijden.",
    uitdaging: "Storingen en verouderde regelingen vallen nu vaak pas op als iemand klaagt.",
    gebruik: "Klik een kruispunt aan voor de signalen en de schets. Online staan 8 verkeerslichten in het centrum; de volledige kaart draait lokaal.",
    controle: "Wegbeheer moet de signalen nog bevestigen. De groentijden zijn een schets, niet voor gebruik op straat.",
    uitleg: {
      bouw: "Gebouwd in ongeveer 90 minuten met Claude. Een script voegt drie bronnen samen tot één databestand: de kenmerken van de verkeerslichten, de kruispuntgeometrie en tellingen per uur. De kaart is één HTML-pagina.",
      functies: [
        "Kleurlagen: signalen, detectie, ov-prioriteit en vervangjaar",
        "Per kruispunt het dagprofiel per signaalgroep, met rijstroken en lussen op de kaart",
        "Lijst ‘Aandacht nodig’: geen tellingen, mogelijke lusstoring, daling of vervanging vóór 2028",
        "Schets van een basisregeling: fasering, groentijden en knoppen voor ov-prioriteit en regen",
      ],
      nogNiet: [
        "Regelcode maken die op straat gebruikt kan worden",
        "Ontruimingstijden rekenen volgens CROW",
        "Den Haag, of een live koppeling met de verkeerslichten",
        "Online meer dan 8 kruispunten tonen: de rest van de data is niet openbaar",
      ],
    },
    afbeelding: "img/resultaten/laadlichten.jpg",
    links: [
      { tekst: "Open de kaart", url: "prototypes/laadlichten/index.html#vri=11160" },
      { tekst: "Uitleg", url: "prototypes/laadlichten/uitleg.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadlichten" },
    ],
  },
  {
    id: "laadpalen",
    titel: "Laadpalen: ruimte voor een nieuwe laadpaal",
    team: "Team Laadlichten",
    casus: "Laadpalen",
    wat: "Een kaart die per parkeervak toetst of er volgens het Rotterdamse plaatsingsbeleid een laadpaal kan komen.",
    uitdaging: "Een aanvraag voor een laadpaal vraagt nu veel handwerk: welk vak in de buurt past, en waar is het tekort het grootst?",
    gebruik: "Typ een adres in Noord en zie de geschikte vakken binnen 200 meter, met de reden per vak. Met schuifjes probeer je andere drempels.",
    controle: "Elke kandidaat vraagt nog een verkeerskundige toets en een verkeersbesluit. Kabels en inritten staan niet in de data.",
    uitleg: {
      bouw: "Gebouwd met Claude. Een script voegt parkeervakken, bestaande laadvakken, bomen, de BGT en CBS-woningen samen tot één databestand. De kaart toetst elk vak aan de beleidsregel plaatsing laadpunten 2025.",
      functies: [
        "Adres zoeken, met een cirkel van 200 meter en een overzicht van de omgeving",
        "Per parkeervak: kandidaat, maatwerk of ongeschikt, met de reden per criterium",
        "Schuifjes voor stoepbreedte, boomafstand en de norm",
        "Voorstel van de beste nieuwe locaties, op volgorde van tekort",
        "Laag met de dekking per 100 m-vak voor het hele gebied",
      ],
      nogNiet: [
        "Bezetting en verbruik van bestaande laadpalen: daarvoor is laaddata nodig",
        "Kabels, inritten en nooddeuren: die staan niet in de data",
        "Loopafstand over straten: het rekent hemelsbreed",
        "De hele stad: nu zes buurten in Noord",
      ],
    },
    afbeelding: "img/resultaten/laadpalen.jpg",
    links: [
      { tekst: "Open de kaart", url: "https://wksu.github.io/hackathon-cases/cases/laadpalen/prototype/" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadpalen" },
    ],
  },
  {
    id: "m4h-parkeerhubs",
    titel: "M4H Parkeerhubs",
    team: "Team Parkeren Rotterdam",
    casus: "M4H parkeerbalans",
    wat: "Eén overzicht van de parkeervraag in Merwe-Vierhavens en de verdeling over de mobiliteitshubs, van 2025 tot 2045.",
    uitdaging: "De parkeerbalansen per plot liggen los van elkaar, waardoor je niet ziet waar een hub volloopt.",
    gebruik: "Schuif door de jaren en klik een plot of hub aan om programma of capaciteit te wijzigen. Het totaal rekent direct mee.",
    controle: "Plotgrenzen en programma zijn ingeschat; alle uitkomsten zijn indicatief.",
    uitleg: {
      bouw: "Gebouwd met Claude op de themadag, op basis van openbare plannen: de mobiliteitsstrategie, de beleidsregel parkeernormen, het stedenbouwkundig plan Merwehaven 2025 en raadsvoorstellen.",
      functies: [
        "Kaart van M4H met alle plots en hubs",
        "Tijdlijn van 2025 tot 2045",
        "Elke plot gekoppeld aan een hub binnen 400 meter",
        "Zien waar de capaciteit van een hub knelt",
        "Programma of capaciteit aanpassen; het totaal rekent direct mee",
      ],
      nogNiet: [
        "Exacte plotgrenzen: die zijn overgetrokken van plankaarten",
        "Het echte programma per plot: dat is ingeschat",
        "Gecontroleerde normen en kortingen",
      ],
    },
    afbeelding: "img/resultaten/m4h-parkeerhubs.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/m4h-parkeerhubs/index.html" }],
  },
  {
    id: "hubkompas",
    titel: "Hubkompas",
    team: "Team Sharing is Caring",
    casus: "Deelmobiliteit",
    wat: "Een kaart die laat zien hoe kansrijk een plek is voor een deelmobiliteitshub, in vier gebieden van Rotterdam en Den Haag.",
    uitdaging: "Waar levert een nieuwe hub het meest op voor het netwerk, en past hij daar in de openbare ruimte?",
    gebruik: "Kies het moment van de dag en hoe zwaar elke factor weegt. Plaats of versleep een hub en zie het bereik en het effect.",
    controle: "Het model rekent met indicatieve kengetallen; het team moet de weging nog toetsen aan de praktijk.",
    uitleg: {
      bouw: "Gebouwd met Claude op open data: CBS, BAG, BGT, OpenStreetMap en de ov-dienstregeling, omgerekend naar vakken van 100 × 100 meter.",
      functies: [
        "Kansrijkheid per vak in vier gebieden van Rotterdam en Den Haag",
        "Moment van de dag kiezen",
        "Zelf de weging van zeven factoren instellen, zoals dichtheid, functies en ov",
        "Hub plaatsen of verslepen, met het bereik binnen 300 meter",
        "Effect op deelritten en een toets of de plek in de openbare ruimte past",
      ],
      nogNiet: [
        "Rekenen met echte ritdata: het model gebruikt indicatieve kengetallen",
        "Andere gebieden dan de vier in de demo",
      ],
    },
    afbeelding: "img/resultaten/hubkompas.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/hubkompas/index.html" }],
  },
  {
    id: "lost-and-found",
    titel: "Lost & Found: vindt en verbindt",
    team: "Team Lost & Found",
    casus: "Gebiedskennis",
    wat: "Een site per gebied van Mobiliteit met de aanspreekpunten, de lopende projecten en meldingen als er iets verandert.",
    uitdaging: "Wie werkt waar aan, en wie moet je betrekken? Die kennis zit nu in hoofden en losse lijsten.",
    gebruik: "Zoek op gebied, thema of collega, of volg een gebied om meldingen te krijgen.",
    controle: "Online staan fictieve namen en geen foto’s. Het origineel met echte collega’s delen we alleen intern; voor een echte versie moeten collega’s instemmen.",
    uitleg: {
      bouw: "Gebouwd met Claude. De gegevens komen uit de gebiedsverdeling, de activiteitenlijst van het werkprogramma en gesprekken met het team. Online staat een versie met fictieve namen en zonder foto’s.",
      functies: [
        "Schematische kaart met de gebieden van Mobiliteit",
        "Per gebied het team, de aanspreekpunten per thema en de lopende projecten",
        "Pagina’s per thema en voor de organisatie",
        "Zoeken op gebied, wijk, straat, thema, project of collega",
        "Een gebied of thema volgen, met meldingen en een voorbeeld van de maandmail",
      ],
      nogNiet: [
        "Echte gebiedsgrenzen: de kaart is schematisch",
        "Meldingen echt versturen: wat je volgt, onthoudt alleen je eigen browser",
        "Vragen in gewone taal, met AI",
        "De status van een project automatisch bijhouden",
        "Andere afdelingen dan Mobiliteit",
      ],
    },
    afbeelding: "img/resultaten/lost-and-found.jpg",
    links: [
      { tekst: "Open prototype", url: "prototypes/lost-and-found/index.html" },
      { tekst: "Toets het prototype (formulier)", url: "toetsing-lostfound.html" },
    ],
  },
  {
    id: "smoelenboek",
    titel: "Smoelenboek met fictieve collega’s",
    team: "Team Lost & Found",
    casus: "Gebiedskennis",
    wat: "Een smoelenboek met 500 fictieve collega’s: het ‘wie is wie’-deel van Lost & Found, verder uitgewerkt.",
    uitdaging: "Collega’s snel vinden op rol, team of gebied, zonder echte persoonsgegevens te tonen.",
    gebruik: "Zoek of filter en open een profiel.",
    controle: "Voor een echte versie moeten collega’s instemmen met naam en foto, en is een vaste bron met een eigenaar nodig.",
    uitleg: {
      bouw: "Gebouwd met Claude. Een generator maakt 500 fictieve collega’s; in een echte versie komen de gegevens uit een SharePoint-lijst of Excel. De gebiedsgrenzen komen van CBS Wijken en Buurten.",
      functies: [
        "Collega’s zoeken en filteren",
        "Kaart met de gebieden",
        "Themakaart als lijnennet: elk thema een lijn, elk gebied een halte",
        "Afdelingen en teams",
        "Tabel waar afdelingen elkaar raken per thema",
      ],
      nogNiet: [
        "Echte collega’s tonen: daarvoor is toestemming nodig",
        "Bijwerken vanuit een vaste bron",
      ],
    },
    afbeelding: "img/resultaten/smoelenboek.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/smoelenboek/index.html" }],
  },
  {
    id: "contractmanagement",
    titel: "Dashboard contractmanagement",
    team: "Team Contractmanagement",
    casus: "Contractmanagement",
    wat: "Een dashboard dat per rol laat zien hoe de contracten ervoor staan op tijd, geld, kwaliteit en rollen.",
    uitdaging: "Aflopende contracten, personele wisselingen en niet-belegde rollen vallen nu vaak te laat op.",
    gebruik: "Begin bij de vier stoplichten en klik door naar thema en contract. Elk signaal wordt een actie met eigenaar en datum.",
    controle: "Alle gegevens zijn fictief. De doorlooptijden, de Europese drempel en de norm per contractmanager moeten nog bevestigd worden.",
    uitleg: {
      bouw: "Gebouwd met Claude. Een script maakt fictieve contracten in dezelfde 15 kolommen als de contractexport; een bouwscript zet die om in één HTML-pagina.",
      functies: [
        "Vier stoplichten (tijd, geld, kwaliteit, rollen) en een samenvatting in één zin",
        "‘Bekijk als’ per rol, en doorklikken van totaal naar thema naar contract",
        "Signalen als acties: wat, wie en vóór wanneer, met een status",
        "Uiterste startdatum voor de aanbesteding bij aflopende contracten",
        "Werkverdeling, vertrek en niet-belegde rollen",
        "Maandbericht per persoon, ook printbaar",
      ],
      nogNiet: [
        "Echte data uit het contractsysteem lezen",
        "Uitputting, KPI-scores en verlengingsopties: die staan niet in de export",
        "Een juridisch oordeel: de wettoets is een signaal om te laten checken",
        "Inloggen, gedeelde opslag en het maandbericht automatisch versturen",
      ],
    },
    afbeelding: "img/resultaten/contractmanagement.jpg",
    links: [
      { tekst: "Open het dashboard", url: "prototypes/contractmanagement/index.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/contractmanagement" },
    ],
  },
  {
    id: "prestatieverklaringen",
    titel: "Prestatieverklaringen op één plek",
    team: "Team Contractmanagement",
    casus: "Prestatieverklaringen",
    wat: "Een tool waarin een prestatieverklaring wordt aangeleverd, getekend en gevolgd.",
    uitdaging: "Prestatieverklaringen gaan nu heen en weer per mail; niemand ziet waar een verklaring ligt of wie aan zet is.",
    gebruik: "Klik op ‘Probeer de demo’ en speel de drie rollen: ondersteuner, verklaarder en tekenaar. Een nagebootste mailbox toont wat iedereen ontvangt.",
    controle: "Fictieve gegevens: er gaan geen echte mails uit en de handtekening is niet rechtsgeldig. De boekhouding zit niet in de tool.",
    uitleg: {
      bouw: "Eén HTML-bestand dat zonder installatie of inloggen in de browser opent. Pdf’s maakt het met de open-sourcebibliotheek pdf-lib.",
      functies: [
        "Drie rollen: ondersteuner, verklaarder en tekenaar",
        "Verklaring intypen of een pdf uploaden",
        "Online tekenen, of buiten de tool tekenen en uploaden",
        "Terugsturen met een opmerking als er iets niet klopt",
        "Per verklaring de status en de hele geschiedenis",
        "Getekende pdf downloaden; een nagebootste mailbox laat zien wie wat ontvangt",
      ],
      nogNiet: [
        "Echte e-mails versturen",
        "Rechtsgeldig tekenen",
        "Doorsturen naar de boekhouding",
        "Echt inloggen en beveiliging; gedeelde opslag (alles blijft in je eigen browser)",
      ],
    },
    afbeelding: "img/resultaten/prestatieverklaringen.jpg",
    links: [{ tekst: "Open de demo", url: "prototypes/prestatieverklaringen/index.html" }],
  },
];
