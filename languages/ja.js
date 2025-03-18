// 日本語 language file
const ja = {
    // Main title
    appTitle: "SRT字幕翻訳ツール",
    
    // File upload
    fileUploadTitle: "字幕ファイルのアップロード",
    fileInputLabel: "ファイルを選択",
    browseButton: "参照...",
    noFileSelected: "ファイルが選択されていません",
    fileInfo: "行",
    
    // Translation temperature
    temperatureTitle: "翻訳の自由度",
    temperatureAccurate: "正確",
    temperatureBalanced: "バランス",
    temperatureCreative: "創造的",
    
    // Translation mode and API key
    languageTitle: "翻訳モード",
    translationModeTitle: "翻訳モード",
    apiKeyLabel: "APIキー",
    showApiKeyButton: "表示",
    sourceLanguage: "原語",
    targetLanguage: "対象言語",
    
    // Buttons
    startTranslation: "翻訳開始",
    continueTranslation: "翻訳を続ける",
    stopTranslation: "翻訳停止",
    resetTranslation: "リセット",
    saveTranslation: "翻訳を保存",
    saveWorkFile: "作業ファイルを保存",
    saveSourceBlock: "ソースブロックを保存",
    
    // Table
    originalSubtitle: "原文字幕",
    translatedSubtitle: "翻訳されたテキスト",
    actions: "アクション",
    retranslate: "再翻訳",
    
    // Status
    translationProgress: "翻訳の進行状況",
    translationComplete: "翻訳完了",
    translationStopped: "翻訳停止",
    translationReset: "翻訳リセット",
    translationSaved: "翻訳保存済み",
    workFileSaved: "作業ファイル保存済み",
    
    // Success messages
    successTranslation: "翻訳が正常に完了しました！",
    translationCompleted: "翻訳が正常に完了しました！",
    successLoadWorkFile: "作業ファイルが正常に読み込まれました！翻訳を続行できます。",
    successSaveWorkFile: "作業ファイルが正常に保存されました！",
    
    // Error messages
    errorFileLoad: "ファイル読み込み中にエラーが発生しました",
    errorTranslation: "翻訳中にエラーが発生しました！",
    errorSave: "ファイル保存中にエラーが発生しました",
    errorNoFile: "ファイルを選択してください！",
    errorTranslationRunning: "新しいファイルを読み込む前に翻訳を停止してください！",
    errorInvalidFile: ".srt、.wrkまたは.mmmファイルのみ読み込むことができます！",
    errorNoSubtitles: "ファイルに有効な字幕が含まれていません！",
    errorNoSrtFirst: ".mmmファイルを読み込む前に.srtファイルを読み込んでください！",
    errorNoValidText: "ファイルに有効なテキストが含まれていないか、行番号が読み込まれた字幕と一致しません！",
    errorNoTranslation: "保存するものがありません！まず字幕を翻訳してください。",
    errorNoSubtitleToSave: "保存する字幕がロードされていません！",
    errorApiNotAvailable: "LM Studio APIが利用できません。LM Studioがバックグラウンドで実行されているか確認してください。",
    errorRetranslation: "再翻訳中にエラーが発生しました！",
    errorLoadWorkFile: "作業ファイルの読み込み中にエラーが発生しました。ファイル形式を確認してください！",
    errorServerConnection: "LM Studioサーバーに接続できませんでした"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ja;
} else {
    // For browser environment
    window.ja = ja;
}
