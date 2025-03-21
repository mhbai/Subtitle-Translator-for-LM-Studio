// Português language file
const pt = {
    // Main title
    appTitle: "Tradutor de Legendas SRT",
    
    // File upload
    fileUploadTitle: "Carregar Arquivo de Legendas",
    fileInputLabel: "Escolher Arquivo",
    browseButton: "Navegar...",
    noFileSelected: "Nenhum arquivo selecionado",
    fileInfo: "linhas",
    
    // Translation temperature
    temperatureTitle: "Temperatura de Tradução",
    temperatureAccurate: "Preciso",
    temperatureBalanced: "Equilibrado",
    temperatureCreative: "Criativo",
    
    // Translation mode and API key
    languageTitle: "Tradução",
    translationModeTitle: "Modo de tradução",
    apiKeyLabel: "Chave API",
    showApiKeyButton: "Mostrar",
    sourceLanguage: "Idioma de Origem",
    targetLanguage: "Idioma de Destino",
    
    // Buttons
    startTranslation: "Iniciar Tradução",
    continueTranslation: "Continuar Tradução",
    stopTranslation: "Parar Tradução",
    resetTranslation: "Reiniciar",
    saveTranslation: "Salvar Tradução",
    saveWorkFile: "Salvar Arquivo de Trabalho",
    saveSourceBlock: "Salvar Bloco de Origem",
    
    // Table
    originalSubtitle: "Legenda Original",
    translatedSubtitle: "Texto Traduzido",
    actions: "Ações",
    retranslate: "Retraduzir",
    
    // Status
    translationProgress: "Progresso da Tradução",
    translationComplete: "Tradução Concluída",
    translationStopped: "Tradução Interrompida",
    translationReset: "Tradução Reiniciada",
    translationSaved: "Tradução Salva",
    workFileSaved: "Arquivo de Trabalho Salvo",
    
    // Success messages
    successTranslation: "Tradução concluída com sucesso!",
    translationCompleted: "Tradução concluída com sucesso!",
    successLoadWorkFile: "Arquivo de trabalho carregado com sucesso! Você pode continuar a tradução.",
    successSaveWorkFile: "Arquivo de trabalho salvo com sucesso!",
    
    // Error messages
    errorFileLoad: "Erro ao carregar o arquivo",
    errorTranslation: "Ocorreu um erro durante a tradução!",
    errorSave: "Erro ao salvar o arquivo",
    errorNoFile: "Por favor, selecione um arquivo!",
    errorTranslationRunning: "Por favor, pare a tradução antes de carregar um novo arquivo!",
    errorInvalidFile: "Apenas arquivos .srt, .wrk ou .mmm podem ser carregados!",
    errorNoSubtitles: "O arquivo não contém legendas válidas!",
    errorNoSrtFirst: "Por favor, carregue um arquivo .srt primeiro antes de carregar um arquivo .mmm!",
    errorNoValidText: "O arquivo não contém textos válidos ou os números de linha não correspondem às legendas carregadas!",
    errorNoTranslation: "Nada para salvar! Por favor, traduza as legendas primeiro.",
    errorNoSubtitleToSave: "Nenhuma legenda carregada para salvar!",
    errorApiNotAvailable: "A API do LM Studio não está disponível. Verifique se o LM Studio está sendo executado em segundo plano.",
    errorRetranslation: "Ocorreu um erro durante a retradução!",
    errorLoadWorkFile: "Ocorreu um erro ao carregar o arquivo de trabalho. Verifique o formato do arquivo!",
    errorServerConnection: "Não foi possível conectar ao servidor LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pt;
} else {
    // For browser environment
    window.pt = pt;
}
