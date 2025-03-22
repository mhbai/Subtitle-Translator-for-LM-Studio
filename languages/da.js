// Dansk language file
const da = {
    // Main title
    appTitle: "SRT Undertekst Oversætter",
    
    // File upload
    fileUploadTitle: "Upload undertekstfil",
    fileInputLabel: "Vælg fil",
    browseButton: "Gennemse...",
    noFileSelected: "Ingen fil valgt",
    fileInfo: "linjer",
    
    // Translation temperature
    temperatureTitle: "Oversættelsesfrihed",
    temperatureAccurate: "Præcis",
    temperatureBalanced: "Balanceret",
    temperatureCreative: "Kreativ",
    
    // Translation mode and API key
    languageTitle: "Oversættelse",
    translationModeTitle: "Oversættelsestilstand",
    apiKeyLabel: "API-nøgle",
    showApiKeyButton: "Vis",
    sourceLanguage: "Kildesprog",
    targetLanguage: "Målsprog",
    
    // Buttons
    startTranslation: "Start oversættelse",
    continueTranslation: "Fortsæt oversættelse",
    stopTranslation: "Stop oversættelse",
    resetTranslation: "Nulstil",
    saveTranslation: "Gem oversættelse",
    saveWorkFile: "Gem arbejdsfil",
    saveSourceBlock: "Gem kildeblok",
    
    // Table
    originalSubtitle: "Original undertekst",
    translatedSubtitle: "Oversat tekst",
    actions: "Handlinger",
    retranslate: "Oversæt igen",
    
    // Status
    translationProgress: "Oversættelsesfremgang",
    translationComplete: "Oversættelse fuldført",
    translationStopped: "Oversættelse stoppet",
    translationReset: "Oversættelse nulstillet",
    translationSaved: "Oversættelse gemt",
    workFileSaved: "Arbejdsfil gemt",
    
    // Success messages
    successTranslation: "Oversættelsen er fuldført!",
    translationCompleted: "Oversættelsen er fuldført!",
    successLoadWorkFile: "Arbejdsfil indlæst! Du kan fortsætte oversættelsen.",
    successSaveWorkFile: "Arbejdsfil gemt!",
    
    // Error messages
    errorFileLoad: "Fejl ved indlæsning af fil",
    errorTranslation: "Der opstod en fejl under oversættelsen!",
    errorSave: "Fejl ved gemning af fil",
    errorNoFile: "Vælg venligst en fil!",
    errorTranslationRunning: "Stop venligst oversættelsen før du indlæser en ny fil!",
    errorInvalidFile: "Kun .srt, .wrk eller .mmm filer kan indlæses!",
    errorNoSubtitles: "Filen indeholder ikke gyldige undertekster!",
    errorNoSrtFirst: "Indlæs venligst en .srt fil først, før du indlæser en .mmm fil!",
    errorNoValidText: "Filen indeholder ikke gyldig tekst eller linjenumrene matcher ikke de indlæste undertekster!",
    errorNoTranslation: "Intet at gemme! Oversæt venligst underteksterne først.",
    errorNoSubtitleToSave: "Ingen undertekster indlæst at gemme!",
    errorApiNotAvailable: "LM Studio API er ikke tilgængeligt. Kontroller venligst om LM Studio kører i baggrunden.",
    errorRetranslation: "Der opstod en fejl under genoversættelsen!",
    errorLoadWorkFile: "Der opstod en fejl under indlæsning af arbejdsfilen. Kontroller venligst filformatet!",
    errorServerConnection: "Kunne ikke forbinde til LM Studio-serveren",
    
    // Indlæsningsanimationstekster
    loadingGeneral: "Indlæser...",
    loadingFileProcessing: "Behandler fil...",
    loadingTablePopulation: "Udfylder tabel...",
    loadingWorkFileProcessing: "Behandler arbejdsfil...",
    loadingMmmFileProcessing: "Behandler MMM-fil...",
    loadingTranslation: "Oversætter...",
    loadingClickToClose: "Klik hvor som helst udenfor for at lukke",
    loadingBatchTranslation: "Batchoversættelse i gang...",
    
    // Fejlmeddelelser for batchoversættelsestilstand
    errorNumberingRetry: "Nummereringsfejl, prøver igen ({0}/{1})...",
    errorRateLimitExceeded: "API-hastighedsgrænse overskredet, venter 10 sekunder...",
    errorTranslationRetry: "Oversættelsesfejl, prøver igen ({0}/{1})...",
    errorTranslationFailed: "Oversættelse mislykkedes efter {0} forsøg, fortsætter...",
    
    // Speciel oversættelsestilstand
    batchModeLabel: "Speciel oversættelsestilstand med stor kontekst"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = da;
} else {
    // For browser environment
    window.da = da;
}
