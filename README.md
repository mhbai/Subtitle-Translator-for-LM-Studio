# SRT Felirat Fordító

Ez az alkalmazás egy egyszerű, de hatékony webes eszköz .srt formátumú feliratfájlok fordítására. A program a helyi gépen futó LM Studio mesterséges intelligencia modellt használja a fordításhoz.

## Funkciók

- Modern, reszponzív, dark stílusú felhasználói felület Bootstrap keretrendszerrel
- .srt feliratfájlok betöltése és feldolgozása
- Forrásnyelv és célnyelv kiválasztása 15 támogatott nyelvből
- Feliratok mondatonkénti fordítása a helyi LM Studio AI modell segítségével
- Fordítási folyamat vizuális követése haladásjelzővel
- Lefordított feliratfájl mentése az eredeti időkódokkal és formátummal

## Használati útmutató

1. **LM Studio előkészítése:**
   - Telepítsd és indítsd el az LM Studio alkalmazást a gépeden
   - Tölts be egy megfelelő nyelvi modellt
   - Indítsd el a helyi szervert (alapértelmezetten a http://localhost:1234 címen)

2. **Feliratfájl betöltése:**
   - Nyisd meg a weboldalt a böngésződben
   - Kattints a "Tallózás" gombra és válassz ki egy .srt kiterjesztésű feliratfájlt

3. **Nyelvek kiválasztása:**
   - Válaszd ki a forrásnyelvet (az eredeti felirat nyelve)
   - Válaszd ki a célnyelvet (a kívánt fordítás nyelve)

4. **Fordítás indítása:**
   - Kattints a "Fordítás indítása" gombra
   - Várd meg, amíg a program lefordítja az összes feliratot
   - A folyamat előrehaladását a haladásjelző mutatja

5. **Fordítás mentése:**
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

- Az aktuális mondat előtti mondatot is elküldjük, ha létezik
- Az aktuális mondat utáni mondatot is elküldjük, ha létezik
- Ezek a kontextus mondatok segítenek az AI-nak jobban megérteni a szövegkörnyezetet
- Különösen hasznos olyan esetekben, amikor a mondat jelentése a kontextustól függ

### 2. Fordítási memória

Az alkalmazás fordítási memória rendszert használ a konzisztencia biztosítására:

- Eltárolja a már lefordított mondatokat és fordításaikat
- Ha ugyanaz a mondat többször is előfordul a feliratban, akkor nem fordítja le újra
- Biztosítja a konzisztenciát a fordításban, különösen ismétlődő kifejezések esetén
- A memória nyelvpáronként elkülönül, tehát ha változtatunk a forrás- vagy célnyelven, új memória jön létre

### 3. Fejlett fordítási prompt

A fordítási prompt-ot úgy terveztük, hogy a lehető legjobb eredményt érje el:

- Részletes utasításokat adunk az AI-nak a fordítás minőségével kapcsolatban
- Jelezzük, hogy filmfeliratról van szó, ami segít az AI-nak a megfelelő stílus kiválasztásában
- Kérjük, hogy a fordítás természetes és folyékony legyen, miközben megőrzi az eredeti jelentést és stílust

### 4. Automatikus szövegtisztítás

A fordítás során automatikus tisztítási lépéseket alkalmazunk:

- Eltávolítja az esetleges idézőjeleket a fordítás elejéről és végéről
- Biztosítja, hogy a fordított szöveg megfelelő formátumban kerüljön a feliratfájlba

## Technikai információk

- Az alkalmazás tisztán kliens-oldali, nem igényel szervert
- A fordítás az LM Studio API-ján keresztül történik
- A program nem küld adatokat külső szerverekre, minden művelet a helyi gépen történik

## Hibaelhárítás

- **A fordítás nem indul el:** Ellenőrizd, hogy az LM Studio fut-e és elérhető-e a http://localhost:1234 címen
- **Fordítási hiba:** Ellenőrizd a böngésző konzolját a részletes hibaüzenetért
- **Lassú fordítás:** A fordítás sebessége függ a használt nyelvi modell méretétől és a számítógép teljesítményétől
- **Pontatlan fordítás:** Próbálj nagyobb vagy specializáltabb nyelvi modellt használni az LM Studio-ban
