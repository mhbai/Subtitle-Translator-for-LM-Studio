// Nederlands language file
const nl = {
    // Main title
    appTitle: "SRT Ondertitel Vertaler",
    
    // File upload
    fileUploadTitle: "Ondertitelbestand uploaden",
    fileInputLabel: "Bestand kiezen",
    browseButton: "Bladeren...",
    noFileSelected: "Geen bestand geselecteerd",
    fileInfo: "regels",
    
    // Translation temperature
    temperatureTitle: "Vertaaltemperatuur",
    temperatureAccurate: "Nauwkeurig",
    temperatureBalanced: "Gebalanceerd",
    temperatureCreative: "Creatief",
    
    // Translation mode and API key
    languageTitle: "Vertaalmodus",
    translationModeTitle: "Vertaalmodus",
    apiKeyLabel: "API-sleutel",
    showApiKeyButton: "Tonen",
    sourceLanguage: "Brontaal",
    targetLanguage: "Doeltaal",
    
    // Buttons
    startTranslation: "Vertaling starten",
    continueTranslation: "Vertaling voortzetten",
    stopTranslation: "Vertaling stoppen",
    resetTranslation: "Resetten",
    saveTranslation: "Vertaling opslaan",
    saveWorkFile: "Werkbestand opslaan",
    saveSourceBlock: "Bronblok opslaan",
    
    // Table
    originalSubtitle: "Originele ondertitel",
    translatedSubtitle: "Vertaalde tekst",
    actions: "Acties",
    retranslate: "Opnieuw vertalen",
    
    // Status
    translationProgress: "Vertaalvoortgang",
    translationComplete: "Vertaling voltooid",
    translationStopped: "Vertaling gestopt",
    translationReset: "Vertaling gereset",
    translationSaved: "Vertaling opgeslagen",
    workFileSaved: "Werkbestand opgeslagen",
    
    // Success messages
    successTranslation: "Vertaling succesvol voltooid!",
    translationCompleted: "Vertaling succesvol voltooid!",
    successLoadWorkFile: "Werkbestand succesvol geladen! U kunt doorgaan met de vertaling.",
    successSaveWorkFile: "Werkbestand succesvol opgeslagen!",
    
    // Error messages
    errorFileLoad: "Fout bij het laden van het bestand",
    errorTranslation: "Er is een fout opgetreden tijdens het vertalen!",
    errorSave: "Fout bij het opslaan van het bestand",
    errorNoFile: "Selecteer een bestand!",
    errorTranslationRunning: "Stop de vertaling voordat u een nieuw bestand laadt!",
    errorInvalidFile: "Alleen .srt, .wrk of .mmm bestanden kunnen worden geladen!",
    errorNoSubtitles: "Het bestand bevat geen geldige ondertitels!",
    errorNoSrtFirst: "Laad eerst een .srt bestand voordat u een .mmm bestand laadt!",
    errorNoValidText: "Het bestand bevat geen geldige teksten of de regelnummers komen niet overeen met de geladen ondertitels!",
    errorNoTranslation: "Niets om op te slaan! Vertaal eerst de ondertitels.",
    errorNoSubtitleToSave: "Geen ondertitels geladen om op te slaan!",
    errorApiNotAvailable: "LM Studio API is niet beschikbaar. Controleer of LM Studio op de achtergrond draait.",
    errorRetranslation: "Er is een fout opgetreden tijdens het opnieuw vertalen!",
    errorLoadWorkFile: "Er is een fout opgetreden bij het laden van het werkbestand. Controleer het bestandsformaat!",
    errorServerConnection: "Kan geen verbinding maken met de LM Studio-server"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = nl;
} else {
    // For browser environment
    window.nl = nl;
}
