// Deutsch language file
const de = {
    // Main title
    appTitle: "SRT Untertitel-Übersetzer",
    
    // File upload
    fileUploadTitle: "Untertiteldatei hochladen",
    fileInputLabel: "Datei auswählen",
    browseButton: "Durchsuchen...",
    noFileSelected: "Keine Datei ausgewählt",
    fileInfo: "Zeilen",
    
    // Translation temperature
    temperatureTitle: "Übersetzungstemperatur",
    temperatureAccurate: "Genau",
    temperatureBalanced: "Ausgewogen",
    temperatureCreative: "Kreativ",
    
    // Translation mode and API key
    languageTitle: "Übersetzung",
    translationModeTitle: "Übersetzungsmodus",
    apiKeyLabel: "API-Schlüssel",
    showApiKeyButton: "Anzeigen",
    sourceLanguage: "Quellsprache",
    targetLanguage: "Zielsprache",
    
    // Buttons
    startTranslation: "Übersetzung starten",
    continueTranslation: "Übersetzung fortsetzen",
    stopTranslation: "Übersetzung stoppen",
    resetTranslation: "Zurücksetzen",
    saveTranslation: "Übersetzung speichern",
    saveWorkFile: "Arbeitsdatei speichern",
    saveSourceBlock: "Quellblock speichern",
    
    // Table
    originalSubtitle: "Originaler Untertitel",
    translatedSubtitle: "Übersetzter Text",
    actions: "Aktionen",
    retranslate: "Neu übersetzen",
    
    // Status
    translationProgress: "Übersetzungsfortschritt",
    translationComplete: "Übersetzung abgeschlossen",
    translationStopped: "Übersetzung gestoppt",
    translationReset: "Übersetzung zurückgesetzt",
    translationSaved: "Übersetzung gespeichert",
    workFileSaved: "Arbeitsdatei gespeichert",
    
    // Success messages
    successTranslation: "Übersetzung erfolgreich abgeschlossen!",
    translationCompleted: "Übersetzung erfolgreich abgeschlossen!",
    successLoadWorkFile: "Arbeitsdatei erfolgreich geladen! Sie können die Übersetzung fortsetzen.",
    successSaveWorkFile: "Arbeitsdatei erfolgreich gespeichert!",
    
    // Error messages
    errorFileLoad: "Fehler beim Laden der Datei",
    errorTranslation: "Fehler während der Übersetzung",
    errorSave: "Fehler beim Speichern der Datei",
    errorNoFile: "Bitte wählen Sie zuerst eine Datei aus",
    errorTranslationRunning: "Bitte stoppen Sie die Übersetzung bevor Sie eine neue Datei laden!",
    errorInvalidFile: "Nur .srt, .wrk oder .mmm Dateien können geladen werden!",
    errorNoSubtitles: "Die Datei enthält keine gültigen Untertitel!",
    errorNoSrtFirst: "Bitte laden Sie zuerst eine .srt Datei bevor Sie eine .mmm Datei laden!",
    errorNoValidText: "Die Datei enthält keine gültigen Texte oder die Zeilennummern stimmen nicht mit den geladenen Untertiteln überein!",
    errorNoTranslation: "Nichts zu speichern! Bitte übersetzen Sie zuerst die Untertitel.",
    errorNoSubtitleToSave: "Keine Untertitel zum Speichern geladen!",
    errorApiNotAvailable: "LM Studio API ist nicht verfügbar. Bitte überprüfen Sie, ob LM Studio im Hintergrund läuft.",
    errorRetranslation: "Fehler bei der erneuten Übersetzung!",
    errorLoadWorkFile: "Fehler beim Laden der Arbeitsdatei. Bitte überprüfen Sie das Dateiformat!",
    errorServerConnection: "Verbindung zum LM Studio-Server nicht möglich"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = de;
} else {
    // For browser environment
    window.de = de;
}
