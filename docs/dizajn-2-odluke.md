# Dizajn 2 — odluke po sekcijama

Stanje dogovoreno sa korisnicom (novembar 2026). „Odbijeno" znači: to je probano i nije se svidelo, ne vraćati.

## Header
- Na tabletu i telefonu: hamburger sa 2 crtice, bez kruga; na klik postaje X.
- Mobilni meni: bez okvira, veliki tekstualni linkovi (Oswald) sa malim brojem (14px, boja teksta), ulaze jedan za drugim, zeleni underline na dodir; dole „Contact us" normalne dužine, email i LinkedIn ikonica.
- Logo veći (30px visine, 26px na telefonu). Linkovi sa malim zelenim trouglom, „Contact us" kao pravougaono dugme.

## Hero (slajder)
- Fazon kao wearetheromans.com: pozadina sajta (vide se vertikalne linije), **ogroman naslov u 3 reda** preko širine, u jednom redu mali **prozor sa fotkom** (visok kao slova, isečeni ćoškovi). Fotka se „učitava" brisanjem odozdo + blagi zum.
- Tekst naslova, podnaslova i dugmadi slajdova se uzima TAČNO sa prototipa https://sigmoid-website-prototype.vercel.app/#home (desktop i telefon): Engineering shaped around the challenge. · Software built for products that run in the real world. · Electronics and code that make hardware work. · Robotic hand for automated grocery handling. · Mechanics designed as part of the whole system. Oznaka prvog slajda: „Engineering partner". U `d2.js` (`SLIDES`) `[img]` označava mesto prozora sa fotkom.
- Iznad naslova `{ 01 / 05 — Sigmoid }`. Ispod: podnaslov (širi, ~62ch), pa dva dugmeta levo ispod njega.
- Dole: strelice levo (decagoni, krem), tabovi sa animiranim ikonicama (aktivna ikonica NIJE zelena), linija napretka **1px**, sat „Novi Sad { … }" desno. Nema separatora preko širine.
- Gore desno **Success Stories box** (krem): veća priča sa slikom + manja ispod, sam se menja na ~5 s, lep prelaz (naslov klizne, slika se otvori odozdo), link samo „Read →", pauza na hover. Bez brojača (01/04). Donji članak ima veći naslov (16–19px).
- Hero je toliko nizak da se na desktopu na dnu vidi pokretna traka (ticker).
- Telefon: hero je visok tačno toliko da se pokretna traka vidi na dnu ekrana na svakom telefonu; tabovi i strelice su na dnu hero-a, strelice LEVO, tabovi SA NAZIVIMA u redu koji se prevlači (aktivni se sam pomeri u vidno polje); bez sata, oba dugmeta u jednom redu, sa strelicama, ispod njih uvek vidljiv kompaktan najavni box (sličica, kategorija, naslov, Read; sam se menja), pa red „Clients & partners +" koji se na dodir otvori (15+ i logotipi). Sadržaj hero-a je spušten ka dnu, blizu tabova.
- Odbijeno: velika ikonica kao pozadina; fotka preko celog ekrana; fotka sa leve strane stopljena u pozadinu; podnaslov i dugmad preko fotke; „up next" kartica; krem panel.

- Svi redovi naslova poravnati levo, bez uvlačenja drugog reda.
- Prozor sa fotkom u naslovu je uži (oko 1,3 visine slova u širinu). Ništa u naslovu ne sme da bude zasečeno.
- Favicon: animirana lopta koja se sklapa.
- Credibility strip na svakom slajdu, dole desno: „15+ mechatronic and robotic systems…" + 6 logotipa klijenata/partnera (Orox, FANUC, HTEC, ZTractor, Chubby Buttons, Fond za inovacionu delatnost), 3 u redu i na telefonu.

## Expertise
- Kartice: link „See this expertise" sa zelenim underline-om i strelicom (ne dugme). Hover kartice: krem, bez bordera.
- Kartica „How disciplines combine": „Example:" tanje (200), naslov primera 300 sa zelenim underline-om koji se iscrtava + strelica.

## Industries
- Desno tabovi; aktivni je **čisto krem**, bez okvira (odbijeno: preliv/„liquid" efekat). Svetli delovi ikonica krem.
- Sam prelazi na sledeću industriju na 7 s, klik takođe radi (resetuje tajmer), staje dok je miš iznad.

## Success Stories
- Bez separatora. „Read the story": zeleni underline koji se iscrtava na hover + duga tanka strelica.

## What clients say
- Veliki font citata. Strelice decagoni, hover samo krem, bez bordera.

## Accumulated engineering experience
- Animirana „lopta" (poliedar se sklapa); ista ikonica i kao prva u brojačima.

## Possible ways to start
- Naslov + podnaslov levo, dugme „See how we work" gore desno. 4 kartice jedna do druge (kao Expertise: veliki broj, naslov, tekst). Bez strelica. Razmaci između kartica padaju tačno na linije u pozadini; brojevi 01–04 sa digitalnim efektom; manje praznog prostora na dnu.

## Our Experts
- Biografija tačno 2 reda.
- Okrugli bedž sa tekstom u krug („Talk to our engineering team"), zelen, robot u sredini (manji). Isti robot kao u footeru.

## Insights
- Dugme „Read all insights". Linkovi „Read the article" zeleni underline koji se iscrtava + duga tanka strelica.

## What are you trying to solve?
- Kraći tekstovi (oko 44 znaka u redu), više razmaka između delova kartice.
- Dve fotke (kod na monitoru, serverski rekovi), bez inicijala LT/NP, kraći tekstovi, više vazduha. Linkovi „See how it works", „View related work".

## Footer
- Zelena traka. Veliki tekst „Let's build it." (može se menjati).
- Levo: Contact (info@sigmoid.rs, Novi Sad, telefon primer), veliki robot desno u levom delu, LinkedIn ikonica (krem, hover tamna).
- Desno: Expertise kao velika lista + kolone Working with us / Industries / Company. Hover: underline, bez bele.
- Dno: logo, © Sigmoid d.o.o., Privacy Policy, Terms of Use, Cookies, Landing page; „Design: Elder Design Studio" (https://www.weareelder.com/) i „Back to top ↑" (glatko na vrh).
- Odbijeno: veliki „sigmoid" logo/wordmark preko footera; robot stilizovan „flat" po brendu.

## Boje (iz brend fajla u Figmi)
- Sigmoid Green #98BF5A · Midnight #26233C · Lime cream #DBE580 · Graphite #373636 · Bone #D9D6C9 · Platinum #F1F2F2 — sačuvane u `d2.css` pod tim imenima (`--sigmoid-green`, `--midnight`, `--lime-cream`, `--graphite`, `--bone`, `--platinum`).
- U brend fajlu su odštampani HEX za Graphite (014744) i Bone (D6D6C9) greške; prave boje su na samim poljima.

## Tipografija
- Svi naslovi Oswald Regular (400). Light (300) samo veliki brojevi/skraćenice (01, SW, 15+, 80%) i citati.

## Linkovi (svuda)
- Na hover se underline iznova iscrta, na svim linkovima (i u footeru, i u cookie banneru).
- Pozadinske vertikalne linije: nema linije skroz desno.

## Cookie banner
- Krem pozadina, tamno braon tekst, manji tekst, niži. Samo „Accept" (dugme) i „Reject" (link). Ne prekriva footer bar ni pokretnu traku ispod heroja.
