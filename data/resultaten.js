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
 *   controle     waar moet je op letten / wat moet nog bevestigd worden?
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
    titel: "Waterbedmonitor Parkeren",
    team: "Team Parkeren Rotterdam",
    casus: "Waterbedeffect",
    wat: "Een kaart die voorspelt waar auto’s naartoe uitwijken als een buurt betaald parkeren krijgt.",
    uitdaging: "Bij de uitrol van betaald parkeren buiten de ring wil de gemeente eerder zien waar de parkeerdruk naartoe schuift.",
    gebruik: "Kies een scenario en schuif met de aannames. Per buurt zie je de extra parkeerdruk en waar de auto’s vandaan komen.",
    controle: "De huidige bezetting en de cijfers van buurgemeenten zijn fictief. De aannames staan in het controledocument.",
    afbeelding: "img/resultaten/waterbedmonitor.jpg",
    links: [
      { tekst: "Open prototype", url: "prototypes/waterbedmonitor/index.html" },
      { tekst: "Controledocument (Word)", url: "prototypes/waterbedmonitor/261105-controle-casus-waterbedeffect.docx" },
      { tekst: "Toets de monitor (formulier)", url: "toetsing-waterbed.html" },
    ],
  },
  {
    titel: "Laadlichten: levende kaart van de verkeerslichten",
    team: "Team Laadlichten",
    casus: "Verkeerslichten",
    wat: "Een kaart van de verkeerslichten die zelf ziet waar de detectie of de data hapert, met per kruispunt een schets van de groentijden.",
    uitdaging: "Storingen en verouderde regelingen vallen nu vaak pas op als iemand klaagt.",
    gebruik: "Klik een kruispunt aan voor de signalen en de schets. Online staan 8 verkeerslichten in het centrum; de volledige kaart draait lokaal.",
    controle: "Wegbeheer moet de signalen nog bevestigen. De groentijden zijn een schets, niet voor gebruik op straat.",
    afbeelding: "img/resultaten/laadlichten.jpg",
    links: [
      { tekst: "Open de kaart", url: "prototypes/laadlichten/index.html#vri=11160" },
      { tekst: "Uitleg", url: "prototypes/laadlichten/uitleg.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadlichten" },
    ],
  },
  {
    titel: "Laadpalen: ruimte voor een nieuwe laadpaal",
    team: "Team Laadlichten",
    casus: "Laadpalen",
    wat: "Een kaart die per parkeervak toetst of er volgens het Rotterdamse plaatsingsbeleid een laadpaal kan komen.",
    uitdaging: "Een aanvraag voor een laadpaal vraagt nu veel handwerk: welk vak in de buurt past, en waar is het tekort het grootst?",
    gebruik: "Typ een adres in Noord en zie de geschikte vakken binnen 200 meter, met de reden per vak. Met schuifjes probeer je andere drempels.",
    controle: "Elke kandidaat vraagt nog een verkeerskundige toets en een verkeersbesluit. Kabels en inritten staan niet in de data.",
    afbeelding: "img/resultaten/laadpalen.jpg",
    links: [
      { tekst: "Open de kaart", url: "https://wksu.github.io/hackathon-cases/cases/laadpalen/prototype/" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/laadpalen" },
    ],
  },
  {
    titel: "M4H Parkeerhubs",
    team: "Team Parkeren Rotterdam",
    casus: "M4H parkeerbalans",
    wat: "Eén overzicht van de parkeervraag in Merwe-Vierhavens en de verdeling over de mobiliteitshubs, van 2025 tot 2045.",
    uitdaging: "De parkeerbalansen per plot liggen los van elkaar, waardoor je niet ziet waar een hub volloopt.",
    gebruik: "Schuif door de jaren en klik een plot of hub aan om programma of capaciteit te wijzigen. Het totaal rekent direct mee.",
    controle: "Plotgrenzen en programma zijn ingeschat; alle uitkomsten zijn indicatief.",
    afbeelding: "img/resultaten/m4h-parkeerhubs.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/m4h-parkeerhubs/index.html" }],
  },
  {
    titel: "Hubkompas",
    team: "Team Sharing is Caring",
    casus: "Deelmobiliteit",
    wat: "Een kaart die laat zien hoe kansrijk een plek is voor een deelmobiliteitshub, in vier gebieden van Rotterdam en Den Haag.",
    uitdaging: "Waar levert een nieuwe hub het meest op voor het netwerk, en past hij daar in de openbare ruimte?",
    gebruik: "Kies het moment van de dag en hoe zwaar elke factor weegt. Plaats of versleep een hub en zie het bereik en het effect.",
    controle: "Het model rekent met indicatieve kengetallen; het team moet de weging nog toetsen aan de praktijk.",
    afbeelding: "img/resultaten/hubkompas.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/hubkompas/index.html" }],
  },
  {
    titel: "Lost & Found: vindt en verbindt",
    team: "Team Lost & Found",
    casus: "Gebiedskennis",
    wat: "Een site per gebied van Mobiliteit met de aanspreekpunten, de lopende projecten en meldingen als er iets verandert.",
    uitdaging: "Wie werkt waar aan, en wie moet je betrekken? Die kennis zit nu in hoofden en losse lijsten.",
    gebruik: "Zoek op gebied, thema of collega, of volg een gebied om meldingen te krijgen.",
    controle: "Online staan fictieve namen en geen foto’s. Het origineel met echte collega’s delen we alleen intern; voor een echte versie moeten collega’s instemmen.",
    afbeelding: "img/resultaten/lost-and-found.jpg",
    links: [
      { tekst: "Open prototype", url: "prototypes/lost-and-found/index.html" },
      { tekst: "Toets het prototype (formulier)", url: "toetsing-lostfound.html" },
    ],
  },
  {
    titel: "Smoelenboek met fictieve collega’s",
    team: "Team Lost & Found",
    casus: "Gebiedskennis",
    wat: "Een smoelenboek met 500 fictieve collega’s: het ‘wie is wie’-deel van Lost & Found, verder uitgewerkt.",
    uitdaging: "Collega’s snel vinden op rol, team of gebied, zonder echte persoonsgegevens te tonen.",
    gebruik: "Zoek of filter en open een profiel.",
    controle: "Voor een echte versie moeten collega’s instemmen met naam en foto, en is een vaste bron met een eigenaar nodig.",
    afbeelding: "img/resultaten/smoelenboek.jpg",
    links: [{ tekst: "Open prototype", url: "prototypes/smoelenboek/index.html" }],
  },
  {
    titel: "Dashboard contractmanagement",
    team: "Team Contractmanagement",
    casus: "Contractmanagement",
    wat: "Een dashboard dat per rol laat zien hoe de contracten ervoor staan op tijd, geld, kwaliteit en rollen.",
    uitdaging: "Aflopende contracten, personele wisselingen en niet-belegde rollen vallen nu vaak te laat op.",
    gebruik: "Begin bij de vier stoplichten en klik door naar thema en contract. Elk signaal wordt een actie met eigenaar en datum.",
    controle: "Alle gegevens zijn fictief. De doorlooptijden, de Europese drempel en de norm per contractmanager moeten nog bevestigd worden.",
    afbeelding: "img/resultaten/contractmanagement.jpg",
    links: [
      { tekst: "Open het dashboard", url: "prototypes/contractmanagement/index.html" },
      { tekst: "Plan en besluiten (GitHub)", url: "https://github.com/WKSu/hackathon-cases/tree/main/cases/contractmanagement" },
    ],
  },
  {
    titel: "Prestatieverklaringen op één plek",
    team: "Team Contractmanagement",
    casus: "Prestatieverklaringen",
    wat: "Een tool waarin een prestatieverklaring wordt aangeleverd, getekend en gevolgd.",
    uitdaging: "Prestatieverklaringen gaan nu heen en weer per mail; niemand ziet waar een verklaring ligt of wie aan zet is.",
    gebruik: "Klik op ‘Probeer de demo’ en speel de drie rollen: ondersteuner, verklaarder en tekenaar. Een nagebootste mailbox toont wat iedereen ontvangt.",
    controle: "Fictieve gegevens: er gaan geen echte mails uit en de handtekening is niet rechtsgeldig. De boekhouding zit niet in de tool.",
    afbeelding: "img/resultaten/prestatieverklaringen.jpg",
    links: [{ tekst: "Open de demo", url: "prototypes/prestatieverklaringen/index.html" }],
  },
];
