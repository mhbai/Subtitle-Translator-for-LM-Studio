// 中文 language file
const zh = {
    // Main title
    appTitle: "SRT字幕翻译器",
    
    // File upload
    fileUploadTitle: "上传字幕文件",
    fileInputLabel: "选择文件",
    browseButton: "浏览...",
    noFileSelected: "未选择文件",
    fileInfo: "行",
    
    // Translation temperature
    temperatureTitle: "翻译自由度",
    temperatureAccurate: "精确",
    temperatureBalanced: "平衡",
    temperatureCreative: "创意",
    
    // Translation mode and API key
    languageTitle: "翻译",
    translationModeTitle: "翻译模式",
    apiKeyLabel: "API密钥",
    showApiKeyButton: "显示",
    sourceLanguage: "源语言",
    targetLanguage: "目标语言",
    
    // Buttons
    startTranslation: "开始翻译",
    continueTranslation: "继续翻译",
    stopTranslation: "停止翻译",
    resetTranslation: "重置",
    saveTranslation: "保存翻译",
    saveWorkFile: "保存工作文件",
    saveSourceBlock: "保存源块",
    
    // Table
    originalSubtitle: "原始字幕",
    translatedSubtitle: "翻译文本",
    actions: "操作",
    retranslate: "重新翻译",
    
    // Status
    translationProgress: "翻译进度",
    translationComplete: "翻译完成",
    translationStopped: "翻译已停止",
    translationReset: "翻译已重置",
    translationSaved: "翻译已保存",
    workFileSaved: "工作文件已保存",
    
    // Success messages
    successTranslation: "翻译成功完成！",
    translationCompleted: "翻译成功完成！",
    successLoadWorkFile: "工作文件成功加载！您可以继续翻译。",
    successSaveWorkFile: "工作文件成功保存！",
    
    // Error messages
    errorFileLoad: "加载文件时出错",
    errorTranslation: "翻译过程中发生错误！",
    errorSave: "保存文件时出错",
    errorNoFile: "请选择一个文件！",
    errorTranslationRunning: "请在加载新文件前停止翻译！",
    errorInvalidFile: "只能加载.srt、.wrk或.mmm文件！",
    errorNoSubtitles: "文件不包含有效字幕！",
    errorNoSrtFirst: "请先加载.srt文件，然后再加载.mmm文件！",
    errorNoValidText: "文件不包含有效文本或行号与加载的字幕不匹配！",
    errorNoTranslation: "没有可保存的内容！请先翻译字幕。",
    errorNoSubtitleToSave: "没有加载字幕可供保存！",
    errorApiNotAvailable: "LM Studio API不可用。请检查LM Studio是否在后台运行。",
    errorRetranslation: "重新翻译过程中发生错误！",
    errorLoadWorkFile: "加载工作文件时发生错误。请检查文件格式！",
    errorServerConnection: "无法连接到LM Studio服务器",
    
    // 加载动画文本
    loadingGeneral: "加载中...",
    loadingFileProcessing: "文件处理中...",
    loadingTablePopulation: "填充表格中...",
    loadingWorkFileProcessing: "工作文件处理中...",
    loadingMmmFileProcessing: "MMM文件处理中...",
    loadingTranslation: "翻译中...",
    loadingClickToClose: "点击外部任意位置关闭",
    loadingBatchTranslation: "批量翻译进行中...",
    
    // 批量翻译模式错误消息
    errorNumberingRetry: "编号错误，重试中 ({0}/{1})...",
    errorRateLimitExceeded: "API速率限制超出，等待10秒...",
    errorTranslationRetry: "翻译错误，重试中 ({0}/{1})...",
    errorTranslationFailed: "经过{0}次尝试后翻译失败，继续进行...",
    
    // 特殊翻译模式
    batchModeLabel: "特殊大上下文翻译模式"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = zh;
} else {
    // For browser environment
    window.zh = zh;
}
