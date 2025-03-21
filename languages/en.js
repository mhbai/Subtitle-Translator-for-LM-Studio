// English language file
const en = {
    // Main title
    appTitle: "SRT Subtitle Translator",
    
    // File upload
    fileUploadTitle: "Upload Subtitle File",
    fileInputLabel: "Choose File",
    browseButton: "Browse...",
    noFileSelected: "No file selected",
    fileInfo: "lines",
    
    // Translation temperature
    temperatureTitle: "Translation Temperature",
    temperatureAccurate: "Accurate",
    temperatureBalanced: "Balanced",
    temperatureCreative: "Creative",
    
    // Translation mode and API key
    languageTitle: "Translation",
    translationModeTitle: "Translation Mode",
    apiKeyLabel: "API Key",
    showApiKeyButton: "Show",
    sourceLanguage: "Source Language",
    targetLanguage: "Target Language",
    
    // Buttons
    startTranslation: "Start Translation",
    continueTranslation: "Continue Translation",
    stopTranslation: "Stop Translation",
    resetTranslation: "Reset",
    saveTranslation: "Save Translation",
    saveWorkFile: "Save Work File",
    saveSourceBlock: "Save Source Block",
    
    // Table
    originalSubtitle: "Original Subtitle",
    translatedSubtitle: "Translated Text",
    actions: "Actions",
    retranslate: "Retranslate",
    
    // Status
    translationProgress: "Translation Progress",
    translationComplete: "Translation Complete",
    translationStopped: "Translation Stopped",
    translationReset: "Translation Reset",
    translationSaved: "Translation Saved",
    workFileSaved: "Work File Saved",
    
    // Success messages
    successTranslation: "Translation successfully completed!",
    translationCompleted: "Translation successfully completed!",
    successLoadWorkFile: "Work file successfully loaded! You can continue the translation.",
    successSaveWorkFile: "Work file successfully saved!",
    
    // Error messages
    errorFileLoad: "Error loading file",
    errorTranslation: "An error occurred during translation!",
    errorSave: "Error saving file",
    errorNoFile: "Please select a file!",
    errorTranslationRunning: "Please stop the translation before loading a new file!",
    errorInvalidFile: "Only .srt, .wrk or .mmm files can be loaded!",
    errorNoSubtitles: "The file does not contain valid subtitles!",
    errorNoSrtFirst: "Please load an .srt file first before loading an .mmm file!",
    errorNoValidText: "The file does not contain valid texts or the line numbers do not match the loaded subtitles!",
    errorNoTranslation: "Nothing to save! Please translate the subtitles first.",
    errorNoSubtitleToSave: "No subtitles loaded to save!",
    errorApiNotAvailable: "LM Studio API is not available. Please check if LM Studio is running in the background.",
    errorRetranslation: "An error occurred during retranslation!",
    errorLoadWorkFile: "An error occurred while loading the work file. Please check the file format!",
    errorServerConnection: "Could not connect to LM Studio server"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = en;
} else {
    // For browser environment
    window.en = en;
}
