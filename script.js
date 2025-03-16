// Globális változók
let originalSubtitles = []; // Az eredeti feliratokat tárolja
let translatedSubtitles = []; // A lefordított feliratokat tárolja
let originalSrtContent = ''; // Az eredeti SRT fájl teljes tartalma
let fileName = ''; // A betöltött fájl neve
let originalFilePath = ''; // Az eredeti fájl elérési útja
let translationMemory = {}; // Fordítási memória a konzisztencia érdekében
let isTranslationPaused = false; // Fordítás szüneteltetése
let currentTranslationIndex = 0; // Aktuális fordítási index
let isTranslationRunning = false; // Fordítás folyamatban
let rowsBeingRetranslated = new Set(); // Újrafordítás alatt álló sorok
let temperature = 1.0; // Fordítási szabadságfok alapértéke
let currentLangCode = 'en'; // Aktuális nyelv alapértéke

// Globális DOM elem változók
let srtFileInput;
let startTranslationBtn;
let stopTranslationBtn;
let resetTranslationBtn;
let saveTranslationBtn;
let saveWorkFileBtn;
let subtitleTable;
let fileInfoDiv;
let fileNameSpan;
let lineCountSpan;
let sourceLanguageSelect;
let targetLanguageSelect;
let progressContainer;
let progressBar;
let temperatureSlider;
let temperatureValue;
let languageSelector;
let uiLanguageMenu;
let originalHeader;
let translatedHeader;
let actionsHeader;

// DOM elemek
document.addEventListener('DOMContentLoaded', function() {
    // DOM elemek kiválasztása és globális változókhoz rendelése
    srtFileInput = document.getElementById('srtFile');
    startTranslationBtn = document.getElementById('startTranslation');
    stopTranslationBtn = document.getElementById('stopTranslation');
    resetTranslationBtn = document.getElementById('resetTranslation');
    saveTranslationBtn = document.getElementById('saveTranslation');
    saveWorkFileBtn = document.getElementById('saveWorkFile');
    subtitleTable = document.getElementById('subtitleTable');
    fileInfoDiv = document.getElementById('fileInfo');
    fileNameSpan = document.getElementById('fileName');
    lineCountSpan = document.getElementById('lineCount');
    sourceLanguageSelect = document.getElementById('sourceLanguage');
    targetLanguageSelect = document.getElementById('targetLanguage');
    progressContainer = document.getElementById('progressContainer');
    progressBar = document.getElementById('progressBar');
    temperatureSlider = document.getElementById('temperatureSlider');
    temperatureValue = document.getElementById('temperatureValue');
    languageSelector = document.getElementById('languageSelector');
    uiLanguageMenu = document.getElementById('uiLanguageMenu');
    originalHeader = document.getElementById('originalHeader');
    translatedHeader = document.getElementById('translatedHeader');
    actionsHeader = document.getElementById('actionsHeader');

    // Nyelvválasztó inicializálása
    initLanguageSelector();
    
    // Eseménykezelők hozzáadása
    srtFileInput.addEventListener('change', handleFileSelect);
    startTranslationBtn.addEventListener('click', handleTranslationControl);
    stopTranslationBtn.addEventListener('click', pauseTranslation);
    resetTranslationBtn.addEventListener('click', resetTranslation);
    saveTranslationBtn.addEventListener('click', saveTranslation);
    saveWorkFileBtn.addEventListener('click', saveWorkFile);
    
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
        startTranslationBtn.classList.remove('d-none');
        stopTranslationBtn.classList.add('d-none');
        
        // 10 másodperc után jelenítjük meg a Reset gombot
        setTimeout(() => {
            resetTranslationBtn.classList.remove('d-none');
        }, 10000);
    }
    
    // Fordítás alaphelyzetbe állítása
    function resetTranslation() {
        // Fordítás leállítása, ha fut
        isTranslationPaused = true;
        isTranslationRunning = false;
        
        // Alapállapotba állítás
        resetAllTranslations();
        
        // UI elemek frissítése
        stopTranslationBtn.classList.add('d-none');
        resetTranslationBtn.classList.add('d-none');
        startTranslationBtn.classList.remove('d-none');
        startTranslationBtn.innerHTML = '<i class="bi bi-translate me-2"></i>Fordítás indítása';
        progressContainer.classList.add('d-none');
        saveTranslationBtn.disabled = true;
        saveWorkFileBtn.classList.add('d-none');
        
        // Táblázat újratöltése csak az eredeti feliratokkal
        populateTable();
    }
    
    // Minden fordítás és beállítás alaphelyzetbe állítása
    function resetAllTranslations() {
        // Csak a fordításokat töröljük, az eredeti feliratokat megtartjuk
        translatedSubtitles = [];
        
        // Ha vannak eredeti feliratok, akkor létrehozzuk az üres fordításokat
        if (originalSubtitles.length > 0) {
            for (let i = 0; i < originalSubtitles.length; i++) {
                translatedSubtitles.push('');
            }
        }
        
        // Fordítási állapot alaphelyzetbe állítása
        currentTranslationIndex = 0;
        isTranslationRunning = false;
        isTranslationPaused = false;
        rowsBeingRetranslated.clear();
        
        // Fordítási memória törlése
        translationMemory = {};
        
        // Hőmérséklet visszaállítása alapértékre
        temperature = 1.0;
        temperatureSlider.value = 1.0;
        temperatureValue.textContent = "1.0";
        temperatureValue.className = 'badge bg-primary';
    }

    // Fájl kiválasztása eseménykezelő
    function handleFileSelect(event) {
        // Ellenőrizzük, hogy fut-e a fordítás
        if (isTranslationRunning) {
            // Töröljük a kiválasztást
            event.target.value = '';
            
            // Figyelmeztetés megjelenítése
            alert('Kérjük, először állítsa le a fordítást, mielőtt új fájlt töltene be!');
            return;
        }
        
        const file = event.target.files[0];
        if (!file) return;
        
        fileName = file.name;
        originalFilePath = file.path; // Elmentjük az elérési utat
        
        // Ellenőrizzük a fájl kiterjesztését
        if (fileName.toLowerCase().endsWith('.srt')) {
            // SRT fájl feldolgozása
            processSrtFile(file);
        } else if (fileName.toLowerCase().endsWith('.wrk')) {
            // Munkafájl feldolgozása
            processWorkFile(file);
        } else if (fileName.toLowerCase().endsWith('.mmm')) {
            // MMM fájl feldolgozása
            processMmmFile(file);
        } else {
            alert('Csak .srt, .wrk vagy .mmm kiterjesztésű fájlokat lehet betölteni!');
            event.target.value = '';
            return;
        }
    }

    // SRT fájl feldolgozása
    function processSrtFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Fájl tartalmának beolvasása
            const content = e.target.result;
            originalSrtContent = content;
            
            // Fájl információk megjelenítése
            fileInfoDiv.classList.remove('d-none');
            fileNameSpan.textContent = fileName;
            
            // Feliratok feldolgozása
            parseSrtFile(content);
            
            // Táblázat feltöltése
            populateTable();
            
            // Fordítás gomb engedélyezése
            startTranslationBtn.disabled = false;
            saveTranslationBtn.disabled = true;
            saveWorkFileBtn.classList.add('d-none');
            
            // Fordítási állapot alaphelyzetbe állítása
            isTranslationPaused = false;
            currentTranslationIndex = 0;
            startTranslationBtn.innerHTML = '<i class="bi bi-translate me-2"></i>Fordítás indítása';
            stopTranslationBtn.classList.add('d-none');
            
            // Sor számok frissítése
            lineCountSpan.textContent = originalSubtitles.length;
        };
        
        reader.readAsText(file);
    }
    
    // Munkafájl feldolgozása
    function processWorkFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Munkafájl tartalmának beolvasása és feldolgozása
                const workData = JSON.parse(e.target.result);
                
                // Adatok betöltése a munkafájlból
                originalSubtitles = workData.subtitles || [];
                translatedSubtitles = workData.translatedSubtitles || [];
                currentTranslationIndex = workData.currentIndex || 0;
                fileName = workData.originalFileName || file.name.replace('.wrk', '.srt');
                
                // Nyelvek beállítása
                if (workData.sourceLanguage) {
                    sourceLanguageSelect.value = workData.sourceLanguage;
                }
                if (workData.targetLanguage) {
                    targetLanguageSelect.value = workData.targetLanguage;
                }
                
                // Fájl információk megjelenítése
                fileInfoDiv.classList.remove('d-none');
                fileNameSpan.textContent = fileName;
                lineCountSpan.textContent = originalSubtitles.length;
                
                // Táblázat feltöltése
                populateTable();
                
                // Újrafordítás gombok megjelenítése a már lefordított sorokhoz
                translatedSubtitles.forEach((subtitle, index) => {
                    if (subtitle) {
                        const retranslateBtn = document.getElementById(`retranslate-${index}`);
                        if (retranslateBtn) {
                            retranslateBtn.classList.remove('d-none');
                        }
                    }
                });
                
                // Folyamatjelző frissítése
                updateProgressBar(currentTranslationIndex, originalSubtitles.length);
                
                // UI frissítése
                startTranslationBtn.disabled = false;
                startTranslationBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>Fordítás folytatása';
                
                if (translatedSubtitles.length > 0) {
                    saveTranslationBtn.disabled = false;
                    saveWorkFileBtn.classList.remove('d-none');
                }
                
                alert('Munkafájl sikeresen betöltve! A fordítás folytatható.');
            } catch (error) {
                console.error('Hiba a munkafájl betöltése során:', error);
                alert('Hiba történt a munkafájl betöltése során. Ellenőrizze a fájl formátumát!');
                event.target.value = '';
            }
        };
        
        reader.readAsText(file);
    }

    // MMM fájl feldolgozása
    function processMmmFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Fájl tartalmának beolvasása
            const content = e.target.result;
            
            // Fájl információk megjelenítése
            fileInfoDiv.classList.remove('d-none');
            fileNameSpan.textContent = fileName;
            
            // Ellenőrizzük, hogy van-e már betöltött felirat
            if (originalSubtitles.length === 0) {
                alert('Először töltsön be egy .srt fájlt, mielőtt .mmm fájlt töltene be!');
                return;
            }
            
            // MMM fájl feldolgozása - csak a fordított szövegek frissítése
            parseMmmFile(content);
            
            // Táblázat frissítése
            populateTable();
            
            // Fordítás gomb engedélyezése
            startTranslationBtn.disabled = false;
            saveTranslationBtn.disabled = false;
            saveWorkFileBtn.classList.remove('d-none');
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
                translatedSubtitles.push('');
            }
        }
    }

    // MMM fájl tartalmának feldolgozása
    function parseMmmFile(content) {
        // Sorok szétválasztása
        const lines = content.split('\n');
        
        let currentText = '';
        let currentLineNumber = -1;
        
        // Sorok feldolgozása
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Üres sorok kihagyása
            if (line === '') continue;
            
            // Ellenőrizzük, hogy a sor egy sorszámmal kezdődik-e
            const match = line.match(/^(\d+)\s+(.*)/);
            
            if (match) {
                // Sorszám és szöveg kinyerése
                const subtitleNumber = parseInt(match[1]);
                const text = match[2];
                
                // Ha új sorszám, akkor az előző szöveget elmentjük
                if (currentLineNumber !== -1 && currentLineNumber !== subtitleNumber) {
                    // Az előző szöveg mentése a megfelelő sorszámú felirathoz
                    if (currentLineNumber > 0 && currentLineNumber <= originalSubtitles.length) {
                        translatedSubtitles[currentLineNumber - 1] = currentText;
                    }
                    currentText = '';
                }
                
                // Aktuális sorszám és szöveg beállítása
                currentLineNumber = subtitleNumber;
                
                // Ha első sor az adott sorszámnál, akkor beállítjuk a szöveget
                if (currentText === '') {
                    currentText = text;
                } else {
                    // Ha már van szöveg, akkor hozzáfűzzük
                    currentText += ' ' + text;
                }
            }
        }
        
        // Az utolsó szöveg mentése, ha van
        if (currentLineNumber !== -1 && currentText !== '') {
            if (currentLineNumber > 0 && currentLineNumber <= originalSubtitles.length) {
                translatedSubtitles[currentLineNumber - 1] = currentText;
            }
        }
        
        // Ellenőrizzük, hogy volt-e érvényes szöveg
        let foundValidText = false;
        for (let i = 0; i < translatedSubtitles.length; i++) {
            if (translatedSubtitles[i] && translatedSubtitles[i].trim && translatedSubtitles[i].trim() !== '') {
                foundValidText = true;
                break;
            }
        }
        
        if (!foundValidText) {
            alert('A fájl nem tartalmaz érvényes szövegeket vagy a sorszámok nem egyeznek a betöltött feliratokkal!');
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
            editableTextarea.value = translatedSubtitles[index] || '';
            editableTextarea.dataset.originalIndex = index;
            editableTextarea.rows = 2;
            
            // Eseménykezelő a szerkesztés befejezéséhez
            editableTextarea.addEventListener('change', function() {
                const editedIndex = parseInt(this.dataset.originalIndex);
                const newText = this.value.trim();
                
                // Csak akkor mentjük, ha változott a szöveg
                if (translatedSubtitles[editedIndex] !== newText) {
                    translatedSubtitles[editedIndex] = newText;
                    
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
                    
                    // Újrafordítás gomb megjelenítése, ha van szöveg
                    const retranslateBtn = document.getElementById(`retranslate-${editedIndex}`);
                    if (retranslateBtn) {
                        if (newText) {
                            retranslateBtn.classList.remove('d-none');
                        } else {
                            retranslateBtn.classList.add('d-none');
                        }
                    }
                    
                    // Mentés gomb engedélyezése
                    saveTranslationBtn.disabled = false;
                    
                    // Munkafájl mentés gomb megjelenítése
                    saveWorkFileBtn.classList.remove('d-none');
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
            
            // Újrafordítás gomb - kezdetben rejtve, de megjelenik, ha van fordított szöveg
            const retranslateBtn = document.createElement('button');
            retranslateBtn.type = 'button';
            retranslateBtn.className = 'btn btn-sm btn-info retranslate-btn';
            retranslateBtn.dataset.bsToggle = 'tooltip';
            retranslateBtn.dataset.bsPlacement = 'left';
            retranslateBtn.dataset.bsTitle = 'Újrafordítás';
            
            // A gomb tartalma: ikon + szöveg (a szöveg a nyelvváltáskor frissül)
            const currentLang = currentLangCode;
            const retranslateText = uiTranslations[currentLang]?.retranslate || 'Újrafordítás';
            retranslateBtn.innerHTML = `<i class="bi bi-arrow-repeat me-1"></i>${retranslateText}`;
            
            retranslateBtn.id = `retranslate-${index}`;
            retranslateBtn.addEventListener('click', () => retranslateSubtitle(index));
            
            // Ha nincs fordított szöveg, elrejtjük a gombot
            if (!translatedSubtitles[index]) {
                retranslateBtn.classList.add('d-none');
            }
            
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
        
        try {
            // Fordítás végrehajtása
            const translatedText = await translateTextWithContext(
                originalSubtitles,
                index,
                sourceLanguage,
                targetLanguage,
                0,
                temperature
            );
            
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
            alert(`Hiba történt az újrafordítás során: ${error.message}`);
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

    // Fordítás indítása
    async function startTranslation() {
        // UI elemek frissítése
        startTranslationBtn.classList.add('d-none');
        stopTranslationBtn.classList.remove('d-none');
        resetTranslationBtn.classList.add('d-none');
        progressContainer.classList.remove('d-none');
        
        // Fordítás állapotának beállítása
        isTranslationRunning = true;
        isTranslationPaused = false;
        
        // Nyelvi beállítások
        const sourceLanguage = sourceLanguageSelect.value;
        const targetLanguage = targetLanguageSelect.value;
        
        // Hőmérséklet beállítás
        const temperature = parseFloat(temperatureSlider.value);
        
        // Ha még nincs lefordított felirat, akkor inicializáljuk
        if (translatedSubtitles.length === 0) {
            // Inicializáljuk a lefordított feliratokat
            translatedSubtitles = originalSubtitles.map(subtitle => '');
        }
        
        // Folytatjuk a fordítást az aktuális indextől
        for (let i = currentTranslationIndex; i < originalSubtitles.length; i++) {
            // Ha a fordítás szüneteltetése be van kapcsolva, akkor kilépünk a ciklusból
            if (isTranslationPaused) {
                break;
            }
            
            currentTranslationIndex = i;
            
            // Ellenőrizzük, hogy már le van-e fordítva ez a felirat
            if (translatedSubtitles[i]) {
                continue; // Átugorjuk a már lefordított feliratokat
            }
            
            // Folyamatjelző frissítése
            updateProgressBar(i, originalSubtitles.length);
            
            try {
                // Fordítás végrehajtása
                const translatedText = await translateTextWithContext(originalSubtitles, i, sourceLanguage, targetLanguage, 0, temperature);
                
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
                
                // Mentés gomb engedélyezése
                saveTranslationBtn.disabled = false;
                
                // Munkafájl mentés gomb megjelenítése
                saveWorkFileBtn.classList.remove('d-none');
                
            } catch (error) {
                console.error('Fordítási hiba:', error);
                alert(`Hiba történt a fordítás során: ${error.message}`);
                pauseTranslation();
                break;
            }
        }
        
        // Ha végigértünk a feliratokon
        if (currentTranslationIndex >= originalSubtitles.length - 1 && !isTranslationPaused) {
            // Fordítás befejezése
            finishTranslation();
        }
    }

    // Szöveg fordítása kontextussal az LM Studio API-val
    async function translateTextWithContext(subtitles, currentIndex, sourceLanguage, targetLanguage, retryCount = 0) {
        try {
            // Kontextus összeállítása (előző és következő mondatok)
            const currentSubtitle = subtitles[currentIndex].text;
            let context = '';
            
            // Előző mondatok hozzáadása a kontextushoz (max 4)
            for (let i = 1; i <= 4; i++) {
                if (currentIndex - i >= 0) {
                    context += `Előző mondat ${i}: "${subtitles[currentIndex - i].text}"\n`;
                }
            }
            
            // Következő mondatok hozzáadása a kontextushoz (max 4)
            for (let i = 1; i <= 4; i++) {
                if (currentIndex + i < subtitles.length) {
                    context += `Következő mondat ${i}: "${subtitles[currentIndex + i].text}"\n`;
                }
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

    // Fordított szöveg frissítése a táblázatban
    function updateTranslatedText(index, text) {
        const editableTextarea = document.querySelector(`#translated-${index} textarea`);
        if (editableTextarea) {
            editableTextarea.value = text;
        }
    }
    
    // Görgetés a megadott sorhoz
    function scrollToRow(index) {
        const row = document.getElementById(`row-${index}`);
        if (row) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Folyamatjelző frissítése
    function updateProgressBar(currentIndex, totalCount) {
        const progress = Math.round((currentIndex / totalCount) * 100);
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    // Fordítás befejezése
    function finishTranslation() {
        // Haladásjelző 100%-ra állítása
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', 100);
        
        // Gombok állapotának beállítása
        startTranslationBtn.innerHTML = '<i class="bi bi-translate me-2"></i>Fordítás indítása';
        startTranslationBtn.disabled = false;
        startTranslationBtn.classList.remove('d-none');
        stopTranslationBtn.classList.add('d-none');
        saveTranslationBtn.disabled = false;
        saveWorkFileBtn.classList.remove('d-none');
        isTranslationRunning = false;
        
        // Értesítés a fordítás befejezéséről
        alert('A fordítás sikeresen befejeződött!');
    }

    // Fordítás mentése
    function saveTranslation() {
        // Ellenőrizzük, hogy van-e fordítás
        if (translatedSubtitles.length === 0) {
            alert('Nincs mit menteni! Kérjük, először fordítsa le a feliratokat.');
            return;
        }
        
        // SRT formátumú tartalom létrehozása
        let srtContent = '';
        
        // Fordított feliratok összegyűjtése
        originalSubtitles.forEach((subtitle, index) => {
            // Ha a felhasználó éppen szerkeszt egy sort, akkor frissítjük a fordítást
            const editableTextarea = document.querySelector(`#translated-${index} textarea`);
            if (editableTextarea) {
                // Frissítjük a translatedSubtitles tömböt a legfrissebb szerkesztett szöveggel
                translatedSubtitles[index] = editableTextarea.value.trim();
            }
            
            srtContent += `${subtitle.number}\n`;
            srtContent += `${subtitle.timecode}\n`;
            srtContent += `${translatedSubtitles[index] || ''}\n\n`;
        });
        
        // Fájl létrehozása és letöltése
        const targetLangCode = targetLanguageSelect.value;
        const newFileName = fileName.replace('.srt', `-${targetLangCode}.srt`);
        
        // Blob létrehozása és letöltés
        const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, newFileName);
    }

    // Munkafájl mentése
    function saveWorkFile() {
        // Ellenőrizzük, hogy van-e betöltött felirat
        if (originalSubtitles.length === 0) {
            alert('Nincs betöltött felirat a mentéshez!');
            return;
        }
        
        // Frissítjük a fordításokat a szerkesztett mezőkből
        translatedSubtitles.forEach((subtitle, index) => {
            const editableTextarea = document.querySelector(`#translated-${index} textarea`);
            if (editableTextarea) {
                translatedSubtitles[index] = editableTextarea.value.trim();
            }
        });
        
        // Munkafájl adatok összeállítása
        const workData = {
            originalFileName: fileName,
            subtitles: originalSubtitles,
            translatedSubtitles: translatedSubtitles,
            currentIndex: currentTranslationIndex,
            sourceLanguage: sourceLanguageSelect.value,
            targetLanguage: targetLanguageSelect.value,
            temperature: temperatureSlider.value
        };
        
        // JSON formátumú tartalom létrehozása
        const jsonContent = JSON.stringify(workData, null, 2);
        
        // Fájl létrehozása és letöltése
        const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        const downloadFileName = `${fileNameWithoutExt}.wrk`;
        
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
        saveAs(blob, downloadFileName);
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

    // Nyelvválasztó inicializálása
    function initLanguageSelector() {
        console.log("Nyelvválasztó inicializálása");
        
        // Nyelvválasztó eseménykezelők
        document.querySelectorAll('#uiLanguageMenu a').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                changeUiLanguage(lang);
            });
        });

        // Mentett nyelv betöltése
        const savedLanguage = localStorage.getItem('uiLanguage');
        if (savedLanguage && uiTranslations[savedLanguage]) {
            console.log("Mentett nyelv betöltése: " + savedLanguage);
            currentLangCode = savedLanguage; // Globális változó frissítése
            changeUiLanguage(savedLanguage);
        } else {
            // Alapértelmezett angol nyelv
            console.log("Alapértelmezett angol nyelv beállítása");
            currentLangCode = 'en'; // Globális változó frissítése
            changeUiLanguage('en');
        }
    }

    // Felhasználói felület nyelvének megváltoztatása
    function changeUiLanguage(lang) {
        // Aktuális nyelv mentése
        localStorage.setItem('uiLanguage', lang);
        // Globális változó frissítése
        currentLangCode = lang;

        // Nyelvválasztó gomb szövegének frissítése
        const languageNames = {
            'en': 'English',
            'hu': 'Magyar',
            'de': 'Deutsch',
            'es': 'Español',
            'fr': 'Français',
            'it': 'Italiano',
            'pt': 'Português',
            'nl': 'Nederlands',
            'pl': 'Polski',
            'ru': 'Русский',
            'ja': '日本語',
            'zh': '中文',
            'ar': 'العربية',
            'hi': 'हिन्दी',
            'ko': '한국어',
            'tr': 'Türkçe',
            'sv': 'Svenska',
            'da': 'Dansk',
            'fi': 'Suomi',
            'no': 'Norsk',
            'cs': 'Čeština',
            'sk': 'Slovenčina',
            'ro': 'Română',
            'bg': 'Български',
            'el': 'Ελληνικά',
            'uk': 'Українська',
            'he': 'עברית',
            'th': 'ไทย',
            'vi': 'Tiếng Việt',
            'id': 'Bahasa Indonesia'
        };
        
        document.getElementById('currentUiLanguage').textContent = languageNames[lang] || 'English';
        
        // Aktív elem beállítása a menüben
        document.querySelectorAll('#uiLanguageMenu a').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeMenuItem = document.querySelector(`#uiLanguageMenu a[data-lang="${lang}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        // Translations.js fájlból betöltjük a fordításokat
        if (typeof uiTranslations !== 'undefined' && uiTranslations[lang]) {
            console.log("Nyelv váltás: " + lang);
            console.log(uiTranslations[lang]);
            updateUiTexts(uiTranslations[lang]);
        } else {
            console.error("A fordítások nem érhetők el: ", lang);
        }
    }
    
    // Felhasználói felület szövegeinek frissítése
    function updateUiTexts(translations) {
        console.log("UI szövegek frissítése:", translations);
        
        try {
            // Főcím
            const mainTitle = document.querySelector('h1.display-5');
            if (mainTitle) {
                mainTitle.innerHTML = `<i class="bi bi-translate me-2"></i>${translations.appTitle} <small class="fs-6 text-secondary">version 1.0</small>`;
            }
            
            // Kártya címek
            const cardTitles = document.querySelectorAll('.card-title');
            if (cardTitles.length >= 3) {
                cardTitles[0].textContent = translations.fileUploadTitle;
                cardTitles[1].textContent = translations.temperatureTitle;
                cardTitles[2].textContent = translations.languageTitle;
            }
            
            // Hőmérséklet címkék
            const tempLabels = document.querySelectorAll('.form-range + div small');
            if (tempLabels.length >= 3) {
                tempLabels[0].textContent = `${translations.temperatureAccurate} (0.1)`;
                tempLabels[1].textContent = `${translations.temperatureBalanced} (1.0)`;
                tempLabels[2].textContent = `${translations.temperatureCreative} (2.0)`;
            }
            
            // Nyelvi címkék - ezeket globális változókkal érjük el
            const sourceLabel = document.querySelector('label[for="sourceLanguage"]');
            if (sourceLabel) sourceLabel.textContent = translations.sourceLanguage + ':';
            
            const targetLabel = document.querySelector('label[for="targetLanguage"]');
            if (targetLabel) targetLabel.textContent = translations.targetLanguage + ':';
            
            // Gombok - ezeket globális változókkal érjük el
            if (startTranslationBtn) {
                startTranslationBtn.innerHTML = `<i class="bi bi-translate me-2"></i>${translations.startTranslation}`;
                console.log("Start gomb szövege frissítve:", translations.startTranslation);
            }
            
            if (stopTranslationBtn) {
                stopTranslationBtn.innerHTML = `<i class="bi bi-pause-circle me-2"></i>${translations.stopTranslation}`;
                console.log("Stop gomb szövege frissítve:", translations.stopTranslation);
            }
            
            if (resetTranslationBtn) {
                resetTranslationBtn.innerHTML = `<i class="bi bi-arrow-counterclockwise me-2"></i>${translations.resetTranslation}`;
                console.log("Reset gomb szövege frissítve:", translations.resetTranslation);
            }
            
            if (saveTranslationBtn) {
                saveTranslationBtn.innerHTML = `<i class="bi bi-download me-2"></i>${translations.saveTranslation}`;
                console.log("Save gomb szövege frissítve:", translations.saveTranslation);
            }
            
            if (saveWorkFileBtn) {
                saveWorkFileBtn.innerHTML = `<i class="bi bi-file-earmark-text me-2"></i>${translations.saveWorkFile}`;
                console.log("Save workfile gomb szövege frissítve:", translations.saveWorkFile);
            }
            
            // Táblázat fejlécek
            if (originalHeader) {
                originalHeader.textContent = translations.originalSubtitle;
                console.log("Eredeti fejléc szövege frissítve:", translations.originalSubtitle);
            }
            
            if (translatedHeader) {
                translatedHeader.textContent = translations.translatedSubtitle;
                console.log("Fordított fejléc szövege frissítve:", translations.translatedSubtitle);
            }
            
            if (actionsHeader) {
                actionsHeader.textContent = translations.actions;
                console.log("Műveletek fejléc szövege frissítve:", translations.actions);
            }
            
            // Fájl információ
            if (fileNameSpan && fileNameSpan.textContent && fileInfoDiv) {
                fileInfoDiv.innerHTML = `<span id="fileName">${fileNameSpan.textContent}</span> - <span id="lineCount">${lineCountSpan ? lineCountSpan.textContent : ''}</span> ${translations.fileInfo}`;
            }
            
            // Újrafordítás gombok
            const retranslateButtons = document.querySelectorAll('.retranslate-btn');
            retranslateButtons.forEach(btn => {
                // Frissítjük a gomb tartalmát: ikon + szöveg
                btn.innerHTML = `<i class="bi bi-arrow-repeat me-1"></i>${translations.retranslate}`;
                btn.dataset.bsTitle = translations.retranslate;
                console.log("Újrafordítás gomb szövege frissítve:", translations.retranslate);
            });
            
            // Egyéb helyek, ahol még lehet fordítható szöveg
            // Footer copyright szöveg
            const footer = document.querySelector('footer p.text-center');
            if (footer) {
                footer.innerHTML = `&copy; 2025 ${translations.appTitle}`;
            }
            
            // File input label frissítése
            const fileInputLabel = document.querySelector('label.custom-file-label');
            if (fileInputLabel) {
                fileInputLabel.textContent = translations.fileInputLabel;
            }
            
            console.log("UI szövegek frissítése befejezve!");
        } catch (error) {
            console.error("Hiba történt az UI szövegek frissítése során:", error);
        }
    }
    
    console.log("UI szövegek frissítése befejezve!");
});
