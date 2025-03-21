// Български language file
const bg = {
    // Main title
    appTitle: "SRT Преводач на субтитри",
    
    // File upload
    fileUploadTitle: "Качване на файл със субтитри",
    fileInputLabel: "Избери файл",
    browseButton: "Разгледай...",
    noFileSelected: "Няма избран файл",
    fileInfo: "реда",
    
    // Translation temperature
    temperatureTitle: "Свобода на превода",
    temperatureAccurate: "Точен",
    temperatureBalanced: "Балансиран",
    temperatureCreative: "Творчески",
    
    // Translation mode and API key
    languageTitle: "Превод",
    translationModeTitle: "Начин на превод",
    apiKeyLabel: "API ключ",
    showApiKeyButton: "Покажи",
    sourceLanguage: "Изходен език",
    targetLanguage: "Целеви език",
    
    // Buttons
    startTranslation: "Започни превод",
    continueTranslation: "Продължи превода",
    stopTranslation: "Спри превода",
    resetTranslation: "Нулиране",
    saveTranslation: "Запази превода",
    saveWorkFile: "Запази работен файл",
    saveSourceBlock: "Запази изходен блок",
    
    // Table
    originalSubtitle: "Оригинален субтитър",
    translatedSubtitle: "Преведен текст",
    actions: "Действия",
    retranslate: "Преведи отново",
    
    // Status
    translationProgress: "Напредък на превода",
    translationComplete: "Преводът е завършен",
    translationStopped: "Преводът е спрян",
    translationReset: "Преводът е нулиран",
    translationSaved: "Преводът е запазен",
    workFileSaved: "Работният файл е запазен",
    
    // Success messages
    successTranslation: "Преводът е завършен успешно!",
    translationCompleted: "Преводът е завършен успешно!",
    successLoadWorkFile: "Работният файл е зареден успешно! Можете да продължите превода.",
    successSaveWorkFile: "Работният файл е запазен успешно!",
    
    // Error messages
    errorFileLoad: "Грешка при зареждане на файла",
    errorTranslation: "Възникна грешка по време на превода!",
    errorSave: "Грешка при запазване на файла",
    errorNoFile: "Моля, изберете файл!",
    errorTranslationRunning: "Моля, спрете превода преди да заредите нов файл!",
    errorInvalidFile: "Могат да се зареждат само файлове .srt, .wrk или .mmm!",
    errorNoSubtitles: "Файлът не съдържа валидни субтитри!",
    errorNoSrtFirst: "Моля, заредете първо .srt файл, преди да заредите .mmm файл!",
    errorNoValidText: "Файлът не съдържа валиден текст или номерата на редовете не съвпадат със заредените субтитри!",
    errorNoTranslation: "Няма какво да се запази! Моля, първо преведете субтитрите.",
    errorNoSubtitleToSave: "Няма заредени субтитри за запазване!",
    errorApiNotAvailable: "LM Studio API не е достъпно. Моля, проверете дали LM Studio работи на заден план.",
    errorRetranslation: "Възникна грешка по време на повторния превод!",
    errorLoadWorkFile: "Възникна грешка при зареждане на работния файл. Моля, проверете формата на файла!",
    errorServerConnection: "Не може да се осъществи връзка със сървъра на LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bg;
} else {
    // For browser environment
    window.bg = bg;
}
