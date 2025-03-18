// Tiếng Việt language file
const vi = {
    // Main title
    appTitle: "Trình Dịch Phụ Đề SRT",
    
    // File upload
    fileUploadTitle: "Tải lên tệp phụ đề",
    fileInputLabel: "Chọn tệp",
    browseButton: "Duyệt...",
    noFileSelected: "Chưa chọn tệp nào",
    fileInfo: "dòng",
    
    // Translation temperature
    temperatureTitle: "Mức độ tự do dịch",
    temperatureAccurate: "Chính xác",
    temperatureBalanced: "Cân bằng",
    temperatureCreative: "Sáng tạo",
    
    // Translation mode and API key
    languageTitle: "Chế độ dịch",
    translationModeTitle: "Chế độ dịch",
    apiKeyLabel: "Khóa API",
    showApiKeyButton: "Hiển thị",
    sourceLanguage: "Ngôn ngữ nguồn",
    targetLanguage: "Ngôn ngữ đích",
    
    // Buttons
    startTranslation: "Bắt đầu dịch",
    continueTranslation: "Tiếp tục dịch",
    stopTranslation: "Dừng dịch",
    resetTranslation: "Đặt lại",
    saveTranslation: "Lưu bản dịch",
    saveWorkFile: "Lưu tệp công việc",
    saveSourceBlock: "Lưu khối nguồn",
    
    // Table
    originalSubtitle: "Phụ đề gốc",
    translatedSubtitle: "Văn bản đã dịch",
    actions: "Hành động",
    retranslate: "Dịch lại",
    
    // Status
    translationProgress: "Tiến độ dịch",
    translationComplete: "Dịch hoàn thành",
    translationStopped: "Đã dừng dịch",
    translationReset: "Đã đặt lại bản dịch",
    translationSaved: "Đã lưu bản dịch",
    workFileSaved: "Đã lưu tệp công việc",
    
    // Success messages
    successTranslation: "Dịch hoàn thành thành công!",
    translationCompleted: "Dịch hoàn thành thành công!",
    successLoadWorkFile: "Đã tải tệp công việc thành công! Bạn có thể tiếp tục dịch.",
    successSaveWorkFile: "Đã lưu tệp công việc thành công!",
    
    // Error messages
    errorFileLoad: "Lỗi khi tải tệp",
    errorTranslation: "Đã xảy ra lỗi trong quá trình dịch!",
    errorSave: "Lỗi khi lưu tệp",
    errorNoFile: "Vui lòng chọn một tệp!",
    errorTranslationRunning: "Vui lòng dừng dịch trước khi tải tệp mới!",
    errorInvalidFile: "Chỉ có thể tải các tệp .srt, .wrk hoặc .mmm!",
    errorNoSubtitles: "Tệp không chứa phụ đề hợp lệ!",
    errorNoSrtFirst: "Vui lòng tải tệp .srt trước khi tải tệp .mmm!",
    errorNoValidText: "Tệp không chứa văn bản hợp lệ hoặc số dòng không khớp với phụ đề đã tải!",
    errorNoTranslation: "Không có gì để lưu! Vui lòng dịch phụ đề trước.",
    errorNoSubtitleToSave: "Không có phụ đề nào được tải để lưu!",
    errorApiNotAvailable: "API LM Studio không khả dụng. Vui lòng kiểm tra xem LM Studio có đang chạy trong nền không.",
    errorRetranslation: "Đã xảy ra lỗi trong quá trình dịch lại!",
    errorLoadWorkFile: "Đã xảy ra lỗi khi tải tệp công việc. Vui lòng kiểm tra định dạng tệp!",
    errorServerConnection: "Không thể kết nối đến máy chủ LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vi;
} else {
    // For browser environment
    window.vi = vi;
}
