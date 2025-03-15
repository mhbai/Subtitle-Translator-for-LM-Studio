// Globális változók
let originalSubtitles = []; // Az eredeti feliratokat tárolja
let translatedSubtitles = []; // A lefordított feliratokat tárolja
let originalSrtContent = ''; // Az eredeti SRT fájl teljes tartalma
let fileName = ''; // A betöltött fájl neve
let translationMemory = {}; // Fordítási memória a konzisztencia érdekében
let isTranslationPaused = false; // Fordítás szüneteltetése
let currentTranslationIndex = 0; // Aktuális fordítási index
let isTranslationRunning = false; // Fordítás folyamatban
let rowsBeingRetranslated = new Set(); // Újrafordítás alatt álló sorok
let temperature = 1.0; // Fordítási szabadságfok alapértéke

// DOM elemek
document.addEventListener('DOMContentLoaded', function() {
    // DOM elemek kiválasztása
    const srtFileInput = document.getElementById('srtFile');
    const startTranslationBtn = document.getElementById('startTranslation');
    const stopTranslationBtn = document.getElementById('stopTranslation');
    const saveTranslationBtn = document.getElementById('saveTranslation');
    const subtitleTable = document.getElementById('subtitleTable');
    const fileInfoDiv = document.getElementById('fileInfo');
    const fileNameSpan = document.getElementById('fileName');
    const lineCountSpan = document.getElementById('lineCount');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');
    const temperatureSlider = document.getElementById('temperatureSlider');
    const temperatureValue = document.getElementById('temperatureValue');

    // Eseménykezelők hozzáadása
    srtFileInput.addEventListener('change', handleFileSelect);
    startTranslationBtn.addEventListener('click', handleTranslationControl);
    stopTranslationBtn.addEventListener('click', pauseTranslation);
    saveTranslationBtn.addEventListener('click', saveTranslation);
    
    // Temperature csúszka eseménykezelő
    temperatureSlider.addEventListener('input', function() {
        temperature = parseFloat(this.value);
        temperatureValue.textContent = temperature.toFixed(1);
        
        // Színátmenet a temperature értékhez
        if (temperature < 0.7) {
            temperatureValue.className = 'badge bg-success'; // Pontos
        } else if (temperature <= 1.3) {
            temperatureValue.className = 'badge bg-primary'; // Kiegyensúlyozott
        } else {
            temperatureValue.className = 'badge bg-warning text-dark'; // Kreatív
        }
    });

    // Fordítás vezérlése (indítás/folytatás)
    function handleTranslationControl() {
        if (startTranslationBtn.textContent.includes('indítása') || 
            startTranslationBtn.textContent.includes('folytatása')) {
            isTranslationPaused = false;
            startTranslation();
        }
    }

    // Fordítás szüneteltetése
    function pauseTranslation() {
        isTranslationPaused = true;
        isTranslationRunning = false;
        startTranslationBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>Fordítás folytatása';
        startTranslationBtn.disabled = false;
        stopTranslationBtn.classList.add('d-none');
    }

    // Fájl kiválasztása eseménykezelő
    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        fileName = file.name;
        
        // Csak .srt fájlokat fogadunk el
        if (!fileName.toLowerCase().endsWith('.srt')) {
            alert('Kérjük, csak .srt kiterjesztésű fájlt töltsön fel!');
            srtFileInput.value = '';
            return;
        }

        // Fájl beolvasása
        const reader = new FileReader();
        reader.onload = function(e) {
            originalSrtContent = e.target.result;
            parseSrtFile(originalSrtContent);
            
            // Fájl információk megjelenítése
            fileNameSpan.textContent = fileName;
            lineCountSpan.textContent = originalSubtitles.length;
            fileInfoDiv.classList.remove('d-none');
            
            // Gombok engedélyezése
            startTranslationBtn.disabled = false;
            
            // Fordítási állapot alaphelyzetbe állítása
            isTranslationPaused = false;
            currentTranslationIndex = 0;
            startTranslationBtn.innerHTML = '<i class="bi bi-translate me-2"></i>Fordítás indítása';
            stopTranslationBtn.classList.add('d-none');
            
            // Táblázat feltöltése
            populateTable();
        };
        reader.readAsText(file);
    }

    // SRT fájl feldolgozása
    function parseSrtFile(content) {
        originalSubtitles = [];
        translatedSubtitles = [];
        
        // Felirat blokkok szétválasztása
        const blocks = content.trim().split(/\r?\n\r?\n/);
        
        for (const block of blocks) {
            const lines = block.split(/\r?\n/);
            
            // Ellenőrizzük, hogy van-e elég sor a blokkban
            if (lines.length < 3) continue;
            
            // Az első sor a sorszám, a második az időkód, a többi a szöveg
            const number = parseInt(lines[0].trim());
            const timecode = lines[1].trim();
            
            // A szöveges részek összegyűjtése (a 3. sortól kezdve)
            const textLines = lines.slice(2).join(' ').trim();
            
            if (textLines) {
                originalSubtitles.push({
                    number: number,
                    timecode: timecode,
                    text: textLines
                });
                
                // Kezdetben üres fordítás
                translatedSubtitles.push({
                    number: number,
                    timecode: timecode,
                    text: ''
                });
            }
        }
    }

    // Táblázat feltöltése
    function populateTable() {
        subtitleTable.innerHTML = '';
        
        originalSubtitles.forEach((subtitle, index) => {
            const row = document.createElement('tr');
            row.id = `row-${index}`;
            
            // Sorszám cella
            const numberCell = document.createElement('td');
            numberCell.textContent = index + 1;
            numberCell.classList.add('text-center');
            row.appendChild(numberCell);
            
            // Eredeti szöveg cella
            const originalCell = document.createElement('td');
            originalCell.textContent = subtitle.text;
            row.appendChild(originalCell);
            
            // Fordított szöveg cella - szerkeszthető
            const translatedCell = document.createElement('td');
            translatedCell.id = `translated-${index}`;
            
            // Szerkeszthető tartalom létrehozása
            // Textarea-t használunk div helyett a jobb kompatibilitás érdekében
            const editableTextarea = document.createElement('textarea');
            editableTextarea.className = 'form-control editable-content';
            editableTextarea.value = translatedSubtitles[index].text || '';
            editableTextarea.dataset.originalIndex = index;
            editableTextarea.rows = 2;
            
            // Eseménykezelő a szerkesztés befejezéséhez
            editableTextarea.addEventListener('change', function() {
                const editedIndex = parseInt(this.dataset.originalIndex);
                const newText = this.value.trim();
                
                // Csak akkor mentjük, ha változott a szöveg
                if (translatedSubtitles[editedIndex].text !== newText) {
                    translatedSubtitles[editedIndex].text = newText;
                    
                    // Frissítjük a fordítási memóriát is
                    if (!translationMemory.translations) {
                        translationMemory.translations = {};
                    }
                    translationMemory.translations[originalSubtitles[editedIndex].text] = newText;
                    
                    // Jelezzük, hogy a szöveg módosítva lett
                    const row = document.getElementById(`row-${editedIndex}`);
                    if (row) {
                        row.classList.add('edited-row');
                        
                        // 1 másodperc után eltávolítjuk a kiemelést
                        setTimeout(() => {
                            row.classList.remove('edited-row');
                        }, 1000);
                    }
                }
            });
            
            // Automatikus méretezés
            editableTextarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
            
            translatedCell.appendChild(editableTextarea);
            row.appendChild(translatedCell);
            
            // Műveletek cella
            const actionsCell = document.createElement('td');
            actionsCell.classList.add('text-center');
            
            // Újrafordítás gomb - kezdetben rejtve
            const retranslateBtn = document.createElement('button');
            retranslateBtn.type = 'button';
            retranslateBtn.className = 'btn btn-sm btn-info d-none';
            retranslateBtn.dataset.bsToggle = 'tooltip';
            retranslateBtn.dataset.bsPlacement = 'left';
            retranslateBtn.dataset.bsTitle = 'Újrafordítás';
            retranslateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
            retranslateBtn.id = `retranslate-${index}`;
            retranslateBtn.addEventListener('click', () => retranslateSubtitle(index));
            actionsCell.appendChild(retranslateBtn);
            
            row.appendChild(actionsCell);
            
            subtitleTable.appendChild(row);
            
            // Textarea magasságának beállítása
            editableTextarea.style.height = 'auto';
            editableTextarea.style.height = (editableTextarea.scrollHeight) + 'px';
        });
        
        // Tooltipek inicializálása
        initTooltips();
    }
    
    // Tooltipek inicializálása
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Egy felirat újrafordítása
    async function retranslateSubtitle(index) {
        if (index < 0 || index >= originalSubtitles.length) return;
        
        // Ellenőrizzük, hogy fut-e a fordítás
        if (isTranslationRunning) {
            // Tooltip módosítása figyelmeztetésre
            const retranslateBtn = document.getElementById(`retranslate-${index}`);
            if (retranslateBtn) {
                // Régi tooltip eltávolítása
                const oldTooltip = bootstrap.Tooltip.getInstance(retranslateBtn);
                if (oldTooltip) {
                    oldTooltip.dispose();
                }
                
                // Új figyelmeztető tooltip létrehozása
                retranslateBtn.dataset.bsTitle = 'Előbb állítsd le a futó fordítást!';
                new bootstrap.Tooltip(retranslateBtn, {
                    template: '<div class="tooltip tooltip-warning" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner bg-warning text-dark"></div></div>'
                }).show();
                
                // Tooltip automatikus elrejtése 3 másodperc után
                setTimeout(() => {
                    const tooltip = bootstrap.Tooltip.getInstance(retranslateBtn);
                    if (tooltip) {
                        tooltip.hide();
                    }
                    
                    // Visszaállítjuk az eredeti tooltip-et
                    setTimeout(() => {
                        if (tooltip) {
                            tooltip.dispose();
                        }
                        retranslateBtn.dataset.bsTitle = 'Újrafordítás';
                        new bootstrap.Tooltip(retranslateBtn);
                    }, 300);
                }, 3000);
            }
            return;
        }
        
        // Ellenőrizzük, hogy ez a sor már újrafordítás alatt áll-e
        if (rowsBeingRetranslated.has(index)) {
            return;
        }
        
        try {
            // Jelöljük, hogy ez a sor újrafordítás alatt áll
            rowsBeingRetranslated.add(index);
            
            // Fordítás előkészítése
            const sourceLanguage = sourceLanguageSelect.value;
            const targetLanguage = targetLanguageSelect.value;
            
            // Gomb állapotának módosítása
            const retranslateBtn = document.getElementById(`retranslate-${index}`);
            if (retranslateBtn) {
                // Régi tooltip eltávolítása
                const oldTooltip = bootstrap.Tooltip.getInstance(retranslateBtn);
                if (oldTooltip) {
                    oldTooltip.dispose();
                }
                
                // Animáció és új tooltip hozzáadása
                retranslateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
                retranslateBtn.classList.add('btn-loading');
                retranslateBtn.dataset.bsTitle = 'Fordítás folyamatban...';
                new bootstrap.Tooltip(retranslateBtn).show();
            }
            
            // Fordítás kérése az LM Studio API-tól
            const translatedText = await translateTextWithContext(
                originalSubtitles,
                index,
                sourceLanguage,
                targetLanguage
            );
            
            // Fordított szöveg mentése
            translatedSubtitles[index].text = translatedText;
            
            // Mentés a fordítási memóriába
            if (!translationMemory.translations) {
                translationMemory.translations = {};
            }
            translationMemory.translations[originalSubtitles[index].text] = translatedText;
            
            // Táblázat frissítése
            const editableTextarea = document.querySelector(`#translated-${index} textarea`);
            if (editableTextarea) {
                editableTextarea.value = translatedText;
                // Textarea magasságának frissítése
                editableTextarea.style.height = 'auto';
                editableTextarea.style.height = (editableTextarea.scrollHeight) + 'px';
            }
            
            // Gomb visszaállítása
            if (retranslateBtn) {
                // Tooltip elrejtése
                const tooltip = bootstrap.Tooltip.getInstance(retranslateBtn);
                if (tooltip) {
                    tooltip.hide();
                    
                    setTimeout(() => {
                        if (tooltip) {
                            tooltip.dispose();
                        }
                        
                        // Animáció eltávolítása és eredeti állapot visszaállítása
                        retranslateBtn.classList.remove('btn-loading');
                        retranslateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
                        retranslateBtn.dataset.bsTitle = 'Újrafordítás';
                        new bootstrap.Tooltip(retranslateBtn);
                    }, 300);
                }
            }
        } catch (error) {
            console.error('Hiba az újrafordítás során:', error);
            alert(`Hiba történt az újrafordítás során: ${error.message}`);
            
            // Gomb visszaállítása hiba esetén
            const retranslateBtn = document.getElementById(`retranslate-${index}`);
            if (retranslateBtn) {
                // Tooltip elrejtése
                const tooltip = bootstrap.Tooltip.getInstance(retranslateBtn);
                if (tooltip) {
                    tooltip.hide();
                    
                    setTimeout(() => {
                        if (tooltip) {
                            tooltip.dispose();
                        }
                        
                        // Animáció eltávolítása és eredeti állapot visszaállítása
                        retranslateBtn.classList.remove('btn-loading');
                        retranslateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
                        retranslateBtn.dataset.bsTitle = 'Újrafordítás';
                        new bootstrap.Tooltip(retranslateBtn);
                    }, 300);
                }
            }
        } finally {
            // Jelöljük, hogy ez a sor már nincs újrafordítás alatt
            rowsBeingRetranslated.delete(index);
        }
    }

    // Fordítás indítása
    async function startTranslation() {
        // Ellenőrizzük, hogy van-e betöltött felirat
        if (originalSubtitles.length === 0) {
            alert('Kérjük, először töltsön be egy feliratfájlt!');
            return;
        }
        
        // Fordítás előkészítése
        const sourceLanguage = sourceLanguageSelect.value;
        const targetLanguage = targetLanguageSelect.value;
        
        // Fordítási memória törlése új fordítás indításakor, ha a nyelvek változtak
        if (translationMemory.sourceLanguage !== sourceLanguage || 
            translationMemory.targetLanguage !== targetLanguage) {
            translationMemory = {
                sourceLanguage: sourceLanguage,
                targetLanguage: targetLanguage,
                translations: {}
            };
        }
        
        // Gombok állapotának beállítása
        startTranslationBtn.disabled = true;
        stopTranslationBtn.classList.remove('d-none');
        saveTranslationBtn.disabled = true;
        
        // Fordítás állapotának beállítása
        isTranslationRunning = true;
        
        // Haladásjelző megjelenítése
        progressContainer.classList.remove('d-none');
        
        // Fordítás végrehajtása soronként
        for (let i = currentTranslationIndex; i < originalSubtitles.length; i++) {
            // Ha a fordítás szüneteltetve van, kilépünk a ciklusból
            if (isTranslationPaused) {
                currentTranslationIndex = i;
                isTranslationRunning = false;
                return;
            }
            
            // Haladásjelző frissítése
            const progress = Math.round((i / originalSubtitles.length) * 100);
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
            
            // Ellenőrizzük, hogy a szöveg már szerepel-e a fordítási memóriában
            const originalText = originalSubtitles[i].text;
            if (translationMemory.translations && translationMemory.translations[originalText]) {
                translatedSubtitles[i].text = translationMemory.translations[originalText];
                
                // Táblázat frissítése
                const editableTextarea = document.querySelector(`#translated-${i} textarea`);
                if (editableTextarea) {
                    editableTextarea.value = translationMemory.translations[originalText];
                }
                
                // Újrafordítás gomb megjelenítése
                const retranslateBtn = document.getElementById(`retranslate-${i}`);
                if (retranslateBtn) {
                    retranslateBtn.classList.remove('d-none');
                }
                
                continue; // Ugrás a következő felirathoz
            }
            
            // Fordítás kérése az LM Studio API-tól
            try {
                const translatedText = await translateTextWithContext(
                    originalSubtitles,
                    i,
                    sourceLanguage,
                    targetLanguage
                );
                
                // Fordított szöveg mentése
                translatedSubtitles[i].text = translatedText;
                
                // Mentés a fordítási memóriába
                if (!translationMemory.translations) {
                    translationMemory.translations = {};
                }
                translationMemory.translations[originalText] = translatedText;
                
                // Táblázat frissítése
                const editableTextarea = document.querySelector(`#translated-${i} textarea`);
                if (editableTextarea) {
                    editableTextarea.value = translatedText;
                }
                
                // Újrafordítás gomb megjelenítése
                const retranslateBtn = document.getElementById(`retranslate-${i}`);
                if (retranslateBtn) {
                    retranslateBtn.classList.remove('d-none');
                }
            } catch (error) {
                console.error('Hiba a fordítás során:', error);
                alert(`Hiba történt a fordítás során: ${error.message}`);
                
                // Fordítás szüneteltetése hiba esetén
                isTranslationPaused = true;
                currentTranslationIndex = i;
                startTranslationBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>Fordítás folytatása';
                startTranslationBtn.disabled = false;
                stopTranslationBtn.classList.add('d-none');
                isTranslationRunning = false;
                return;
            }
        }
        
        // Fordítás befejezése
        currentTranslationIndex = 0;
        
        // Haladásjelző 100%-ra állítása
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', 100);
        
        // Gombok állapotának beállítása
        startTranslationBtn.innerHTML = '<i class="bi bi-translate me-2"></i>Fordítás indítása';
        startTranslationBtn.disabled = false;
        stopTranslationBtn.classList.add('d-none');
        saveTranslationBtn.disabled = false;
        isTranslationRunning = false;
    }

    // Szöveg fordítása kontextussal az LM Studio API-val
    async function translateTextWithContext(subtitles, currentIndex, sourceLanguage, targetLanguage, retryCount = 0) {
        try {
            // Kontextus összeállítása (előző és következő mondatok)
            const currentSubtitle = subtitles[currentIndex].text;
            let context = '';
            
            // Előző mondat hozzáadása a kontextushoz (ha van)
            if (currentIndex > 0) {
                context += `Előző mondat: "${subtitles[currentIndex - 1].text}"\n`;
            }
            
            // Következő mondat hozzáadása a kontextushoz (ha van)
            if (currentIndex < subtitles.length - 1) {
                context += `Következő mondat: "${subtitles[currentIndex + 1].text}"\n`;
            }
            
            // LM Studio API végpont
            const apiUrl = 'http://localhost:1234/v1/completions';
            
            // Fordítási prompt összeállítása kontextussal
            let prompt = `Te egy professzionális fordító vagy, aki ${getLanguageName(sourceLanguage)} nyelvről ${getLanguageName(targetLanguage)} nyelvre fordít egy filmfeliratot. A fordításnak természetesnek és folyékonynak kell lennie, miközben megőrzi az eredeti jelentést és stílust. Ne használj formázást, kódjelölést vagy idézőjeleket a fordításban.\n\n`;
            
            if (context) {
                prompt += `Kontextus a jobb fordításhoz:\n${context}\n`;
            }
            
            prompt += `Fordítandó mondat: "${currentSubtitle}"\n\nFordítás:`;
            
            // Fordítási kérés összeállítása
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 500,
                    temperature: temperature, // A csúszkával beállított érték használata
                    stream: false
                })
            });
            
            if (!response.ok) {
                throw new Error(`API hiba: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Ellenőrizzük, hogy van-e válasz
            if (data.choices && data.choices.length > 0 && data.choices[0].text) {
                // Tisztítjuk a fordítást
                let translatedText = data.choices[0].text.trim();
                
                // Ellenőrizzük, hogy a fordítás tartalmaz-e hibás formázást vagy kódjelölést
                if (translatedText.includes('```') || 
                    translatedText.startsWith('`') || 
                    translatedText.includes('```')) {
                    
                    // Eltávolítjuk a ``` jelöléseket és a köztük lévő nyelvi azonosítót (ha van)
                    translatedText = translatedText.replace(/```[a-z]*\n?/g, '');
                    translatedText = translatedText.replace(/```/g, '');
                    
                    // Eltávolítjuk az egyszeres ` jeleket is
                    translatedText = translatedText.replace(/`/g, '');
                }
                
                // Idézőjelek eltávolítása a fordítás elejéről és végéről, ha vannak
                if ((translatedText.startsWith('"') && translatedText.endsWith('"')) || 
                    (translatedText.startsWith('"') && translatedText.endsWith('"'))) {
                    translatedText = translatedText.substring(1, translatedText.length - 1);
                }
                
                // Ellenőrizzük, hogy a fordítás nem tartalmaz-e hibás vagy értelmetlen szöveget
                // (pl. hibaüzenet, vagy túl rövid a fordítás az eredetihez képest)
                const originalLength = currentSubtitle.length;
                const translatedLength = translatedText.length;
                const isTranslationSuspicious = 
                    translatedText.includes("error") || 
                    translatedText.includes("hiba") || 
                    translatedText.includes("unexpected") ||
                    (translatedLength < originalLength * 0.3 && originalLength > 10) || // Túl rövid fordítás
                    translatedText.includes("API") ||
                    translatedText.includes("endpoint");
                
                // Ha gyanús a fordítás és még nem próbáltuk újra túl sokszor, próbáljuk újra
                if (isTranslationSuspicious && retryCount < 3) {
                    console.warn(`Gyanús fordítás, újrapróbálkozás (${retryCount + 1}/3): "${translatedText}"`);
                    
                    // Várjunk egy kicsit az újrapróbálkozás előtt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Újrapróbálkozás
                    return translateTextWithContext(subtitles, currentIndex, sourceLanguage, targetLanguage, retryCount + 1);
                }
                
                return translatedText;
            } else {
                throw new Error('Nem érkezett fordítási eredmény');
            }
        } catch (error) {
            console.error('Fordítási hiba:', error);
            
            // Újrapróbálkozás hiba esetén, de csak korlátozott számú alkalommal
            if (retryCount < 3) {
                console.warn(`Fordítási hiba, újrapróbálkozás (${retryCount + 1}/3): ${error.message}`);
                
                // Várjunk egy kicsit az újrapróbálkozás előtt
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Újrapróbálkozás
                return translateTextWithContext(subtitles, currentIndex, sourceLanguage, targetLanguage, retryCount + 1);
            }
            
            throw new Error(`Fordítási hiba (${retryCount} próbálkozás után): ${error.message}`);
        }
    }

    // Szöveg fordítása az LM Studio API-val (régi metódus, megtartva kompatibilitás miatt)
    async function translateText(text, sourceLanguage, targetLanguage) {
        return translateTextWithContext(
            [{ text: text }], // Egyetlen felirat
            0, // Az első (és egyetlen) elem indexe
            sourceLanguage,
            targetLanguage
        );
    }

    // Fordítás mentése
    function saveTranslation() {
        // Ellenőrizzük, hogy van-e lefordított felirat
        if (translatedSubtitles.length === 0) {
            alert('Nincs lefordított felirat a mentéshez!');
            return;
        }
        
        // Feliratok összegyűjtése SRT formátumban
        let srtContent = '';
        
        translatedSubtitles.forEach((subtitle, index) => {
            // Ellenőrizzük, hogy a szerkesztett szöveg van-e a DOM-ban
            const editableTextarea = document.querySelector(`#translated-${index} textarea`);
            if (editableTextarea) {
                // Frissítjük a translatedSubtitles tömböt a legfrissebb szerkesztett szöveggel
                translatedSubtitles[index].text = editableTextarea.value.trim();
            }
            
            srtContent += `${index + 1}\n`;
            srtContent += `${subtitle.startTime} --> ${subtitle.endTime}\n`;
            srtContent += `${subtitle.text}\n\n`;
        });
        
        // Fájl létrehozása és letöltése
        const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
        const fileNameWithoutExt = fileName.replace(/\.srt$/, '');
        const targetLanguage = document.getElementById('targetLanguage').value;
        const downloadFileName = `${fileNameWithoutExt}_${targetLanguage}.srt`;
        
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = downloadFileName;
        downloadLink.click();
    }
    
    // Segédfüggvény a nyelv kódjának névvé alakításához
    function getLanguageName(languageCode) {
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
            'pl': 'lengyel'
        };
        
        return languages[languageCode] || languageCode;
    }
});
