// Globális változók
let originalSubtitles = []; // Az eredeti feliratokat tárolja
let translatedSubtitles = []; // A lefordított feliratokat tárolja
let originalSrtContent = ''; // Az eredeti SRT fájl teljes tartalma
let fileName = ''; // A betöltött fájl neve

// DOM elemek
document.addEventListener('DOMContentLoaded', function() {
    // DOM elemek kiválasztása
    const srtFileInput = document.getElementById('srtFile');
    const startTranslationBtn = document.getElementById('startTranslation');
    const saveTranslationBtn = document.getElementById('saveTranslation');
    const subtitleTable = document.getElementById('subtitleTable');
    const fileInfoDiv = document.getElementById('fileInfo');
    const fileNameSpan = document.getElementById('fileName');
    const lineCountSpan = document.getElementById('lineCount');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');

    // Eseménykezelők hozzáadása
    srtFileInput.addEventListener('change', handleFileSelect);
    startTranslationBtn.addEventListener('click', startTranslation);
    saveTranslationBtn.addEventListener('click', saveTranslation);

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
            
            // Eredeti szöveg cella
            const originalCell = document.createElement('td');
            originalCell.textContent = subtitle.text;
            row.appendChild(originalCell);
            
            // Fordított szöveg cella
            const translatedCell = document.createElement('td');
            translatedCell.textContent = translatedSubtitles[index].text || '';
            translatedCell.id = `translated-${index}`;
            row.appendChild(translatedCell);
            
            subtitleTable.appendChild(row);
        });
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
        
        // Gombok letiltása a fordítás idejére
        startTranslationBtn.disabled = true;
        saveTranslationBtn.disabled = true;
        
        // Haladásjelző megjelenítése
        progressContainer.classList.remove('d-none');
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);
        
        // Fordítás végrehajtása soronként
        for (let i = 0; i < originalSubtitles.length; i++) {
            // Haladásjelző frissítése
            const progress = Math.round((i / originalSubtitles.length) * 100);
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
            
            // Fordítás kérése az LM Studio API-tól
            try {
                const translatedText = await translateText(
                    originalSubtitles[i].text,
                    sourceLanguage,
                    targetLanguage
                );
                
                // Fordított szöveg mentése
                translatedSubtitles[i].text = translatedText;
                
                // Táblázat frissítése
                const translatedCell = document.getElementById(`translated-${i}`);
                if (translatedCell) {
                    translatedCell.textContent = translatedText;
                }
            } catch (error) {
                console.error('Hiba a fordítás során:', error);
                alert(`Hiba történt a fordítás során: ${error.message}`);
                break;
            }
        }
        
        // Haladásjelző 100%-ra állítása
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', 100);
        
        // Gombok engedélyezése
        startTranslationBtn.disabled = false;
        saveTranslationBtn.disabled = false;
    }

    // Szöveg fordítása az LM Studio API-val
    async function translateText(text, sourceLanguage, targetLanguage) {
        try {
            // LM Studio API végpont (alapértelmezetten a localhost:1234/v1 címen fut)
            const apiUrl = 'http://localhost:1234/v1/completions';
            
            // Fordítási prompt összeállítása
            const prompt = `Fordítsd le a következő szöveget ${getLanguageName(sourceLanguage)} nyelvről ${getLanguageName(targetLanguage)} nyelvre. Csak a fordítást add vissza, semmilyen magyarázatot vagy egyéb szöveget ne írj.\n\nSzöveg: "${text}"\n\nFordítás:`;
            
            // Fordítási kérés összeállítása
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 500,
                    temperature: 1.0, // Alacsonyabb hőmérséklet a pontosabb fordításhoz
                    stream: false
                })
            });
            
            if (!response.ok) {
                throw new Error(`API hiba: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Ellenőrizzük, hogy van-e válasz
            if (data.choices && data.choices.length > 0 && data.choices[0].text) {
                return data.choices[0].text.trim();
            } else {
                throw new Error('Nem érkezett fordítási eredmény');
            }
        } catch (error) {
            console.error('Fordítási hiba:', error);
            throw new Error(`Fordítási hiba: ${error.message}`);
        }
    }

    // Fordítás mentése
    function saveTranslation() {
        // Ellenőrizzük, hogy van-e lefordított felirat
        if (translatedSubtitles.length === 0 || !translatedSubtitles.some(sub => sub.text)) {
            alert('Nincs lefordított felirat a mentéshez!');
            return;
        }
        
        // Új SRT fájl létrehozása
        let newSrtContent = '';
        
        for (let i = 0; i < translatedSubtitles.length; i++) {
            const subtitle = translatedSubtitles[i];
            
            // Sorszám
            newSrtContent += subtitle.number + '\n';
            
            // Időkód
            newSrtContent += subtitle.timecode + '\n';
            
            // Lefordított szöveg
            newSrtContent += subtitle.text + '\n\n';
        }
        
        // Fájl letöltése
        const targetLanguage = targetLanguageSelect.value;
        const newFileName = fileName.replace('.srt', `_${targetLanguage}.srt`);
        
        const blob = new Blob([newSrtContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        
        // Tisztítás
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
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
