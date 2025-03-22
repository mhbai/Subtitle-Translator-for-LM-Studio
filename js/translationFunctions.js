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

// Szekvenciális fordítás az OpenRouter API-val
async function translateSequentiallyWithOpenRouter(startIndex, sourceLanguage, targetLanguage, apiKey, temperature, {
    originalSubtitles,
    translatedSubtitles,
    isTranslationPausedRef,
    currentTranslationIndex,
    updateProgressBar,
    updateTranslatedText,
    translationMemory,
    saveTranslationBtn,
    saveWorkFileBtn,
    scrollToRow,
    pauseTranslation
}) {
    // API kérések közötti késleltetés (ms) - 0.2 másodperc
    const API_DELAY = 200;
    
    // Az utolsó feldolgozott index nyomon követése
    let lastProcessedIndex = startIndex;
    
    // Végigmegyünk a feliratokon egyesével, szekvenciálisan
    for (let i = startIndex; i < originalSubtitles.length; i++) {
        // Ha a fordítás szüneteltetése be van kapcsolva, akkor kilépünk a ciklusból
        if (isTranslationPausedRef.value) {
            break;
        }
        
        // Aktuális fordítási index frissítése
        lastProcessedIndex = i;
        
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
            
            // Fordítás végrehajtása az OpenRouter API-val
            let translatedText;
            try {
                translatedText = await translateWithOpenRouterApi(
                    contextText,
                    systemPrompt,
                    apiKey,
                    temperature
                );
            } catch (error) {
                console.error('OpenRouter API hiba:', error);
                // Részletes hibaüzenet megjelenítése
                alert(`OpenRouter API hiba: ${error.message}`);
                pauseTranslation();
                break;
            }
            
            // Fordítás tisztítása
            translatedText = cleanTranslation(translatedText, uniqueMarker, endMarker);
            
            // Fordított szöveg mentése
            translatedSubtitles[i] = translatedText;
            
            // Táblázat frissítése
            updateTranslatedText(i, translatedText);
            
            // Újrafordítás gomb megjelenítése
            const retranslateBtn = document.getElementById(`retranslate-${i}`);
            if (retranslateBtn) {
                retranslateBtn.classList.remove('d-none');
            }
            
            // Görgetés az aktuális sorhoz
            scrollToRow(i);
            
            // Fordítási memória frissítése
            if (!translationMemory.translations) {
                translationMemory.translations = {};
            }
            translationMemory.translations[originalSubtitles[i].text] = translatedText;
            
            // Mentés gomb engedélyezése
            saveTranslationBtn.disabled = false;
            
            // Munkafájl mentés gomb megjelenítése
            saveWorkFileBtn.classList.remove('d-none');
            
            // Kis szünet a következő API kérés előtt a sebességkorlát elkerülése érdekében
            await new Promise(resolve => setTimeout(resolve, API_DELAY));
            
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
            
            alert(`An error occurred during translation: ${error.message}`);
            pauseTranslation();
            break;
        }
    }
    
    // Visszaadjuk az utolsó feldolgozott indexet
    return lastProcessedIndex;
}

// Fordítás az OpenRouter API-val
async function translateWithOpenRouterApi(text, systemPrompt, apiKey, temperature = 1.0, retryCount = 0) {
    // Maximum újrapróbálkozások száma
    const MAX_RETRIES = 3;
    // Várakozási idő milliszekundumban (exponenciálisan növekszik)
    const RETRY_DELAY = 2000 * Math.pow(2, retryCount);
    
    console.log('OpenRouter fordítás:', text.substring(0, 100) + '...', 'API kulcs:', apiKey ? 'Megadva' : 'Hiányzik');
    
    try {
        // OpenRouter API hívás
        const requestBody = {
            model: 'google/gemma-3-27b-it:free',  // Gemma 3 27B modell - ingyenes verzió
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: temperature
        };
        
        console.log('API kérés:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'SRT Subtitle Translator'
            },
            body: JSON.stringify(requestBody)
        });
        
        // Ha 429-es hiba (túl sok kérés), akkor újrapróbálkozunk
        if (response.status === 429 && retryCount < MAX_RETRIES) {
            console.log(`429 hiba, újrapróbálkozás ${retryCount + 1}/${MAX_RETRIES} (várakozás: ${RETRY_DELAY}ms)...`);
            // Várakozás növekvő idővel
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            // Újrapróbálkozás
            return translateWithOpenRouterApi(text, systemPrompt, apiKey, temperature, retryCount + 1);
        }
        
        // Válasz szöveg ellenőrzése
        const responseText = await response.text();
        console.log('API válasz szöveg:', responseText);
        
        // Ha a válasz nem JSON formátumú, akkor hibát dobunk
        if (!response.ok) {
            throw new Error(`API hiba: ${response.status} ${response.statusText} - ${responseText}`);
        }
        
        // Válasz JSON-ná alakítása
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Érvénytelen JSON válasz: ${responseText}`);
        }
        
        console.log('API válasz:', data); // Teljes válasz naplózása hibakereséshez
        
        // Ellenőrizzük, hogy a válasz tartalmazza-e a szükséges mezőket
        if (!data) {
            throw new Error('Érvénytelen API válasz: null vagy undefined');
        }
        
        // Ha van hibaüzenet a válaszban, azt is megjelenítjük
        if (data.error) {
            throw new Error(`API hiba: ${data.error.message || JSON.stringify(data.error)}`);
        }
        
        // Próbáljuk meg kinyerni a fordított szöveget a válaszból
        let translatedText = null;
        
        // 1. Ellenőrizzük a choices[0].message.content útvonalat (standard OpenAI formátum)
        if (data.choices && 
            Array.isArray(data.choices) && 
            data.choices.length > 0 && 
            data.choices[0].message && 
            data.choices[0].message.content) {
            translatedText = data.choices[0].message.content.trim();
        }
        // 2. Ellenőrizzük a choices[0].text útvonalat (alternatív formátum)
        else if (data.choices && 
                Array.isArray(data.choices) && 
                data.choices.length > 0 && 
                data.choices[0].text) {
            translatedText = data.choices[0].text.trim();
        }
        // 3. Ellenőrizzük a choices[0].content útvonalat (alternatív formátum)
        else if (data.choices && 
                Array.isArray(data.choices) && 
                data.choices.length > 0 && 
                data.choices[0].content) {
            translatedText = data.choices[0].content.trim();
        }
        // 4. Ellenőrizzük a text útvonalat (egyszerű válasz)
        else if (data.text) {
            translatedText = data.text.trim();
        }
        // 5. Ellenőrizzük a content útvonalat (egyszerű válasz)
        else if (data.content) {
            translatedText = data.content.trim();
        }
        // 6. Ellenőrizzük a message.content útvonalat (egyszerű válasz)
        else if (data.message && data.message.content) {
            translatedText = data.message.content.trim();
        }
        // 7. Ellenőrizzük a completion útvonalat (régebbi API-k)
        else if (data.completion) {
            translatedText = data.completion.trim();
        }
        // 8. Ellenőrizzük a generated_text útvonalat (néhány API)
        else if (data.generated_text) {
            translatedText = data.generated_text.trim();
        }
        // 9. Utolsó lehetőség: a teljes válasz szövegként
        else {
            console.warn('Nem találtunk ismert mezőt a válaszban, a teljes választ használjuk szövegként.');
            translatedText = JSON.stringify(data);
        }
        
        if (!translatedText) {
            throw new Error('Nem sikerült kinyerni a fordított szöveget a válaszból: ' + JSON.stringify(data));
        }
        
        console.log('Fordítás eredménye:', translatedText);
        
        return translatedText;
    } catch (error) {
        console.error('Fordítási hiba:', error);
        
        // Ha hálózati hiba vagy egyéb ideiglenes probléma, újrapróbálkozunk
        if ((error.message.includes('fetch') || error.message.includes('network') || error.message.includes('timeout')) && retryCount < MAX_RETRIES) {
            console.log(`Hálózati hiba, újrapróbálkozás ${retryCount + 1}/${MAX_RETRIES} (várakozás: ${RETRY_DELAY}ms)...`);
            // Várakozás növekvő idővel
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            // Újrapróbálkozás
            return translateWithOpenRouterApi(text, systemPrompt, apiKey, temperature, retryCount + 1);
        }
        
        throw error;
    }
}

// Segédfüggvény a fordítás tisztításához
function cleanTranslation(translatedText, uniqueMarker, endMarker) {
    // Ellenőrizzük, hogy a fordított szöveg nem üres-e
    if (!translatedText) {
        console.warn('A fordított szöveg üres vagy null.');
        return '';
    }
    
    console.log('Tisztítás előtti fordítás:', translatedText);
    
    // Próbáljuk kinyerni a fordítást a markerek közül
    const markerStartIndex = translatedText.indexOf(uniqueMarker);
    const markerEndIndex = translatedText.indexOf(endMarker);
    
    if (markerStartIndex !== -1 && markerEndIndex !== -1 && markerEndIndex > markerStartIndex) {
        // Ha megtaláltuk mindkét markert, akkor kivonjuk a köztük lévő szöveget
        translatedText = translatedText.substring(
            markerStartIndex + uniqueMarker.length,
            markerEndIndex
        ).trim();
    } else {
        // Ha nem találtuk meg a markereket, ellenőrizzük, hogy van-e benne idézőjel
        const quoteMatch = translatedText.match(/"([^"]+)"/);
        if (quoteMatch && quoteMatch[1]) {
            translatedText = quoteMatch[1].trim();
        }
    }
    
    // Eltávolítjuk a markereket, ha még mindig benne vannak
    translatedText = translatedText.replace(uniqueMarker, '').replace(endMarker, '').trim();
    
    // Eltávolítjuk a felesleges sorokat és whitespace-eket
    translatedText = translatedText.replace(/^\s*[\r\n]/gm, '').trim();
    
    // Ellenőrizzük, hogy a modell nem adott-e vissza valami extra szöveget
    // Például: "A fordítás: [szöveg]" vagy "Fordítás: [szöveg]"
    const prefixMatch = translatedText.match(/^(?:A\s+)?(?:fordítás|fordítása|lefordítva|válasz)(?:\s+ez)?[:\s]+(.+)/i);
    if (prefixMatch && prefixMatch[1]) {
        translatedText = prefixMatch[1].trim();
    }
    
    console.log('Tisztítás utáni fordítás:', translatedText);
    
    return translatedText;
}

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
        'nl': 'holland',
        'pl': 'lengyel',
        'ru': 'orosz',
        'ja': 'japán',
        'zh': 'kínai',
        'ko': 'koreai',
        'ar': 'arab',
        'hi': 'hindi',
        'tr': 'török',
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
        'sl': 'szlovén',
        'uk': 'ukrán',
        'el': 'görög',
        'he': 'héber',
        'th': 'thai',
        'vi': 'vietnámi',
        'id': 'indonéz',
        'ms': 'maláj',
        'fa': 'perzsa',
        'ur': 'urdu',
        'bn': 'bengáli'
    };
    
    return languages[languageCode] || languageCode;
}

// Globális névtérben elérhetővé tesszük a függvényeket
window.retranslateSubtitle = retranslateSubtitle;
window.translateSequentially = translateSequentially;
window.translateSequentiallyWithOpenRouter = translateSequentiallyWithOpenRouter;
window.translateWithOpenRouterApi = translateWithOpenRouterApi;