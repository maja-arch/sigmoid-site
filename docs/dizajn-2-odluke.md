# Dizajn 2 — odluke po sekcijama

Stanje dogovoreno sa korisnicom (novembar 2026). „Odbijeno" znači: to je probano i nije se svidelo, ne vraćati.

## Loader
- Probano i ODBIJENO (ikonice + brojač + prelaz na skrol). Nema loadera.

## Header
- Telefon: zaglavlje bez pozadine i zamućenja, stoji na vrhu strane i odlazi sa skrolom (ne vraća se pri skrolu nagore). Desktop: nepromenjeno.
- Logo u zaglavlju (desktop i telefon): animirani globus — ista animacija kao favicon (isti delovi lopte, isti redosled i ritam, puna brend zelena); slova mirna.
- Logo poravnat sa sadržajem ispod (ista leva ivica), na desktopu i telefonu.
- Na tabletu i telefonu: hamburger sa 2 crtice, bez kruga; na klik postaje X.
- Mobilni meni: bez okvira, veliki tekstualni linkovi (Oswald) sa malim brojem (14px, boja teksta), ulaze jedan za drugim, zeleni underline na dodir; dole „Contact us" normalne dužine, email i LinkedIn ikonica.
- Logo veći (30px visine, 26px na telefonu). Linkovi sa malim zelenim trouglom, „Contact us" kao pravougaono dugme.

## Hero (slajder)
- Fazon kao wearetheromans.com: pozadina sajta (vide se vertikalne linije), **ogroman naslov u 3 reda** preko širine, u jednom redu mali **prozor sa fotkom** (visok kao slova, isečeni ćoškovi). Fotka se „učitava" brisanjem odozdo + blagi zum.
- Tekst naslova, podnaslova i dugmadi slajdova se uzima TAČNO sa prototipa https://sigmoid-website-prototype.vercel.app/#home (desktop i telefon): Engineering shaped around the challenge. · Software built for products that run in the real world. · Electronics and code that make hardware work. · Robotic hand for automated grocery handling. · Mechanics designed as part of the whole system. Oznaka prvog slajda: „Engineering partner". U `d2.js` (`SLIDES`) `[img]` označava mesto prozora sa fotkom.
- Iznad naslova `{ 01 / 05 — Sigmoid }`. Ispod: podnaslov (širi, ~62ch), pa dva dugmeta levo ispod njega.
- Dole: strelice levo (decagoni, krem), tabovi sa animiranim ikonicama (aktivna ikonica NIJE zelena), linija napretka **1px**, samo iznad AKTIVNOG taba (prethodni tabovi bez linije), sat „Novi Sad { … }" desno. Nema separatora preko širine.
- Gore desno **najavni box „Latest"** (krem) — smenjuju se Success Stories i Insights: veća priča sa slikom + manja ispod, sam se menja na ~5 s, lep prelaz (naslov klizne, slika se otvori odozdo), link samo „Read →", pauza na hover. Bez brojača (01/04). Donji članak ima veći naslov (16–19px).
- Hero je toliko nizak da se na desktopu na dnu vidi pokretna traka (ticker).
- Telefon: hero je visok tačno toliko da se pokretna traka vidi na dnu ekrana na svakom telefonu; tabovi i strelice su na dnu hero-a, strelice LEVO, tabovi SA NAZIVIMA u redu koji se prevlači (aktivni je pun, ostali bledi; aktivni se sam pomeri na sredinu vidnog dela); bez sata, oba dugmeta jedno ispod drugog, preko cele širine, 12px, sa strelicama, najavni box je sakriven iza malog krem jezička sa strelicom i ikonicom vesti, uz desnu ivicu ekrana u liniji oznake iznad naslova; na dodir izlazi s desne strane i izgleda kao na desktopu (zatvara se na ×); ispod dugmadi je red „Clients & partners +" koji se na dodir otvori (15+ i logotipi). Sadržaj hero-a je spušten ka dnu, blizu tabova.
- Odbijeno: velika ikonica kao pozadina; fotka preko celog ekrana; fotka sa leve strane stopljena u pozadinu; podnaslov i dugmad preko fotke; „up next" kartica; krem panel.

- Svi redovi naslova poravnati levo, bez uvlačenja drugog reda.
- Prozor sa fotkom u naslovu je uži (oko 1,3 visine slova u širinu). Ništa u naslovu ne sme da bude zasečeno.
- Favicon: animirana lopta koja se sklapa.
- Credibility strip na svakom slajdu, dole desno: broj + tekst se menja sa slajdom (4 discipline · 80% · 4 industrije · 15+ sistema · 3 discipline — zameniti proverenim podacima kad stignu) + 6 logotipa klijenata/partnera (Orox, FANUC, HTEC, ZTractor, Chubby Buttons, Fond za inovacionu delatnost), 3 u redu i na telefonu.

## Expertise
- Kartice: link „See this expertise" sa zelenim underline-om i strelicom (ne dugme). Hover kartice: krem, bez bordera.
- Kartica „How disciplines combine": „Example:" tanje (200), naslov primera 300 sa zelenim underline-om koji se iscrtava + strelica. Telefon: underline prati tekst kroz redove, strelica je odmah uz poslednju reč.

## Industries
- Telefon: veliki box prvi, ispod industrije kao kompaktni redovi (broj + naziv); na dodir se box promeni i stranica klizne do njega.
- Desno tabovi; aktivni je **čisto krem**, bez okvira (odbijeno: preliv/„liquid" efekat). Svetli delovi ikonica krem.
- Sam prelazi na sledeću industriju na 7 s, klik takođe radi (resetuje tajmer), staje dok je miš iznad.

## Success Stories
- Telefon: prikazane prve 3 priče, ispod link „Load more ↓" koji otvori ostale.
- Bez separatora. „Read the story": zeleni underline koji se iscrtava na hover + duga tanka strelica.

## What clients say
- Telefon: strelice uvek iste veličine (bez hover smanjenja posle dodira).
- Veliki font citata. Strelice decagoni, hover samo krem, bez bordera.

## Accumulated engineering experience
- Animirana „lopta" (poliedar se sklapa); ista ikonica i kao prva u brojačima.

## Possible ways to start
- Naslov + podnaslov levo, dugme „See how we work" gore desno. 4 kartice jedna do druge (kao Expertise: veliki broj, naslov, tekst). Bez strelica. Razmaci između kartica padaju tačno na linije u pozadini; brojevi 01–04 sa digitalnim efektom; manje praznog prostora na dnu.

## Our Experts
- Biografija tačno 2 reda.
- Okrugli bedž sa tekstom u krug („Talk to our engineering team"), zelen, robot u sredini (manji). Isti robot kao u footeru.

## Insights
- Telefon: dugme ispod naslova (isto za sve sekcije sa dugmetom u zaglavlju).
- Dugme „Read all insights". Linkovi „Read the article" zeleni underline koji se iscrtava + duga tanka strelica.

## What are you trying to solve?
- Kraći tekstovi (oko 44 znaka u redu), više razmaka između delova kartice.
- Dve fotke (kod na monitoru, serverski rekovi), bez inicijala LT/NP, kraći tekstovi, više vazduha. Linkovi „See how it works", „View related work".

## Kontakt forma (Tell us about your challenge)
- Upisani tekst i placeholderi u Robotu (desktop i telefon), oznake polja ostaju.
- Polje za poruku je bar 2 reda na telefonu i raste dok se kuca.
- Telefon: forma odvojena od uvodnog teksta (veći razmak).
- Sva polja obavezna, zelena * pored oznake + napomena „All fields are required."
- Greška: koralna boja (#FF9E8C) za liniju polja, oznaku i poruku ispod polja (ikonica !); poruke: ime, email (prazan / neispravan), opis; nestaje dok se ispravlja; fokus na prvo polje sa greškom.

## Footer
- Zelena traka. Veliki tekst „Let's build it." (može se menjati).
- Levo: Contact (info@sigmoid.rs, Novi Sad, telefon primer), veliki robot desno u levom delu, LinkedIn ikonica (krem, hover tamna).
- Desno: Expertise kao velika lista + kolone Working with us / Industries / Company. Hover: underline, bez bele.
- Dno: logo, © Sigmoid d.o.o., Privacy Policy, Terms of Use, Cookies, Landing page; „Design: Elder Design Studio" (https://www.weareelder.com/) i „Back to top ↑" (glatko na vrh).
- Robot: čisto čelo, oči bez sjaja, vizir sa malim zaobljenjem kao uši, globus iz logoa na anteni.
- Odbijeno: veliki „sigmoid" logo/wordmark preko footera; robot stilizovan „flat" po brendu; logo utisnut na čelu robota; kačket na robotu.

## Boje (iz brend fajla u Figmi)
- Sigmoid Green #98BF5A · Midnight #26233C · Lime cream #DBE580 · Graphite #373636 · Bone #D9D6C9 · Platinum #F1F2F2 — sačuvane u `d2.css` pod tim imenima (`--sigmoid-green`, `--midnight`, `--lime-cream`, `--graphite`, `--bone`, `--platinum`).
- U brend fajlu su odštampani HEX za Graphite (014744) i Bone (D6D6C9) greške; prave boje su na samim poljima.

## Tipografija
- Nijedan tekst ispod 12px (WCAG AA provera: kontrast prolazi svuda).
- Svi naslovi Oswald Regular (400). Light (300) samo veliki brojevi/skraćenice (01, SW, 15+, 80%) i citati.

## Linkovi (svuda)
- Na hover se underline iznova iscrta, na svim linkovima (i u footeru, i u cookie banneru).
- Pozadinske vertikalne linije: nema linije skroz desno.

## Cookie banner
- Pozadina = boja pozadine sajta (Platinum), 1px okvir u boji linija sa sajta, isečeni ćoškovi (ranije krem pozadina).
- tamno braon tekst, manji tekst, niži. Samo „Accept" (dugme) i „Reject" (link). Ne prekriva footer bar ni pokretnu traku ispod heroja.
