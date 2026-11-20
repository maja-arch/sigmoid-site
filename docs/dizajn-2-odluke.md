# Dizajn 2 — odluke po sekcijama

Stanje dogovoreno sa korisnicom (novembar 2026). „Odbijeno" znači: to je probano i nije se svidelo, ne vraćati.

## Loader
- Probano i ODBIJENO (ikonice + brojač + prelaz na skrol). Nema loadera.

## Header
- Telefon: zaglavlje bez pozadine i zamućenja, stoji na vrhu strane i odlazi sa skrolom (ne vraća se pri skrolu nagore). Desktop: nepromenjeno.
- Logo u zaglavlju (desktop i telefon): animirani globus — ista animacija kao favicon (isti delovi lopte, isti redosled i ritam, puna brend zelena); slova mirna.
- Logo poravnat sa sadržajem ispod (ista leva ivica), na desktopu i telefonu.
- Na tabletu i telefonu: hamburger sa 2 crtice, bez kruga; na klik postaje X.
- Mobilni meni: sat „Novi Sad { … }" iznad dugmeta Contact us (u heroju na telefonu nema sata).
- Mobilni meni: bez okvira, veliki tekstualni linkovi (Oswald) sa malim brojem (14px, boja teksta), ulaze jedan za drugim, zeleni underline na dodir; dole „Contact us" normalne dužine, email i LinkedIn ikonica.
- Logo veći (30px visine, 26px na telefonu). Linkovi sa malim zelenim trouglom, „Contact us" kao pravougaono dugme.

## Hero (slajder)
- Fazon kao wearetheromans.com: pozadina sajta (vide se vertikalne linije), **ogroman naslov u 3 reda** preko širine, u jednom redu mali **prozor sa fotkom** (visok kao slova, isečeni ćoškovi). Fotka se „učitava" brisanjem odozdo + blagi zum.
- Tekst naslova, podnaslova i dugmadi slajdova se uzima TAČNO sa prototipa https://sigmoid-website-prototype.vercel.app/#home (desktop i telefon): Engineering shaped around the challenge. · Software built for products that run in the real world. · Electronics and code that make hardware work. · Robotic hand for automated grocery handling. · Mechanics designed as part of the whole system. Oznaka prvog slajda: „Engineering partner". U `d2.js` (`SLIDES`) `[img]` označava mesto prozora sa fotkom.
- Nema oznake iznad naslova (uklonjena na desktopu i telefonu). Ispod: podnaslov (širi, ~62ch), pa dva dugmeta levo ispod njega.
- Dole: strelice levo (decagoni, krem), tabovi sa ikonicama koje stoje mirno, bez animacije (aktivna ikonica NIJE zelena), linija napretka **1px**, samo iznad AKTIVNOG taba (prethodni tabovi bez linije), sat „Novi Sad { … }" desno. Nema separatora preko širine.
- Gore desno **najavni box „Latest"** (krem) — smenjuju se Success Stories i Insights: veća priča sa slikom + manja ispod, sam se menja na ~5 s, lep prelaz (naslov klizne, slika se otvori odozdo), link samo „Read →", pauza na hover. Bez brojača (01/04). Donji članak ima veći naslov (16–19px).
- Hero je toliko nizak da se na desktopu na dnu vidi pokretna traka (ticker).
- Telefon: hero je visok tačno toliko da se pokretna traka vidi na dnu ekrana na svakom telefonu; tabovi i strelice su na dnu hero-a, strelice LEVO, tabovi SA NAZIVIMA u redu koji se prevlači (aktivni je pun, ostali bledi; aktivni se sam pomeri na sredinu vidnog dela); bez sata, oba dugmeta jedno pored drugog (iste visine; tekst može u 2 reda, 12px, strelica desno), najavni box je sakriven iza malog krem jezička sa strelicom i ikonicom vesti, fiksno gore desno uz ivicu ekrana (ne pomera se sa slajdovima), sadržaj hero-a spušten ispod njega; na dodir izlazi s desne strane i izgleda kao na desktopu (zatvara se na ×); ispod dugmadi je red „Clients & partners +" koji se na dodir otvori (15+ i logotipi). Sadržaj hero-a je spušten ka dnu, blizu tabova.
- Odbijeno: velika ikonica kao pozadina; fotka preko celog ekrana; fotka sa leve strane stopljena u pozadinu; podnaslov i dugmad preko fotke; „up next" kartica; krem panel.

- Svi redovi naslova poravnati levo, bez uvlačenja drugog reda.
- Telefon: najduži red naslova zauzima oko 85% širine ekrana (font se računa po slajdu, najviše 60px), a smanji se i ako bi pokretna traka ispala ispod ekrana.
- Pokretna traka: 70 px/s, ista brzina na desktopu i telefonu.
- Prozor sa fotkom u naslovu je uži (oko 1,3 visine slova u širinu). Ništa u naslovu ne sme da bude zasečeno.
- Favicon: animirana lopta koja se sklapa.
- Dokaz (broj + tekst, menja se sa slajdom) BEZ logotipa: desktop desno ispod najavnog boxa, u visini dugmadi, tekst uvek u 2 ujednačena reda; telefon ispod dugmadi. (Logotipi u heroju odbijeni.)

## Expertise
- Kartice: link „See this expertise" sa zelenim underline-om i strelicom (ne dugme). Hover kartice: krem, bez bordera.
- Kartica „How disciplines combine" (telefon: slika iznad preko cele širine, veći naslov ispod): „Example:" tanje (200), naslov primera 300 sa zelenim underline-om koji se iscrtava + strelica. Telefon: underline prati tekst kroz redove, strelica je odmah uz poslednju reč.

## Industries
- Telefon: veliki box prvi, ispod industrije kao kompaktni redovi (broj + naziv); na dodir se box promeni i stranica klizne do njega.
- Desktop: tabovi (mali boxevi) LEVO, veliki box DESNO; aktivni tab je **čisto krem**, bez okvira (odbijeno: preliv/„liquid" efekat). Svetli delovi ikonica krem.
- Sam prelazi na sledeću industriju na 7 s, klik takođe radi (resetuje tajmer), staje dok je miš iznad.

## Success Stories
- Telefon: prikazane prve 3 priče, ispod link „Load more ↓" koji otvori ostale.
- Bez separatora. „Read the story": zeleni underline koji se iscrtava na hover + duga tanka strelica.

## What clients say
- Telefon: strelice uvek iste veličine (bez hover smanjenja posle dodira).
- Veliki font citata. Strelice decagoni, hover samo krem, bez bordera.

## Accumulated engineering experience
- Velika lopta u velikom boxu je STATIČNA (bez animacije); mala lopta u prvom brojaču se animira.
- Desktop: tri boxa desno zajedno su visoka kao veliki box levo; tekst u njima veći (18–22px), brojevi veći. Telefon: isti veći tekst.

## Possible ways to start
- Naslov + podnaslov levo, dugme „See how we work" gore desno. 4 kartice jedna do druge (kao Expertise: veliki broj, naslov, tekst). Bez strelica. Razmaci između kartica padaju tačno na linije u pozadini; brojevi 01–04 sa digitalnim efektom koji se desi SAMO JEDNOM kad se stigne do sekcije (bez ponavljanja); manje praznog prostora na dnu.

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
- Levo: Contact (info@sigmoid.rs, Novi Sad, telefon primer), veliki robot desno u levom delu (na telefonu upola manji, centriran), LinkedIn: zvanični LinkedIn znak (kvadrat sa „in"), bez boxa, na hover zvanična LinkedIn plava #0A66C2, ispod kontakt podataka (DIM); isti znak u mobilnom meniju → https://www.linkedin.com/company/sigmoiddoo/home/ (isto i u mobilnom meniju).
- Desno: Expertise kao velika lista + kolone Working with us / Industries / Company. Hover: underline koji prati tekst red po red (nikad šire od reči), iscrtava se iznova; bez bele.
- Dno: logo (vodi na početnu; na početnoj glatko na vrh), © Sigmoid d.o.o., Privacy Policy, Terms of Use, Cookies (bez „Landing page"); „Design: Elder Design Studio" (https://www.weareelder.com/) i „Back to top ↑" (glatko na vrh).
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

## Runda „veliki pregled" (20.11.)
- SVI boxevi i slike su pravougaoni (bez isečenih ćoškova); strelice slajdera/citata ostaju decagon.
- Header: zvanični animirani logo (images/logo-anim.webp, iz GIF-a od klijenta; simbol se sklapa), bez trouglića ispred linkova, linkovi 15.5px; zaglavlje bez pozadine, stoji na vrhu strane (ne prati skrol) — DIM.
- Hero desktop: naslov oko 7.4vw (do 140px); najavni box stalne visine (naslovi ograničeni na 3 / 2 reda, bez skakanja); dokaz u pravougaonom boxu iste širine ispod najavnog boxa; strelice outline, hover krem bez okvira; unutrašnji delovi ikonica u tabovima boje pozadine.
- Expertise: naslov u 3 reda (desktop), manji inicijali, „See expertise"; „{ How disciplines combine }"; naslov kartice manji; tagovi pravougaoni sa animacijom okvira.
- Industries: bez tagova u levim boxevima; levi stub širi (razmak pada na liniju u pozadini); manji brojevi, veći naslov desno; nove ikonice (Data Centers, Logistics, Manufacturing, Energy) sa animacijama: diskovi pulsiraju, strelice se okreću, šipke kao klipovi, munja treperi.
- Accumulated: bez ikonice levo od naslova, naslov u 2 reda poravnat sa tekstom.
- Insights: na hover samo zum fotke, bez obojenog sloja.
- What are you trying to solve?: kompaktne kartice (fotka levo, tekst desno na desktopu), oznake regular sa zelenim trouglićem, veći naslovi.
- Kontakt: „{ Start a conversation }", forma uža na svom panelu, „All fields are required." iznad dugmeta.
- Zvanični animirani simbol (images/symbol-anim.webp) na vrhu robotove antene (footer i bedž) i kao favicon (frejmovi iz images/favicon-sprite.png, smenjuju se kroz JS).
- Centriran hero na desktopu je probano i ODBIJENO — hero ostaje poravnat levo, najavni box gore desno, dokaz ispod njega.
- Širina sajta ostaje kao pre (uži container 1280px probano i ODBIJENO); razmak između boxeva 16px (telefon 12px); razmaci u 2 i 4 kolone padaju na sive linije u pozadini; veći unutrašnji razmak u karticama.
- Container malo uži na desktopu (oko 50px sa strane). Nav linkovi razmaknutiji. Najavni box i dokaz pomereni malo od desne ivice. Naslovi slajdova +10px, gušći razmak slova; fotka u naslovu uža. Gornji članak u najavnom boxu krupniji (21–26px).
- Oznake kao „Typical challenge", „Challenge / Sigmoid role / Outcome": regular sa zelenim trouglićem.
- Industries: veliki box bez separatora, desno fotka industrije (menja se sa industrijom; Energy = privremena fotka Lyra); naslovi odvojeni od ikonica.

## Runda 66 — telefon
- Footer: LinkedIn na dodir samo opacity 80% (bez plave); robot gore desno, manji footer.
- Dugmad sekcija (Success Stories, Insights, …) idu ispod sadržaja, ne ispod podnaslova.
- Accumulated engineering experience: boxevi kao industries panel — broj levo, ikonica gore desno, tekst ispod.
- Meni: mail ispod linkova (veći font), dole sat + Novi Sad i LinkedIn.
- Robot (kasnije zamenjeno u rundi 68): glava i uši dekagon (zajednički crtež, pa važi i za desktop footer i bedž).

## Runda 67 — desktop
- Nav linkovi 14px.
- Najavni box i dokaz ponovo uz desnu ivicu (poravnati sa „Contact us").
- „{ How disciplines combine }" box više nije celom širinom: zauzima kolone 3–4 (desna polovina), sadržaj složen jedno ispod drugog.

## Runda 68 — desktop
- Najavni box: isti razmak između naslova gornjeg članka i „Read" (nema rezervisanog 3. reda).
- Industries panel: veća ikonica, desna ivica poravnata sa fotkom; „Explore…" dugme širine teksta; bez digitalnog efekta u naslovu panela.
- Success Stories: dugme ispod 4 boxa, levo; tekst u karticama 16px.
- Citati: uža mera teksta (kratki u 2 reda, dugi u 3); visina boxa se ne menja između citata.
- Accumulated: levi box krem; brojke desno više nisu boxevi nego lista sa linijama (da ne deluju klikabilno). Sve linije boja 0.32 graphite.
- Male oznake (Typical challenge, Challenge, Expertise area, Worked on, Your situation…): Roboto Regular, all caps, 12px, zeleni trouglić.
- Insights: više mesta između taga i naslova. Back to top: debljina kao Privacy Policy.
- Robot: vraćena glava od jutros (pravougaonik sa zasečenim uglovima), ali špicasti uglovi; uši takođe sa špicastim (zasečenim) uglovima; oči jednobojne svetlo zelene. (Oktagon/dekagon probano i odbijeno.)

## Runda 69 — desktop kontakt
- „Tell us about your challenge" kompaktno: naslov levo, tekst i linkovi desno u istom redu; forma u jednom redu ispod (Name · Work email · izazov · Send message), bez posebnog panela. Visina oko 470px umesto 700px. Telefon nepromenjen.

## Runda 70 — navigacija
- Hover na linkove u navigaciji: tanka zelena linija ispod teksta koja se iscrtava pri svakom hoveru (bez krem pozadine).
- Razmak između naslova sekcije (ili podnaslova) i sadržaja: svuda 28px, kao kod Industries (desktop i telefon).
- Industries tabovi hover: bez tamnog okvira — svetla krem nijansa, naziv se pomeri udesno iza zelenog trouglića, broj zelen.
- Industries panel (desktop): bez ikonice gore desno; fotka kreće od vrha boxa.

## Runda 72
- Najavni box: naslovi se nikad ne seku (bez ograničenja broja redova), desktop i telefon. Box malo spušten na desktopu.
- Box sa dokazom u heroju: popuna boje pozadine sajta (Platinum).
- Accumulated: levi box bez bordera (krem); desno ponovo tri boxa; veći razmak ikonica–tekst; tekst u boxevima 16–18px.
- Possible ways to start: manji brojevi (48–80px).
- Our Experts: više razmaka između slike i sadržaja i ispod imena.
- What are you trying to solve: linkovi odmah posle teksta, isti razmak u obe kartice.

## Runda 73
- Svi linkovi sa zelenim underlineom ga ponovo iscrtavaju na hover (i naslovi u Success Stories).
- Success Stories: „Sigmoid role" u jednom redu; tagovi odmaknuti od teksta.
- Accumulated: boxevi kao jutros (ikonica, tekst, broj), malo manji (tekst ~19px, broj do 76px).
- Insights: zeleno dugme ispod članaka levo; manji boxevi (fotka 2:1, manji padding).
- What are you trying to solve: bez separatora i bez oznaka „01 / Partner"; sadržaj kreće više, isto u oba boxa.

## Runda 74
- Selekcija teksta na krem boxevima (Accumulated, najavni box, aktivni Industries tab, cookie) je lime cream, da se vidi.
- Accumulated desno: kompaktni boxevi kao ranije (prirodna visina, poravnati gore, ne razvlače se do visine levog boxa); tekst 18px, broj do 52px.

## Runda 75
- Footer: naslov desno + zamenjeni boxevi probano i ODBIJENO — footer ostaje kakav je bio.
- Back to top: bez underlinea, iscrtava se samo na hover. LinkedIn hover: samo opacity 80% (footer i meni, DIM) — bez plave.
- „Tell us about your challenge": ogroman naslov sa strelicom probano i ODBIJENO. Sada jednostavno i kompaktno (desktop): levo tag, naslov (36–56px), tekst i linkovi; desno forma (Name i Email u redu, opis, dugme). Visina ~385px.

## Runda 76
- Industries: „Different industry?…" ispod boxeva (van panela), uvek vidljivo.
- Success Stories: bez oznake („01 / Logistics") iznad naslova.
- Our Experts: samo ime i uloga probano i ODBIJENO — kartice ostaju sa ulogom, imenom, opisom, Expertise area i Worked on.
- What are you trying to solve: tekstovi iz prototipa (duže verzije „Your situation" / „What Sigmoid takes on").
- Kontakt: linkovi odmaknuti od teksta.
