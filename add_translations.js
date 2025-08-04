// Script to add OpenRouter model selector translations to all language files
const fs = require('fs');
const path = require('path');

// Translation mappings for each language
const translations = {
    'ar.js': {
        openrouterModelLabel: 'اختيار نموذج OpenRouter:',
        selectModelPlaceholder: 'اختر نموذجاً...'
    },
    'bg.js': {
        openrouterModelLabel: 'Избор на модел OpenRouter:',
        selectModelPlaceholder: 'Изберете модел...'
    },
    'cs.js': {
        openrouterModelLabel: 'Výběr modelu OpenRouter:',
        selectModelPlaceholder: 'Vyberte model...'
    },
    'da.js': {
        openrouterModelLabel: 'OpenRouter modelvalg:',
        selectModelPlaceholder: 'Vælg en model...'
    },
    'el.js': {
        openrouterModelLabel: 'Επιλογή μοντέλου OpenRouter:',
        selectModelPlaceholder: 'Επιλέξτε ένα μοντέλο...'
    },
    'fi.js': {
        openrouterModelLabel: 'OpenRouter mallin valinta:',
        selectModelPlaceholder: 'Valitse malli...'
    },
    'fr.js': {
        openrouterModelLabel: 'Sélection de modèle OpenRouter:',
        selectModelPlaceholder: 'Sélectionnez un modèle...'
    },
    'he.js': {
        openrouterModelLabel: 'בחירת מודל OpenRouter:',
        selectModelPlaceholder: 'בחר מודל...'
    },
    'hi.js': {
        openrouterModelLabel: 'OpenRouter मॉडल चयन:',
        selectModelPlaceholder: 'एक मॉडल चुनें...'
    },
    'id.js': {
        openrouterModelLabel: 'Pemilihan model OpenRouter:',
        selectModelPlaceholder: 'Pilih model...'
    },
    'it.js': {
        openrouterModelLabel: 'Selezione modello OpenRouter:',
        selectModelPlaceholder: 'Seleziona un modello...'
    },
    'ja.js': {
        openrouterModelLabel: 'OpenRouterモデル選択:',
        selectModelPlaceholder: 'モデルを選択...'
    },
    'ko.js': {
        openrouterModelLabel: 'OpenRouter 모델 선택:',
        selectModelPlaceholder: '모델을 선택하세요...'
    },
    'nl.js': {
        openrouterModelLabel: 'OpenRouter model selectie:',
        selectModelPlaceholder: 'Selecteer een model...'
    },
    'no.js': {
        openrouterModelLabel: 'OpenRouter modellvalg:',
        selectModelPlaceholder: 'Velg en modell...'
    },
    'pl.js': {
        openrouterModelLabel: 'Wybór modelu OpenRouter:',
        selectModelPlaceholder: 'Wybierz model...'
    },
    'pt.js': {
        openrouterModelLabel: 'Seleção de modelo OpenRouter:',
        selectModelPlaceholder: 'Selecione um modelo...'
    },
    'ro.js': {
        openrouterModelLabel: 'Selecția modelului OpenRouter:',
        selectModelPlaceholder: 'Selectați un model...'
    },
    'ru.js': {
        openrouterModelLabel: 'Выбор модели OpenRouter:',
        selectModelPlaceholder: 'Выберите модель...'
    },
    'sk.js': {
        openrouterModelLabel: 'Výber modelu OpenRouter:',
        selectModelPlaceholder: 'Vyberte model...'
    },
    'sv.js': {
        openrouterModelLabel: 'OpenRouter modellval:',
        selectModelPlaceholder: 'Välj en modell...'
    },
    'th.js': {
        openrouterModelLabel: 'การเลือกโมเดล OpenRouter:',
        selectModelPlaceholder: 'เลือกโมเดล...'
    },
    'tr.js': {
        openrouterModelLabel: 'OpenRouter model seçimi:',
        selectModelPlaceholder: 'Bir model seçin...'
    },
    'uk.js': {
        openrouterModelLabel: 'Вибір моделі OpenRouter:',
        selectModelPlaceholder: 'Виберіть модель...'
    },
    'vi.js': {
        openrouterModelLabel: 'Lựa chọn mô hình OpenRouter:',
        selectModelPlaceholder: 'Chọn một mô hình...'
    },
    'zh.js': {
        openrouterModelLabel: 'OpenRouter 模型选择:',
        selectModelPlaceholder: '选择一个模型...'
    }
};

// Function to add translations to a language file
function addTranslationsToFile(filename) {
    const filePath = path.join(__dirname, 'languages', filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File ${filename} does not exist, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if translations already exist
    if (content.includes('openrouterModelLabel')) {
        console.log(`Translations already exist in ${filename}, skipping...`);
        return;
    }
    
    const translation = translations[filename];
    if (!translation) {
        console.log(`No translation found for ${filename}, skipping...`);
        return;
    }
    
    // Find the insertion point (after targetLanguage line)
    const insertionPoint = content.indexOf('targetLanguage:');
    if (insertionPoint === -1) {
        console.log(`Could not find insertion point in ${filename}, skipping...`);
        return;
    }
    
    // Find the end of the targetLanguage line
    const lineEnd = content.indexOf('\n', insertionPoint);
    if (lineEnd === -1) {
        console.log(`Could not find line end in ${filename}, skipping...`);
        return;
    }
    
    // Insert the new translations
    const newTranslations = `
    
    // OpenRouter model selector
    openrouterModelLabel: "${translation.openrouterModelLabel}",
    selectModelPlaceholder: "${translation.selectModelPlaceholder}",`;
    
    const newContent = content.slice(0, lineEnd + 1) + newTranslations + content.slice(lineEnd + 1);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Successfully updated ${filename}`);
}

// Process all language files
console.log('Adding OpenRouter model selector translations to all language files...');

Object.keys(translations).forEach(filename => {
    addTranslationsToFile(filename);
});

console.log('Translation update complete!');
