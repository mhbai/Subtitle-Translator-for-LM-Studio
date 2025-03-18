// Magyar nyelvi fájl
const hu = {
    // Főcím
    appTitle: "SRT Felirat Fordító",
    
    // Fájl betöltés
    fileUploadTitle: "Feliratfájl betöltése",
    fileInputLabel: "Fájl kiválasztása",
    browseButton: "Tallózás...",
    noFileSelected: "Nincs kijelölve fájl",
    fileInfo: "sor",
    
    // Fordítási szabadságfok
    temperatureTitle: "Fordítási szabadságfok",
    temperatureAccurate: "Pontos",
    temperatureBalanced: "Kiegyensúlyozott",
    temperatureCreative: "Kreatív",
    
    // Fordítás módja és API kulcs
    languageTitle: "Fordítás módja",
    translationModeTitle: "Fordítás módja",
    apiKeyLabel: "API kulcs",
    showApiKeyButton: "Megjelenítés",
    sourceLanguage: "Forrásnyelv",
    targetLanguage: "Célnyelv",
    
    // Gombok
    startTranslation: "Fordítás indítása",
    continueTranslation: "Fordítás folytatása",
    stopTranslation: "Fordítás megállítása",
    resetTranslation: "Reset",
    saveTranslation: "Fordítás mentése",
    saveWorkFile: "Munkafájl mentése",
    saveSourceBlock: "Forrás blokkmentése",
    
    // Táblázat
    originalSubtitle: "Eredeti felirat",
    translatedSubtitle: "Fordított szöveg",
    actions: "Műveletek",
    retranslate: "Újrafordítás",
    
    // Állapot
    translationProgress: "Fordítás állapota",
    translationComplete: "Fordítás befejezve",
    translationStopped: "Fordítás leállítva",
    translationReset: "Fordítás visszaállítva",
    translationSaved: "Fordítás elmentve",
    workFileSaved: "Munkafájl elmentve",
    
    // Sikeres műveletek
    successTranslation: "A fordítás sikeresen befejeződött!",
    translationCompleted: "A fordítás sikeresen befejeződött!",
    successLoadWorkFile: "Munkafájl sikeresen betöltve! A fordítás folytatható.",
    successSaveWorkFile: "Munkafájl sikeresen elmentve!",
    
    // Hibaüzenetek
    errorFileLoad: "Hiba a fájl betöltése során",
    errorTranslation: "Hiba történt a fordítás során!",
    errorSave: "Hiba a fájl mentése során",
    errorNoFile: "Kérjük, válasszon ki egy fájlt!",
    errorTranslationRunning: "Kérjük, először állítsa le a fordítást, mielőtt új fájlt töltene be!",
    errorInvalidFile: "Csak .srt, .wrk vagy .mmm kiterjesztésű fájlokat lehet betölteni!",
    errorNoSubtitles: "A fájl nem tartalmaz érvényes feliratokat!",
    errorNoSrtFirst: "Először töltsön be egy .srt fájlt, mielőtt .mmm fájlt töltene be!",
    errorNoValidText: "A fájl nem tartalmaz érvényes szövegeket vagy a sorszámok nem egyeznek a betöltött feliratokkal!",
    errorNoTranslation: "Nincs mit menteni! Kérjük, először fordítsa le a feliratokat.",
    errorNoSubtitleToSave: "Nincs betöltött felirat a mentéshez!",
    errorApiNotAvailable: "Az LM Studio API nem érhető el. Kérjük, ellenőrizze, hogy fut-e az LM Studio a háttérben.",
    errorRetranslation: "Hiba történt az újrafordítás során!",
    errorLoadWorkFile: "Hiba történt a munkafájl betöltése során. Ellenőrizze a fájl formátumát!",
    errorServerConnection: "Nem sikerült kapcsolódni az LM Studio szerverhez"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = hu;
} else {
    // For browser environment
    window.hu = hu;
}
