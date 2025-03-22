// Fordítási funkciók

// Egy felirat újrafordítása
async function retranslateSubtitle(index, {
    rowsBeingRetranslated,
    sourceLanguageSelect,
    targetLanguageSelect,
    temperatureSlider,
    translationModeSelect,
    apiKeyInput,
    originalSubtitles,
    translatedSubtitles,
    translationMemory,
    updateTranslatedText,
    translateWithChatGpt,
    translateTextWithContext,
    saveTranslationBtn,
    saveWorkFileBtn,
    currentLangCode,
    uiTranslations
}) {
    // Ellenőrizzük, hogy fut-e már újrafordítás erre a sorra
    if (rowsBeingRetranslated.has(index)) {
        return;
    }
    
    // Jelezzük, hogy ez a sor újrafordítás alatt áll
    rowsBeingRetranslated.add(index);
    
    // Fordítás gomb állapotának módosítása
    const retranslateBtn = document.getElementById(`retranslate-${index}`);
    if (retranslateBtn) {
        retranslateBtn.disabled = true;
        retranslateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    }
    
    // Nyelvi beállítások
    const sourceLanguage = sourceLanguageSelect.value;
    const targetLanguage = targetLanguageSelect.value;
    
    // Hőmérséklet beállítás
    const temperature = parseFloat(temperatureSlider.value);
    
    // Fordítási mód ellenőrzése
    const selectedMode = translationModeSelect.value;
    const apiKey = apiKeyInput.value;

    try {
        let translatedText = '';
        
        // A kiválasztott fordítási mód alapján hívjuk meg a megfelelő fordítási függvényt
        if (selectedMode === 'chatgpt_4o_mini' || selectedMode === 'chatgpt_4o') {
            // Ellenőrizzük, hogy van-e API kulcs
            if (!apiKey) {
                alert(uiTranslations[currentLangCode]?.errorNoApiKey || 'Please enter the API key to use ChatGPT!');
                return;
            }
            
            // ChatGPT modell kiválasztása
            const model = selectedMode === 'chatgpt_4o_mini' ? 'gpt-4o-mini' : 'gpt-4o';
            
            // ChatGPT fordítás
            translatedText = await translateWithChatGpt(
                originalSubtitles[index].text,
                sourceLanguage,
                targetLanguage,
                apiKey,
                model,
                temperature
            );
        } else {
            // LM Studio fordítás
            translatedText = await translateTextWithContext(
                originalSubtitles,
                index,
                sourceLanguage,
                targetLanguage,
                0,
                temperature
            );
        }
        
        // Fordított szöveg mentése
        translatedSubtitles[index] = translatedText;
        
        // Táblázat frissítése
        updateTranslatedText(index, translatedText);
        
        // Fordítási memória frissítése
        if (!translationMemory.translations) {
            translationMemory.translations = {};
        }
        translationMemory.translations[originalSubtitles[index].text] = translatedText;
        
        // Mentés gomb engedélyezése
        saveTranslationBtn.disabled = false;
        
        // Munkafájl mentés gomb megjelenítése
        saveWorkFileBtn.classList.remove('d-none');
        
    } catch (error) {
        console.error('Újrafordítási hiba:', error);
        alert(`An error occurred during the re-translation: ${error.message}`);
    } finally {
        // Fordítás gomb visszaállítása
        if (retranslateBtn) {
            retranslateBtn.disabled = false;
            retranslateBtn.innerHTML = `<i class="bi bi-arrow-repeat me-1"></i>${uiTranslations[currentLangCode]?.retranslate || 'Újrafordítás'}`;
            retranslateBtn.classList.remove('d-none');
        }
        
        // Töröljük a sort az újrafordítás alatt állók közül
        rowsBeingRetranslated.delete(index);
    }
}

 // Szekvenciális fordítás a ChatGPT API-val
 async function translateSequentially(startIndex, sourceLanguage, targetLanguage, apiKey, mode, temperature, {
    originalSubtitles,
    translatedSubtitles,
    isTranslationPausedRef, // Referencia a szüneteltetés változóhoz
    currentTranslationIndex,
    updateProgressBar,
    updateTranslatedText,
    translationMemory,
    saveTranslationBtn,
    saveWorkFileBtn,
    scrollToRow,
    pauseTranslation,
    translateWithChatGptCustomPrompt
 }) {
    // ChatGPT API kérések közötti késleltetés (ms) - 0.2 másodperc
    const API_DELAY = 200;
    
    // A megfelelő modell kiválasztása
    const model = mode === 'chatgpt_4o_mini' ? 'gpt-4o-mini' : 'gpt-4o';
    
    // Végigmegyünk a feliratokon egyesével, szekvenciálisan
    for (let i = startIndex; i < originalSubtitles.length; i++) {
        // Ha a fordítás szüneteltetése be van kapcsolva, akkor kilépünk a ciklusból
        if (isTranslationPausedRef.value) {
            break;
        }
        
        // Aktuális fordítási index frissítése
        let localCurrentIndex = i;
        
        // Ellenőrizzük, hogy már le van-e fordítva ez a felirat
        if (translatedSubtitles[i]) {
            continue; // Átugorjuk a már lefordított feliratokat
        }
        
        // Folyamatjelző frissítése
        updateProgressBar(i, originalSubtitles.length);
        
        try {
            // Kontextus összeállítása (előző és következő mondatok)
            const currentSubtitle = originalSubtitles[i].text;
            
            // Előző 4 mondat összegyűjtése (ha van)
            let previousContext = "";
            for (let j = Math.max(0, i - 4); j < i; j++) {
                if (originalSubtitles[j] && originalSubtitles[j].text) {
                    previousContext += originalSubtitles[j].text + "\n";
                }
            }
            
            // Következő 4 mondat összegyűjtése (ha van)
            let nextContext = "";
            for (let j = i + 1; j < Math.min(originalSubtitles.length, i + 5); j++) {
                if (originalSubtitles[j] && originalSubtitles[j].text) {
                    nextContext += originalSubtitles[j].text + "\n";
                }
            }
            
            // Egyedi azonosító a fordítandó sorhoz
            const uniqueMarker = "###FORDÍTANDÓ_SOR###";
            const endMarker = "###FORDÍTÁS_VÉGE###";
            
            // Teljes kontextus összeállítása
            let contextText = "";
            if (previousContext) {
                contextText += "Előző sorok kontextusként (NEM kell fordítani):\n" + previousContext + "\n";
            }
            contextText += uniqueMarker + "\n" + currentSubtitle + "\n" + endMarker + "\n";
            if (nextContext) {
                contextText += "Következő sorok kontextusként (NEM kell fordítani):\n" + nextContext;
            }
            
            // Fordítási utasítás
            const systemPrompt = `Fordítsd le CSAK a "${uniqueMarker}" és "${endMarker}" közötti szöveget ${getLanguageNameLocal(sourceLanguage)} nyelvről ${getLanguageNameLocal(targetLanguage)} nyelvre. 
A többi szöveg csak kontextus, azt NE fordítsd le. 
A fordításodban KIZÁRÓLAG a lefordított szöveget add vissza, semmilyen jelölést, magyarázatot vagy egyéb szöveget NE adj hozzá.
NE használd a "${uniqueMarker}" vagy "${endMarker}" jelöléseket a válaszodban.`;
            
            // Segédfüggvény a nyelv kódjának névvé alakításához
            function getLanguageNameLocal(languageCode) {
                const languages = {
                    'en': 'angol',
                    'hu': 'magyar',
                    'de': 'német',
                    'fr': 'francia',
                    'es': 'spanyol',
                    'it': 'olasz',
                    'pt': 'portugál',
                    'ru': 'orosz',
                    'ja': 'japán',
                    'zh': 'kínai',
                    'ko': 'koreai',
                    'ar': 'arab',
                    'hi': 'hindi',
                    'tr': 'török',
                    'pl': 'lengyel',
                    'nl': 'holland',
                    'sv': 'svéd',
                    'da': 'dán',
                    'fi': 'finn',
                    'no': 'norvég',
                    'cs': 'cseh',
                    'sk': 'szlovák',
                    'ro': 'román',
                    'bg': 'bolgár',
                    'hr': 'horvát',
                    'sr': 'szerb',
                    'uk': 'ukrán',
                    'el': 'görög',
                    'he': 'héber',
                    'vi': 'vietnámi',
                    'th': 'thai',
                    'id': 'indonéz',
                    'ms': 'maláj',
                    'fa': 'perzsa',
                    'ur': 'urdu'
                };
                
                return languages[languageCode] || languageCode;
            }
            
            // Fordítás végrehajtása
            const translatedText = await translateWithChatGptCustomPrompt(contextText, systemPrompt, apiKey, model, temperature);
            
            // Fordított szöveg mentése
            translatedSubtitles[i] = translatedText.trim();
            
            // Táblázat frissítése
            updateTranslatedText(i, translatedText.trim());
            
            // Fordítási memória frissítése
            if (!translationMemory.translations) {
                translationMemory.translations = {};
            }
            translationMemory.translations[originalSubtitles[i].text] = translatedText.trim();
            
            // Mentés gomb engedélyezése
            saveTranslationBtn.disabled = false;
            
            // Munkafájl mentés gomb megjelenítése
            saveWorkFileBtn.classList.remove('d-none');
            
            // Újrafordítás gomb megjelenítése
            const retranslateBtn = document.getElementById(`retranslate-${i}`);
            if (retranslateBtn) {
                retranslateBtn.classList.remove('d-none');
            }
            
            // Görgetés az aktuális sorhoz
            scrollToRow(i);
            
            // Késleltetés a következő API kérés előtt, hogy elkerüljük a sebességkorlát-túllépést
            if (i < originalSubtitles.length - 1) {
                await new Promise(resolve => setTimeout(resolve, API_DELAY));
            }
            
        } catch (error) {
            console.error('Fordítási hiba:', error);
            
            // Ha sebességkorlát-túllépés (429) hiba, akkor várunk egy ideig és újra próbáljuk
            if (error.message.includes('429')) {
                console.log('Sebességkorlát-túllépés (429), várakozás 10 másodpercet...');
                alert('We wait 10 seconds for the API speed limit to be exceeded and then continue translating.');
                
                // Várakozás 10 másodpercet
                await new Promise(resolve => setTimeout(resolve, 10000));
                
                // Visszalépünk egy indexet, hogy újra megpróbáljuk ezt a feliratot
                i--;
                continue;
            }
            
            alert(`Error during translation: ${error.message}`);
            pauseTranslation();
            break;
        }
    }
    
    // Visszaadjuk az utolsó feldolgozott indexet
    return localCurrentIndex;
}

// Globális névtérben elérhetővé tesszük a függvényt
window.retranslateSubtitle = retranslateSubtitle;
window.translateSequentially = translateSequentially;