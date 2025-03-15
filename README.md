# SRT Felirat Fordító

Ez az alkalmazás egy egyszerű, de hatékony webes eszköz .srt formátumú feliratfájlok fordítására. A program a helyi gépen futó LM Studio mesterséges intelligencia modellt használja a fordításhoz.

## Funkciók

- Modern, reszponzív, dark stílusú felhasználói felület Bootstrap keretrendszerrel
- .srt feliratfájlok betöltése és feldolgozása
- Forrásnyelv és célnyelv kiválasztása 15 támogatott nyelvből
- Feliratok mondatonkénti fordítása a helyi LM Studio AI modell segítségével
- Fordítási folyamat vizuális követése haladásjelzővel
- Lefordított feliratfájl mentése az eredeti időkódokkal és formátummal
- **Fordítások manuális szerkesztése** közvetlenül a táblázatban
- **Fordítási szabadságfok (temperature) beállítása** a kreativitás szabályozásához
- Sorok egyenkénti újrafordítása szükség esetén

## Használati útmutató

1. **LM Studio előkészítése:**
   - Telepítsd és indítsd el az LM Studio alkalmazást a gépeden
   - Tölts be egy megfelelő nyelvi modellt
   - Indítsd el a helyi szervert (alapértelmezetten a http://localhost:1234 címen)

2. **Feliratfájl betöltése:**
   - Nyisd meg a weboldalt a böngésződben
   - Kattints a "Tallózás" gombra és válassz ki egy .srt kiterjesztésű feliratfájlt

3. **Fordítási szabadságfok beállítása:**
   - Használd a csúszkát a fordítás kreativitásának beállításához
   - Alacsony érték (0.1-0.7): Pontos, szó szerinti fordítás
   - Közepes érték (0.7-1.3): Kiegyensúlyozott, természetes fordítás
   - Magas érték (1.3-2.0): Kreatív, szabadabb fordítás

4. **Nyelvek kiválasztása:**
   - Válaszd ki a forrásnyelvet (az eredeti felirat nyelve)
   - Válaszd ki a célnyelvet (a kívánt fordítás nyelve)

5. **Fordítás indítása:**
   - Kattints a "Fordítás indítása" gombra
   - Várd meg, amíg a program lefordítja az összes feliratot
   - A folyamat előrehaladását a haladásjelző mutatja
   - Bármikor megállíthatod a fordítást a "Fordítás leállítása" gombbal

6. **Fordítások szerkesztése:**
   - Kattints bármelyik lefordított szövegre a táblázatban a szerkesztéshez
   - Végezd el a kívánt módosításokat
   - A módosítások automatikusan mentésre kerülnek, amikor máshova kattintasz
   - A szerkesztett sorok rövid zöld villanással jelzik a sikeres mentést

7. **Sorok újrafordítása:**
   - Ha egy sort újra szeretnél fordíttatni, kattints a sor mellett található újrafordítás ikonra
   - Az újrafordítás a beállított fordítási szabadságfok szerint történik

8. **Fordítás mentése:**
   - A fordítás befejezése után kattints a "Fordítás mentése" gombra
   - A böngésző letölti az új feliratfájlt, amelynek neve az eredeti fájlnév és a célnyelv kódjának kombinációja

## Rendszerkövetelmények

- Modern webböngésző (Chrome, Firefox, Edge, Safari)
- Futó LM Studio alkalmazás a helyi gépen (http://localhost:1234)
- Megfelelő nyelvi modell az LM Studio-ban

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

### 5. Fejlett fordítási prompt

A fordítási prompt-ot úgy terveztük, hogy a lehető legjobb eredményt érje el:

- Részletes utasításokat adunk az AI-nak a fordítás minőségével kapcsolatban
- Jelezzük, hogy filmfeliratról van szó, ami segít az AI-nak a megfelelő stílus kiválasztásában
- Kérjük, hogy a fordítás természetes és folyékony legyen, miközben megőrzi az eredeti jelentést és stílust

### 6. Automatikus szövegtisztítás

A fordítás során automatikus tisztítási lépéseket alkalmazunk:

- Eltávolítja az esetleges idézőjeleket a fordítás elejéről és végéről
- Eltávolítja a kódjelöléseket és formázásokat, ha az AI ilyeneket adna vissza
- Biztosítja, hogy a fordított szöveg megfelelő formátumban kerüljön a feliratfájlba

## Technikai információk

- Az alkalmazás tisztán kliens-oldali, nem igényel szervert
- A fordítás az LM Studio API-ján keresztül történik a `/v1/completions` végponton
- A program nem küld adatokat külső szerverekre, minden művelet a helyi gépen történik

## Hibaelhárítás

- **A fordítás nem indul el:** Ellenőrizd, hogy az LM Studio fut-e és elérhető-e a http://localhost:1234 címen
- **Fordítási hiba:** Ellenőrizd a böngésző konzolját a részletes hibaüzenetért
- **Lassú fordítás:** A fordítás sebessége függ a használt nyelvi modell méretétől és a számítógép teljesítményétől
- **Pontatlan fordítás:** Próbálj nagyobb vagy specializáltabb nyelvi modellt használni az LM Studio-ban, vagy állítsd alacsonyabbra a fordítási szabadságfokot
- **Szerkesztés nem működik:** Ha problémád van a szerkesztéssel, próbáld frissíteni az oldalt, vagy használj más böngészőt
