// Русский language file
const ru = {
    // Main title
    appTitle: "Переводчик субтитров SRT",
    
    // File upload
    fileUploadTitle: "Загрузить файл субтитров",
    fileInputLabel: "Выбрать файл",
    browseButton: "Обзор...",
    noFileSelected: "Файл не выбран",
    fileInfo: "строк",
    
    // Translation temperature
    temperatureTitle: "Температура перевода",
    temperatureAccurate: "Точный",
    temperatureBalanced: "Сбалансированный",
    temperatureCreative: "Творческий",
    
    // Translation mode and API key
    languageTitle: "Режим перевода",
    translationModeTitle: "Режим перевода",
    apiKeyLabel: "API ключ",
    showApiKeyButton: "Показать",
    sourceLanguage: "Исходный язык",
    targetLanguage: "Целевой язык",
    
    // Buttons
    startTranslation: "Начать перевод",
    continueTranslation: "Продолжить перевод",
    stopTranslation: "Остановить перевод",
    resetTranslation: "Сбросить",
    saveTranslation: "Сохранить перевод",
    saveWorkFile: "Сохранить рабочий файл",
    saveSourceBlock: "Сохранить исходный блок",
    
    // Table
    originalSubtitle: "Оригинальные субтитры",
    translatedSubtitle: "Переведенный текст",
    actions: "Действия",
    retranslate: "Перевести заново",
    
    // Status
    translationProgress: "Прогресс перевода",
    translationComplete: "Перевод завершен",
    translationStopped: "Перевод остановлен",
    translationReset: "Перевод сброшен",
    translationSaved: "Перевод сохранен",
    workFileSaved: "Рабочий файл сохранен",
    
    // Success messages
    successTranslation: "Перевод успешно завершен!",
    translationCompleted: "Перевод успешно завершен!",
    successLoadWorkFile: "Рабочий файл успешно загружен! Вы можете продолжить перевод.",
    successSaveWorkFile: "Рабочий файл успешно сохранен!",
    
    // Error messages
    errorFileLoad: "Ошибка при загрузке файла",
    errorTranslation: "Произошла ошибка во время перевода!",
    errorSave: "Ошибка при сохранении файла",
    errorNoFile: "Пожалуйста, выберите файл!",
    errorTranslationRunning: "Пожалуйста, остановите перевод перед загрузкой нового файла!",
    errorInvalidFile: "Можно загружать только файлы .srt, .wrk или .mmm!",
    errorNoSubtitles: "Файл не содержит действительных субтитров!",
    errorNoSrtFirst: "Пожалуйста, сначала загрузите файл .srt перед загрузкой файла .mmm!",
    errorNoValidText: "Файл не содержит действительных текстов или номера строк не соответствуют загруженным субтитрам!",
    errorNoTranslation: "Нечего сохранять! Пожалуйста, сначала переведите субтитры.",
    errorNoSubtitleToSave: "Нет загруженных субтитров для сохранения!",
    errorApiNotAvailable: "API LM Studio недоступен. Пожалуйста, проверьте, работает ли LM Studio в фоновом режиме.",
    errorRetranslation: "Произошла ошибка при повторном переводе!",
    errorLoadWorkFile: "Произошла ошибка при загрузке рабочего файла. Пожалуйста, проверьте формат файла!",
    errorServerConnection: "Не удалось подключиться к серверу LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ru;
} else {
    // For browser environment
    window.ru = ru;
}
