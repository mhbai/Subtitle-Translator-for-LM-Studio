// Slovenčina language file
const sk = {
    // Main title
    appTitle: "SRT Prekladač titulkov",
    
    // File upload
    fileUploadTitle: "Nahrať súbor s titulkami",
    fileInputLabel: "Vybrať súbor",
    browseButton: "Prehliadať...",
    noFileSelected: "Nie je vybraný žiadny súbor",
    fileInfo: "riadkov",
    
    // Translation temperature
    temperatureTitle: "Voľnosť prekladu",
    temperatureAccurate: "Presný",
    temperatureBalanced: "Vyvážený",
    temperatureCreative: "Kreatívny",
    
    // Translation mode and API key
    languageTitle: "Preklad",
    translationModeTitle: "Spôsob prekladu",
    apiKeyLabel: "API kľúč",
    showApiKeyButton: "Zobraziť",
    sourceLanguage: "Zdrojový jazyk",
    targetLanguage: "Cieľový jazyk",
    
    // Buttons
    startTranslation: "Začať preklad",
    continueTranslation: "Pokračovať v preklade",
    stopTranslation: "Zastaviť preklad",
    resetTranslation: "Resetovať",
    saveTranslation: "Uložiť preklad",
    saveWorkFile: "Uložiť pracovný súbor",
    saveSourceBlock: "Uložiť zdrojový blok",
    
    // Table
    originalSubtitle: "Pôvodné titulky",
    translatedSubtitle: "Preložený text",
    actions: "Akcie",
    retranslate: "Preložiť znovu",
    
    // Status
    translationProgress: "Priebeh prekladu",
    translationComplete: "Preklad dokončený",
    translationStopped: "Preklad zastavený",
    translationReset: "Preklad resetovaný",
    translationSaved: "Preklad uložený",
    workFileSaved: "Pracovný súbor uložený",
    
    // Success messages
    successTranslation: "Preklad bol úspešne dokončený!",
    translationCompleted: "Preklad bol úspešne dokončený!",
    successLoadWorkFile: "Pracovný súbor bol úspešne načítaný! Môžete pokračovať v preklade.",
    successSaveWorkFile: "Pracovný súbor bol úspešne uložený!",
    
    // Error messages
    errorFileLoad: "Chyba pri načítaní súboru",
    errorTranslation: "Počas prekladu sa vyskytla chyba!",
    errorSave: "Chyba pri ukladaní súboru",
    errorNoFile: "Prosím vyberte súbor!",
    errorTranslationRunning: "Prosím zastavte preklad pred načítaním nového súboru!",
    errorInvalidFile: "Je možné načítať iba súbory .srt, .wrk alebo .mmm!",
    errorNoSubtitles: "Súbor neobsahuje platné titulky!",
    errorNoSrtFirst: "Prosím načítajte najprv súbor .srt pred načítaním súboru .mmm!",
    errorNoValidText: "Súbor neobsahuje platný text alebo čísla riadkov nezodpovedajú načítaným titulkom!",
    errorNoTranslation: "Nie je čo uložiť! Prosím najprv preložte titulky.",
    errorNoSubtitleToSave: "Nie sú načítané žiadne titulky na uloženie!",
    errorApiNotAvailable: "LM Studio API nie je dostupné. Prosím skontrolujte, či LM Studio beží na pozadí.",
    errorRetranslation: "Počas opätovného prekladu sa vyskytla chyba!",
    errorLoadWorkFile: "Počas načítavania pracovného súboru sa vyskytla chyba. Prosím skontrolujte formát súboru!",
    errorServerConnection: "Nie je možné sa pripojiť k serveru LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sk;
} else {
    // For browser environment
    window.sk = sk;
}
