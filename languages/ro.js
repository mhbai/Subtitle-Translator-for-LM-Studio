// Română language file
const ro = {
    // Main title
    appTitle: "Traducător de Subtitrări SRT",
    
    // File upload
    fileUploadTitle: "Încarcă fișier de subtitrare",
    fileInputLabel: "Alege fișier",
    browseButton: "Răsfoiește...",
    noFileSelected: "Niciun fișier selectat",
    fileInfo: "linii",
    
    // Translation temperature
    temperatureTitle: "Libertatea traducerii",
    temperatureAccurate: "Precisă",
    temperatureBalanced: "Echilibrată",
    temperatureCreative: "Creativă",
    
    // Translation mode and API key
    languageTitle: "Modul de traducere",
    translationModeTitle: "Modul de traducere",
    apiKeyLabel: "Cheie API",
    showApiKeyButton: "Arată",
    sourceLanguage: "Limba sursă",
    targetLanguage: "Limba țintă",
    
    // Buttons
    startTranslation: "Începe traducerea",
    continueTranslation: "Continuă traducerea",
    stopTranslation: "Oprește traducerea",
    resetTranslation: "Resetează",
    saveTranslation: "Salvează traducerea",
    saveWorkFile: "Salvează fișierul de lucru",
    saveSourceBlock: "Salvează blocul sursă",
    
    // Table
    originalSubtitle: "Subtitrare originală",
    translatedSubtitle: "Text tradus",
    actions: "Acțiuni",
    retranslate: "Retraduce",
    
    // Status
    translationProgress: "Progresul traducerii",
    translationComplete: "Traducere completă",
    translationStopped: "Traducere oprită",
    translationReset: "Traducere resetată",
    translationSaved: "Traducere salvată",
    workFileSaved: "Fișier de lucru salvat",
    
    // Success messages
    successTranslation: "Traducerea a fost finalizată cu succes!",
    translationCompleted: "Traducerea a fost finalizată cu succes!",
    successLoadWorkFile: "Fișierul de lucru a fost încărcat cu succes! Puteți continua traducerea.",
    successSaveWorkFile: "Fișierul de lucru a fost salvat cu succes!",
    
    // Error messages
    errorFileLoad: "Eroare la încărcarea fișierului",
    errorTranslation: "A apărut o eroare în timpul traducerii!",
    errorSave: "Eroare la salvarea fișierului",
    errorNoFile: "Vă rugăm să selectați un fișier!",
    errorTranslationRunning: "Vă rugăm să opriți traducerea înainte de a încărca un nou fișier!",
    errorInvalidFile: "Pot fi încărcate doar fișiere .srt, .wrk sau .mmm!",
    errorNoSubtitles: "Fișierul nu conține subtitrări valide!",
    errorNoSrtFirst: "Vă rugăm să încărcați mai întâi un fișier .srt înainte de a încărca un fișier .mmm!",
    errorNoValidText: "Fișierul nu conține text valid sau numerele liniilor nu se potrivesc cu subtitrările încărcate!",
    errorNoTranslation: "Nu există nimic de salvat! Vă rugăm să traduceți mai întâi subtitrările.",
    errorNoSubtitleToSave: "Nu există subtitrări încărcate pentru a fi salvate!",
    errorApiNotAvailable: "API-ul LM Studio nu este disponibil. Vă rugăm să verificați dacă LM Studio rulează în fundal.",
    errorRetranslation: "A apărut o eroare în timpul retraducerii!",
    errorLoadWorkFile: "A apărut o eroare la încărcarea fișierului de lucru. Vă rugăm să verificați formatul fișierului!",
    errorServerConnection: "Nu s-a putut conecta la serverul LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ro;
} else {
    // For browser environment
    window.ro = ro;
}
