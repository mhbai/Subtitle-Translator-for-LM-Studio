// Svenska language file
const sv = {
    // Main title
    appTitle: "SRT Undertextöversättare",
    
    // File upload
    fileUploadTitle: "Ladda upp undertextfil",
    fileInputLabel: "Välj fil",
    browseButton: "Bläddra...",
    noFileSelected: "Ingen fil vald",
    fileInfo: "rader",
    
    // Translation temperature
    temperatureTitle: "Översättningsfrihet",
    temperatureAccurate: "Exakt",
    temperatureBalanced: "Balanserad",
    temperatureCreative: "Kreativ",
    
    // Translation mode and API key
    languageTitle: "Översättningsläge",
    translationModeTitle: "Översättningsläge",
    apiKeyLabel: "API-nyckel",
    showApiKeyButton: "Visa",
    sourceLanguage: "Källspråk",
    targetLanguage: "Målspråk",
    
    // Buttons
    startTranslation: "Starta översättning",
    continueTranslation: "Fortsätt översättning",
    stopTranslation: "Stoppa översättning",
    resetTranslation: "Återställ",
    saveTranslation: "Spara översättning",
    saveWorkFile: "Spara arbetsfil",
    saveSourceBlock: "Spara källblock",
    
    // Table
    originalSubtitle: "Originaltext",
    translatedSubtitle: "Översatt text",
    actions: "Åtgärder",
    retranslate: "Översätt igen",
    
    // Status
    translationProgress: "Översättningsförlopp",
    translationComplete: "Översättning klar",
    translationStopped: "Översättning stoppad",
    translationReset: "Översättning återställd",
    translationSaved: "Översättning sparad",
    workFileSaved: "Arbetsfil sparad",
    
    // Success messages
    successTranslation: "Översättningen har slutförts!",
    translationCompleted: "Översättningen har slutförts!",
    successLoadWorkFile: "Arbetsfilen har laddats! Du kan fortsätta översättningen.",
    successSaveWorkFile: "Arbetsfilen har sparats!",
    
    // Error messages
    errorFileLoad: "Fel vid laddning av fil",
    errorTranslation: "Ett fel uppstod under översättningen!",
    errorSave: "Fel vid sparande av fil",
    errorNoFile: "Välj en fil!",
    errorTranslationRunning: "Stoppa översättningen innan du laddar en ny fil!",
    errorInvalidFile: "Endast .srt, .wrk eller .mmm filer kan laddas!",
    errorNoSubtitles: "Filen innehåller inga giltiga undertexter!",
    errorNoSrtFirst: "Ladda först en .srt-fil innan du laddar en .mmm-fil!",
    errorNoValidText: "Filen innehåller ingen giltig text eller radnumren matchar inte de laddade undertexterna!",
    errorNoTranslation: "Inget att spara! Översätt undertexterna först.",
    errorNoSubtitleToSave: "Inga undertexter laddade att spara!",
    errorApiNotAvailable: "LM Studio API är inte tillgängligt. Kontrollera att LM Studio körs i bakgrunden.",
    errorRetranslation: "Ett fel uppstod under återöversättningen!",
    errorLoadWorkFile: "Ett fel uppstod vid laddning av arbetsfilen. Kontrollera filformatet!",
    errorServerConnection: "Kunde inte ansluta till LM Studio-servern"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sv;
} else {
    // For browser environment
    window.sv = sv;
}
