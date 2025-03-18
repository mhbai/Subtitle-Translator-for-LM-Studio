// Italiano language file
const it = {
    // Main title
    appTitle: "Traduttore di Sottotitoli SRT",
    
    // File upload
    fileUploadTitle: "Carica file sottotitoli",
    fileInputLabel: "Scegli un file",
    browseButton: "Sfoglia...",
    noFileSelected: "Nessun file selezionato",
    fileInfo: "righe",
    
    // Translation temperature
    temperatureTitle: "Libertà di traduzione",
    temperatureAccurate: "Preciso",
    temperatureBalanced: "Bilanciato",
    temperatureCreative: "Creativo",
    
    // Translation mode and API key
    languageTitle: "Modalità di traduzione",
    translationModeTitle: "Modalità di traduzione",
    apiKeyLabel: "Chiave API",
    showApiKeyButton: "Mostra",
    sourceLanguage: "Lingua di origine",
    targetLanguage: "Lingua di destinazione",
    
    // Buttons
    startTranslation: "Avvia traduzione",
    continueTranslation: "Continua traduzione",
    stopTranslation: "Ferma traduzione",
    resetTranslation: "Reimposta",
    saveTranslation: "Salva traduzione",
    saveWorkFile: "Salva file di lavoro",
    saveSourceBlock: "Salva blocco di origine",
    
    // Table
    originalSubtitle: "Testo originale",
    translatedSubtitle: "Testo tradotto",
    actions: "Azioni",
    retranslate: "Ritradurre",
    
    // Status
    translationProgress: "Progresso della traduzione",
    translationComplete: "Traduzione completata",
    translationStopped: "Traduzione interrotta",
    translationReset: "Traduzione reimpostata",
    translationSaved: "Traduzione salvata",
    workFileSaved: "File di lavoro salvato",
    
    // Success messages
    successTranslation: "Traduzione completata con successo!",
    translationCompleted: "Traduzione completata con successo!",
    successLoadWorkFile: "File di lavoro caricato con successo! Puoi continuare la traduzione.",
    successSaveWorkFile: "File di lavoro salvato con successo!",
    
    // Error messages
    errorFileLoad: "Errore durante il caricamento del file",
    errorTranslation: "Si è verificato un errore durante la traduzione!",
    errorSave: "Errore durante il salvataggio del file",
    errorNoFile: "Seleziona un file!",
    errorTranslationRunning: "Ferma la traduzione prima di caricare un nuovo file!",
    errorInvalidFile: "È possibile caricare solo file .srt, .wrk o .mmm!",
    errorNoSubtitles: "Il file non contiene sottotitoli validi!",
    errorNoSrtFirst: "Carica prima un file .srt prima di caricare un file .mmm!",
    errorNoValidText: "Il file non contiene testi validi o i numeri di riga non corrispondono ai sottotitoli caricati!",
    errorNoTranslation: "Niente da salvare! Traduci prima i sottotitoli.",
    errorNoSubtitleToSave: "Nessun sottotitolo caricato da salvare!",
    errorApiNotAvailable: "L'API di LM Studio non è disponibile. Verifica che LM Studio sia in esecuzione in background.",
    errorRetranslation: "Si è verificato un errore durante la ritraduzione!",
    errorLoadWorkFile: "Si è verificato un errore durante il caricamento del file di lavoro. Controlla il formato del file!",
    errorServerConnection: "Impossibile connettersi al server LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = it;
} else {
    // For browser environment
    window.it = it;
}
