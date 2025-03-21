// 한국어 language file
const ko = {
    // Main title
    appTitle: "SRT 자막 번역기",
    
    // File upload
    fileUploadTitle: "자막 파일 업로드",
    fileInputLabel: "파일 선택",
    browseButton: "찾아보기...",
    noFileSelected: "선택된 파일 없음",
    fileInfo: "줄",
    
    // Translation temperature
    temperatureTitle: "번역 자유도",
    temperatureAccurate: "정확함",
    temperatureBalanced: "균형잡힘",
    temperatureCreative: "창의적",
    
    // Translation mode and API key
    languageTitle: "번역",
    translationModeTitle: "번역 모드",
    apiKeyLabel: "API 키",
    showApiKeyButton: "표시",
    sourceLanguage: "원본 언어",
    targetLanguage: "대상 언어",
    
    // Buttons
    startTranslation: "번역 시작",
    continueTranslation: "번역 계속하기",
    stopTranslation: "번역 중지",
    resetTranslation: "초기화",
    saveTranslation: "번역 저장",
    saveWorkFile: "작업 파일 저장",
    saveSourceBlock: "원본 블록 저장",
    
    // Table
    originalSubtitle: "원본 자막",
    translatedSubtitle: "번역된 텍스트",
    actions: "작업",
    retranslate: "다시 번역",
    
    // Status
    translationProgress: "번역 진행 상황",
    translationComplete: "번역 완료",
    translationStopped: "번역 중지됨",
    translationReset: "번역 초기화됨",
    translationSaved: "번역 저장됨",
    workFileSaved: "작업 파일 저장됨",
    
    // Success messages
    successTranslation: "번역이 성공적으로 완료되었습니다!",
    translationCompleted: "번역이 성공적으로 완료되었습니다!",
    successLoadWorkFile: "작업 파일이 성공적으로 로드되었습니다! 번역을 계속할 수 있습니다.",
    successSaveWorkFile: "작업 파일이 성공적으로 저장되었습니다!",
    
    // Error messages
    errorFileLoad: "파일 로드 중 오류 발생",
    errorTranslation: "번역 중 오류가 발생했습니다!",
    errorSave: "파일 저장 중 오류 발생",
    errorNoFile: "파일을 선택해 주세요!",
    errorTranslationRunning: "새 파일을 로드하기 전에 번역을 중지해 주세요!",
    errorInvalidFile: ".srt, .wrk 또는 .mmm 파일만 로드할 수 있습니다!",
    errorNoSubtitles: "파일에 유효한 자막이 없습니다!",
    errorNoSrtFirst: ".mmm 파일을 로드하기 전에 먼저 .srt 파일을 로드해 주세요!",
    errorNoValidText: "파일에 유효한 텍스트가 없거나 줄 번호가 로드된 자막과 일치하지 않습니다!",
    errorNoTranslation: "저장할 내용이 없습니다! 먼저 자막을 번역해 주세요.",
    errorNoSubtitleToSave: "저장할 자막이 로드되지 않았습니다!",
    errorApiNotAvailable: "LM Studio API를 사용할 수 없습니다. LM Studio가 백그라운드에서 실행 중인지 확인해 주세요.",
    errorRetranslation: "다시 번역하는 동안 오류가 발생했습니다!",
    errorLoadWorkFile: "작업 파일을 로드하는 동안 오류가 발생했습니다. 파일 형식을 확인해 주세요!",
    errorServerConnection: "LM Studio 서버에 연결할 수 없습니다"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ko;
} else {
    // For browser environment
    window.ko = ko;
}
