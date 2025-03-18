# SRT Felirat Fordító

Ez az alkalmazás egy egyszerű, de hatékony webes eszköz .srt formátumú feliratfájlok fordítására. A program a helyi gépen futó LM Studio mesterséges intelligencia modellt vagy a ChatGPT API-t használja a fordításhoz.

## Funkciók

- Modern, reszponzív, dark stílusú felhasználói felület Bootstrap keretrendszerrel
- .srt feliratfájlok betöltése és feldolgozása
- Forrásnyelv és célnyelv kiválasztása 15 támogatott nyelvből
- **Többnyelvű felhasználói felület** 30 különböző nyelven
- Feliratok mondatonkénti fordítása a helyi LM Studio AI modell vagy a ChatGPT API segítségével
- **Fordítási mód választás**: LM Studio helyi modell vagy ChatGPT API (GPT-4o vagy GPT-4o-mini)
- Fordítási folyamat vizuális követése haladásjelzővel
- Lefordított feliratfájl mentése az eredeti időkódokkal és formátummal
- **Fordítások manuális szerkesztése** közvetlenül a táblázatban
- **Fordítási szabadságfok (temperature) beállítása** a kreativitás szabályozásához
- Sorok egyenkénti újrafordítása szükség esetén
- **Munkafájl mentése és betöltése** a fordítási folyamat későbbi folytatásához (.wrk munkafájlok)
- **Forrás blokk mentése** a forrás feliratok csak szöveges tartalmának sorszámozottblokk formátumban történő mentése külső szöveges fordításhoz.
- **Külső sorszámozott fordított sorok betöltése** külső forrásból származó és sorszámmal ellátott fordított sorokat beilleszt a fordítás táblázat azonos sorszámú soraiba a program (.mmm formátumú szövegfájlok. A forrás blokkmentés fordításait tartalmazhatja, amit a program be tud illeszteni a munkafolyamatba.)
- **API kulcs titkosított formában tárolása** Ez nem tökéletes biztonság, de sokkal jobb, mint a titkosítás nélküli tárolás. Véd a felületes vizsgálat ellen: Ez a módszer megvédi az API kulcsot a felületes vizsgálattól (pl. ha valaki csak megnézi a localStorage tartalmát), de egy elszánt támadó, aki hozzáfér a kódhoz és a localStorage-hoz, még mindig visszafejtheti.

## Használati útmutató

1. **Fordítási mód kiválasztása:**
   - Válaszd ki a fordítási módot a legördülő menüből:
     - **LM Studio (helyi)**: Helyi gépen futó LM Studio modell használata
     - **ChatGPT (GPT-4o-mini)**: OpenAI GPT-4o-mini modell használata
     - **ChatGPT (GPT-4o)**: OpenAI GPT-4o modell használata

2. **LM Studio előkészítése (ha LM Studio módot választottál):**
   - Telepítsd és indítsd el az LM Studio alkalmazást a gépeden
   - Tölts be egy megfelelő nyelvi modellt
   - Indítsd el a helyi szervert (alapértelmezetten a http://localhost:1234 címen)

3. **ChatGPT API beállítása (ha ChatGPT módot választottál):**
   - Add meg az OpenAI API kulcsodat a megjelenő mezőben
   - Az API kulcs titkosítva tárolódik a böngésződben

4. **Felhasználói felület nyelvének kiválasztása:**
   - Kattints a jobb felső sarokban található nyelvválasztó gombra
   - Válaszd ki a kívánt nyelvet a 30 elérhető nyelvből
   - A felhasználói felület azonnal frissül a kiválasztott nyelven

5. **Feliratfájl betöltése:**
   - Nyisd meg a weboldalt a böngésződben
   - Kattints a "Tallózás" gombra és válassz ki egy .srt kiterjesztésű feliratfájlt vagy egy korábban mentett .wrk munkafájlt

6. **Fordítási szabadságfok beállítása:**
   - Használd a csúszkát a fordítás kreativitásának beállításához
   - Alacsony érték (0.1-0.7): Pontos, szó szerinti fordítás
   - Közepes érték (0.7-1.3): Kiegyensúlyozott, természetes fordítás
   - Magas érték (1.3-2.0): Kreatív, szabadabb fordítás

7. **Nyelvek kiválasztása:**
   - Válaszd ki a forrásnyelvet (az eredeti felirat nyelve)
   - Válaszd ki a célnyelvet (a kívánt fordítás nyelve)

8. **Fordítás indítása:**
   - Kattints a "Fordítás indítása" gombra
   - Várd meg, amíg a program lefordítja az összes feliratot
   - A folyamat előrehaladását a haladásjelző mutatja
   - Bármikor megállíthatod a fordítást a "Fordítás leállítása" gombbal

9. **Fordítások szerkesztése:**
   - Kattints bármelyik lefordított szövegre a táblázatban a szerkesztéshez
   - Végezd el a kívánt módosításokat
   - A módosítások automatikusan mentésre kerülnek, amikor máshova kattintasz
   - A szerkesztett sorok rövid zöld villanással jelzik a sikeres mentést

10. **Sorok újrafordítása:**
    - Ha egy sort újra szeretnél fordíttatni, kattints a sor mellett található újrafordítás ikonra
    - Az újrafordítás a kiválasztott fordítási móddal és a beállított fordítási szabadságfok szerint történik

11. **Fordítás mentése:**
    - A fordítás befejezése után kattints a "Fordítás mentése" gombra
    - A böngésző letölti az új feliratfájlt, amelynek neve az eredeti fájlnév és a célnyelv kódjának kombinációja

12. **Munkafájl mentése és betöltése:**
    - Ha szeretnéd megszakítani a fordítást és később folytatni, kattints a "Munkafájl mentése" gombra
    - A böngésző letölti a .wrk kiterjesztésű munkafájlt, amely tartalmazza az összes fordítási adatot
    - Később betöltheted ezt a fájlt a "Tallózás" gombbal, és folytathatod a fordítást onnan, ahol abbahagytad

13. **Forrás blokk mentése:**
    - Kattints a "Forrás blokkmentése" gombra
    - A böngésző letölti a forrásfájl szöveges tartalmát sorzámmal ellátva 50 soros blokkokra osztva.
    - Hasznos funkció, ha csak bizonyos részeket szeretnél kiemelni vagy külön kezelni, illetve lehetőséget ad más chat felületeken történő fordításra.

## Rendszerkövetelmények

- Modern webböngésző (Chrome, Firefox, Edge, Safari)
- LM Studio mód esetén: Futó LM Studio alkalmazás a helyi gépen (http://localhost:1234)
- ChatGPT mód esetén: Érvényes OpenAI API kulcs

## Fejlett fordítási funkciók

Az alkalmazás számos fejlett fordítási funkciót tartalmaz a pontosabb és konzisztensebb fordítások érdekében:

### 1. Kontextus alapú fordítás

A fordítás során nem csak az aktuális mondatot küldjük el az AI-nak, hanem kontextust is adunk neki:

- Az aktuális mondat előtti 4 mondatot is elküldjük (ha léteznek)
- Az aktuális mondat utáni 4 mondatot is elküldjük (ha léteznek)
- Ezek a kontextus mondatok segítenek az AI-nak jobban megérteni a szövegkörnyezetet
- Különösen hasznos olyan esetekben, amikor a mondat jelentése a kontextustól függ
- A bővített kontextus jelentősen javítja a fordítás minőségét, különösen hosszabb párbeszédek és összetett jelenetek esetén

### 2. Fordítási memória

Az alkalmazás fordítási memória rendszert használ a konzisztencia biztosítására:

- Eltárolja a már lefordított mondatokat és fordításaikat
- Ha ugyanaz a mondat többször is előfordul a feliratban, akkor nem fordítja le újra
- Biztosítja a konzisztenciát a fordításban, különösen ismétlődő kifejezések esetén
- A memória nyelvpáronként elkülönül, tehát ha változtatunk a forrás- vagy célnyelven, új memória jön létre

### 3. Fordítási szabadságfok (Temperature)

A fordítási szabadságfok beállítása lehetővé teszi a fordítás kreativitásának szabályozását:

- **Alacsony érték (0.1-0.7)**: Pontosabb, szó szerinti fordítás, kevesebb kreativitással. Ideális dokumentumokhoz, technikai szövegekhez.
- **Közepes érték (0.7-1.3)**: Kiegyensúlyozott fordítás, amely megőrzi az eredeti jelentést, de természetesebb nyelvezetet használ.
- **Magas érték (1.3-2.0)**: Kreatívabb, szabadabb fordítás, amely jobban alkalmazkodik a célnyelv idiómáihoz. Ideális irodalmi szövegekhez, párbeszédekhez.

### 4. Manuális szerkesztés

A fordítások manuális szerkesztése lehetővé teszi a finomhangolást:

- Közvetlenül a táblázatban szerkesztheted a fordított szöveget
- A módosítások automatikusan mentésre kerülnek a fordítási memóriába
- A szerkesztett sorok rövid zöld villanással jelzik a sikeres mentést
- Nem kell újrafordítanod az egész feliratot egy-egy hiba miatt

### 5. Munkafájl mentése és betöltése

A munkafájl funkció lehetővé teszi a fordítási folyamat megszakítását és későbbi folytatását:

- A munkafájl (.wrk) tartalmazza az összes fordítási adatot:
  - Eredeti és lefordított feliratok
  - Aktuális fordítási pozíció
  - Nyelvi beállítások
  - Fordítási szabadságfok
  - Fordítási memória
- Bármikor elmentheted a munkafájlt és később folytathatod a fordítást
- Különösen hasznos hosszabb feliratfájlok esetén, vagy ha több részletben szeretnéd elvégezni a fordítást
- A munkafájl betöltése után pontosan onnan folytathatod, ahol abbahagytad

### 6. Fejlett fordítási prompt

A fordítási prompt-ot úgy terveztük, hogy a lehető legjobb eredményt érje el:

- Részletes utasításokat adunk az AI-nak a fordítás minőségével kapcsolatban
- Jelezzük, hogy filmfeliratról van szó, ami segít az AI-nak a megfelelő stílus kiválasztásában
- Kérjük, hogy a fordítás természetes és folyékony legyen, miközben megőrzi az eredeti jelentést és stílust

### 7. Automatikus szövegtisztítás

A fordítás során automatikus tisztítási lépéseket alkalmazunk:

- Eltávolítja az esetleges idézőjeleket a fordítás elejéről és végéről
- Eltávolítja a kódjelöléseket és formázásokat, ha az AI ilyeneket adna vissza
- Biztosítja, hogy a fordított szöveg megfelelő formátumban kerüljön a feliratfájlba

### 8. Többnyelvű felhasználói felület

Az alkalmazás felhasználói felülete 30 különböző nyelven érhető el:

- A jobb felső sarokban található nyelvválasztó gombbal válthatunk a nyelvek között
- A kiválasztott nyelv szerint az alkalmazás összes funkcionális felirata, nyomógomb szövege és figyelmeztető üzenete automatikusan frissül
- A nyelvi beállítás a böngésző localStorage-jában tárolódik, így a felhasználó következő látogatásakor is megmarad

### 9. Fordítási mód választás

Az alkalmazás három különböző fordítási módot kínál:

- **LM Studio (helyi)**: A helyi gépen futó LM Studio modell használata a fordításhoz
- **ChatGPT (GPT-4o-mini)**: Az OpenAI GPT-4o-mini modelljének használata a fordításhoz
- **ChatGPT (GPT-4o)**: Az OpenAI GPT-4o modelljének használata a fordításhoz

A fordítási mód a böngésző localStorage-jában tárolódik, így a felhasználó következő látogatásakor is megmarad.

### 10. API kulcs biztonságos tárolása

Az OpenAI API kulcs biztonságos tárolása:

- Az API kulcs titkosítva tárolódik a böngésző localStorage-jában
- AES titkosítási algoritmus védi az API kulcsot
- A felhasználónak nem kell minden alkalommal újra beírnia az API kulcsot, amikor újraindítja a programot
- A titkosítás védelmet nyújt a felületes vizsgálat ellen



## Technikai információk
- Az alkalmazás tisztán kliens-oldali, nem igényel szervert
- A fordítás az LM Studio API-ján keresztül történik a `/v1/completions` végponton vagy a ChatGPT API-n keresztül
- A program nem küld adatokat külső szerverekre, kivéve a ChatGPT API-t, ha azt a fordítási módot választottad
- A munkafájlok JSON formátumban tárolódnak, és tartalmazzák az összes szükséges adatot a fordítás folytatásához
- Az API kulcsok AES titkosítással tárolódnak a böngésző localStorage-jában

### CORS hibák kezelése LM Studio használatakor

Az LM Studio helyi szerverének használatakor előfordulhatnak CORS (Cross-Origin Resource Sharing) hibák, amelyek megakadályozhatják, hogy a böngésző kommunikáljon a helyi API-val. Ez a biztonsági korlátozás a böngészőkben megakadályozza, hogy egy weboldal más forrásból származó erőforrásokat érjen el, ha az a forrás nem engedélyezi kifejezetten a hozzáférést.

#### CORS hibák jelei:
- A fordítás nem indul el, vagy hibára fut
- A böngésző konzoljában "Access to fetch at 'http://localhost:1234/v1/completions' from origin 'null' has been blocked by CORS policy" típusú hibaüzenet jelenik meg

#### Megoldási lehetőségek:

1. **CORS Everywhere bővítmény használata (ajánlott)**:
   - Telepítsd a "CORS Everywhere" vagy hasonló CORS-feloldó bővítményt a böngésződhöz
   - Firefox: [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)
   - Chrome: [CORS Unblock](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)
   - Aktiváld a bővítményt, amikor az alkalmazást használod
   - **Fontos**: Biztonsági okokból csak akkor aktiváld a bővítményt, amikor erre az alkalmazásra van szükséged, és használat után deaktiváld

2. **LM Studio beállítása CORS engedélyezésére**:
   - Az LM Studio újabb verziói támogatják a CORS fejlécek beállítását
   - A szerver indításakor a beállításokban engedélyezd a CORS-t
   - Részletes útmutatásért ellenőrizd az LM Studio dokumentációját

3. **Helyi webszerver használata**:
   - Futtass egy egyszerű helyi webszervert (pl. Python http.server, Node.js http-server)
   - Nyisd meg az alkalmazást a webszerver által szolgáltatott URL-en (pl. http://localhost:8000)
   - Ez gyakran megoldja a CORS problémákat, mivel a weboldal és az API ugyanarról a forrásról (localhost) származik

4. **Parancssori indítás speciális paraméterekkel**:
   - Chrome böngésző indítása CORS ellenőrzés kikapcsolásával (csak teszteléshez):
     ```
     chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"
     ```
   - **Figyelem**: Ez biztonsági kockázatot jelent, csak tesztelési célokra használd, és ne böngéssz más oldalakat ebben a böngészőablakban

#### Biztonsági figyelmeztetés:
A CORS korlátozások megkerülése biztonsági kockázatot jelenthet. Csak megbízható helyi alkalmazásokkal (mint az LM Studio) használd ezeket a megoldásokat, és csak addig, amíg szükséges.

## Hibaelhárítás

- **A fordítás nem indul el (LM Studio mód):** Ellenőrizd, hogy az LM Studio fut-e és elérhető-e a http://localhost:1234 címen
- **A fordítás nem indul el (ChatGPT mód):** Ellenőrizd, hogy megadtad-e az érvényes OpenAI API kulcsot
- **Fordítási hiba:** Ellenőrizd a böngésző konzolját a részletes hibaüzenetért
- **Lassú fordítás:** A fordítás sebessége függ a használt nyelvi modell méretétől és a számítógép teljesítményétől, illetve a ChatGPT API válaszidejétől
- **Pontatlan fordítás:** Próbálj nagyobb vagy specializáltabb nyelvi modellt használni, vagy állítsd alacsonyabbra a fordítási szabadságfokot
- **Szerkesztés nem működik:** Ha problémád van a szerkesztéssel, próbáld frissíteni az oldalt, vagy használj más böngészőt
- **Munkafájl betöltési hiba:** Ellenőrizd, hogy a munkafájl formátuma megfelelő-e, és nem sérült-e a fájl
- **API kulcs nem mentődik:** Ellenőrizd, hogy a böngésződ támogatja-e a localStorage használatát és nincs-e letiltva
