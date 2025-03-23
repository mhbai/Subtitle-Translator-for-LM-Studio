// Polski language file
const pl = {
    // Main title
    appTitle: "Tłumacz Napisów SRT",
    
    // File upload
    fileUploadTitle: "Wczytaj plik napisów",
    fileInputLabel: "Wybierz plik",
    browseButton: "Przeglądaj...",
    noFileSelected: "Nie wybrano pliku",
    fileInfo: "linii",
    
    // Translation temperature
    temperatureTitle: "Temperatura tłumaczenia",
    temperatureAccurate: "Dokładne",
    temperatureBalanced: "Zrównoważone",
    temperatureCreative: "Kreatywne",
    
    // Translation mode and API key
    languageTitle: "Tłumaczenie",
    translationModeTitle: "Tryb tłumaczenia",
    apiKeyLabel: "Klucz API",
    showApiKeyButton: "Pokaż",
    sourceLanguage: "Język źródłowy",
    targetLanguage: "Język docelowy",
    
    // Buttons
    startTranslation: "Rozpocznij tłumaczenie",
    continueTranslation: "Kontynuuj tłumaczenie",
    stopTranslation: "Zatrzymaj tłumaczenie",
    resetTranslation: "Reset",
    saveTranslation: "Zapisz tłumaczenie",
    saveWorkFile: "Zapisz plik roboczy",
    saveSourceBlock: "Zapisz blok źródłowy",
    
    // Table
    originalSubtitle: "Oryginalny napis",
    translatedSubtitle: "Przetłumaczony tekst",
    actions: "Akcje",
    retranslate: "Przetłumacz ponownie",
    
    // Status
    translationProgress: "Postęp tłumaczenia",
    translationComplete: "Tłumaczenie zakończone",
    translationStopped: "Tłumaczenie zatrzymane",
    translationReset: "Tłumaczenie zresetowane",
    translationSaved: "Tłumaczenie zapisane",
    workFileSaved: "Plik roboczy zapisany",
    
    // Success messages
    successTranslation: "Tłumaczenie zakończone pomyślnie!",
    translationCompleted: "Tłumaczenie zakończone pomyślnie!",
    successLoadWorkFile: "Plik roboczy wczytany pomyślnie! Możesz kontynuować tłumaczenie.",
    successSaveWorkFile: "Plik roboczy zapisany pomyślnie!",
    
    // Error messages
    errorFileLoad: "Błąd podczas wczytywania pliku",
    errorTranslation: "Wystąpił błąd podczas tłumaczenia!",
    errorSave: "Błąd podczas zapisywania pliku",
    errorNoFile: "Proszę wybrać plik!",
    errorTranslationRunning: "Proszę zatrzymać tłumaczenie przed wczytaniem nowego pliku!",
    errorInvalidFile: "Można wczytać tylko pliki .srt, .wrk lub .mmm!",
    errorNoSubtitles: "Plik nie zawiera prawidłowych napisów!",
    errorNoSrtFirst: "Proszę najpierw wczytać plik .srt przed wczytaniem pliku .mmm!",
    errorNoValidText: "Plik nie zawiera prawidłowych tekstów lub numery linii nie pasują do wczytanych napisów!",
    errorNoTranslation: "Nie ma nic do zapisania! Proszę najpierw przetłumaczyć napisy.",
    errorNoSubtitleToSave: "Brak wczytanych napisów do zapisania!",
    errorApiNotAvailable: "API LM Studio jest niedostępne. Sprawdź, czy LM Studio działa w tle.",
    errorRetranslation: "Wystąpił błąd podczas ponownego tłumaczenia!",
    errorLoadWorkFile: "Wystąpił błąd podczas wczytywania pliku roboczego. Sprawdź format pliku!",
    errorServerConnection: "Nie można połączyć się z serwerem LM Studio",
    
    // Teksty animacji ładowania
    loadingGeneral: "Ładowanie...",
    loadingFileProcessing: "Przetwarzanie pliku...",
    loadingTablePopulation: "Wypełnianie tabeli...",
    loadingWorkFileProcessing: "Przetwarzanie pliku roboczego...",
    loadingMmmFileProcessing: "Przetwarzanie pliku MMM...",
    loadingTranslation: "Tłumaczenie...",
    loadingClickToClose: "Kliknij gdziekolwiek na zewnątrz, aby zamknąć",
    loadingBatchTranslation: "Tłumaczenie wsadowe w toku...",
    
    // Komunikaty o błędach w trybie tłumaczenia wsadowego
    errorNumberingRetry: "Błąd numeracji, ponowna próba ({0}/{1})...",
    errorRateLimitExceeded: "Przekroczono limit szybkości API, oczekiwanie 10 sekund...",
    errorTranslationRetry: "Błąd tłumaczenia, ponowna próba ({0}/{1})...",
    errorTranslationFailed: "Tłumaczenie nie powiodło się po {0} próbach, kontynuowanie...",
    
    // Specjalny tryb tłumaczenia
    batchModeLabel: "Specjalny tryb tłumaczenia z dużym kontekstem",
    batchModeInfo: "Gdy ta funkcja jest włączona, program przetwarza jednocześnie 30 linii tekstu w specjalny sposób, co umożliwia szybsze tłumaczenie z lepszym zrozumieniem i dokładnością"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pl;
} else {
    // For browser environment
    window.pl = pl;
}
