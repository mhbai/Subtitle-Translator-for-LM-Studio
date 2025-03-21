// Norsk language file
const no = {
    // Main title
    appTitle: "SRT Undertekst Oversetter",
    
    // File upload
    fileUploadTitle: "Last opp undertekstfil",
    fileInputLabel: "Velg fil",
    browseButton: "Bla gjennom...",
    noFileSelected: "Ingen fil valgt",
    fileInfo: "linjer",
    
    // Translation temperature
    temperatureTitle: "Oversettelsesfrihet",
    temperatureAccurate: "Nøyaktig",
    temperatureBalanced: "Balansert",
    temperatureCreative: "Kreativ",
    
    // Translation mode and API key
    languageTitle: "Oversettelse",
    translationModeTitle: "Oversettelsesmodus",
    apiKeyLabel: "API-nøkkel",
    showApiKeyButton: "Vis",
    sourceLanguage: "Kildespråk",
    targetLanguage: "Målspråk",
    
    // Buttons
    startTranslation: "Start oversettelse",
    continueTranslation: "Fortsett oversettelse",
    stopTranslation: "Stopp oversettelse",
    resetTranslation: "Tilbakestill",
    saveTranslation: "Lagre oversettelse",
    saveWorkFile: "Lagre arbeidsfil",
    saveSourceBlock: "Lagre kildeblokk",
    
    // Table
    originalSubtitle: "Original undertekst",
    translatedSubtitle: "Oversatt tekst",
    actions: "Handlinger",
    retranslate: "Oversett på nytt",
    
    // Status
    translationProgress: "Oversettelsesfremdrift",
    translationComplete: "Oversettelse fullført",
    translationStopped: "Oversettelse stoppet",
    translationReset: "Oversettelse tilbakestilt",
    translationSaved: "Oversettelse lagret",
    workFileSaved: "Arbeidsfil lagret",
    
    // Success messages
    successTranslation: "Oversettelsen er fullført!",
    translationCompleted: "Oversettelsen er fullført!",
    successLoadWorkFile: "Arbeidsfil lastet inn! Du kan fortsette oversettelsen.",
    successSaveWorkFile: "Arbeidsfil lagret!",
    
    // Error messages
    errorFileLoad: "Feil ved lasting av fil",
    errorTranslation: "Det oppstod en feil under oversettelsen!",
    errorSave: "Feil ved lagring av fil",
    errorNoFile: "Vennligst velg en fil!",
    errorTranslationRunning: "Vennligst stopp oversettelsen før du laster inn en ny fil!",
    errorInvalidFile: "Kun .srt, .wrk eller .mmm filer kan lastes inn!",
    errorNoSubtitles: "Filen inneholder ikke gyldige undertekster!",
    errorNoSrtFirst: "Vennligst last inn en .srt fil først, før du laster inn en .mmm fil!",
    errorNoValidText: "Filen inneholder ikke gyldig tekst eller linjenumrene samsvarer ikke med de lastede undertekstene!",
    errorNoTranslation: "Ingenting å lagre! Vennligst oversett undertekstene først.",
    errorNoSubtitleToSave: "Ingen undertekster lastet inn for lagring!",
    errorApiNotAvailable: "LM Studio API er ikke tilgjengelig. Vennligst sjekk at LM Studio kjører i bakgrunnen.",
    errorRetranslation: "Det oppstod en feil under ny oversettelse!",
    errorLoadWorkFile: "Det oppstod en feil under lasting av arbeidsfilen. Vennligst sjekk filformatet!",
    errorServerConnection: "Kunne ikke koble til LM Studio-serveren"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = no;
} else {
    // For browser environment
    window.no = no;
}
