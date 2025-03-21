// العربية language file
const ar = {
    // Main title
    appTitle: "مترجم ترجمات SRT",
    
    // File upload
    fileUploadTitle: "تحميل ملف الترجمة",
    fileInputLabel: "اختر ملفًا",
    browseButton: "تصفح...",
    noFileSelected: "لم يتم اختيار ملف",
    fileInfo: "سطر",
    
    // Translation temperature
    temperatureTitle: "درجة حرية الترجمة",
    temperatureAccurate: "دقيقة",
    temperatureBalanced: "متوازنة",
    temperatureCreative: "إبداعية",
    
    // Translation mode and API key
    languageTitle: "الترجمة",
    translationModeTitle: "وضع الترجمة",
    apiKeyLabel: "مفتاح API",
    showApiKeyButton: "عرض",
    sourceLanguage: "اللغة المصدر",
    targetLanguage: "اللغة الهدف",
    
    // Buttons
    startTranslation: "بدء الترجمة",
    continueTranslation: "متابعة الترجمة",
    stopTranslation: "إيقاف الترجمة",
    resetTranslation: "إعادة ضبط",
    saveTranslation: "حفظ الترجمة",
    saveWorkFile: "حفظ ملف العمل",
    saveSourceBlock: "حفظ كتلة المصدر",
    
    // Table
    originalSubtitle: "الترجمة الأصلية",
    translatedSubtitle: "النص المترجم",
    actions: "الإجراءات",
    retranslate: "إعادة الترجمة",
    
    // Status
    translationProgress: "تقدم الترجمة",
    translationComplete: "اكتملت الترجمة",
    translationStopped: "توقفت الترجمة",
    translationReset: "تمت إعادة ضبط الترجمة",
    translationSaved: "تم حفظ الترجمة",
    workFileSaved: "تم حفظ ملف العمل",
    
    // Success messages
    successTranslation: "تمت الترجمة بنجاح!",
    translationCompleted: "تمت الترجمة بنجاح!",
    successLoadWorkFile: "تم تحميل ملف العمل بنجاح! يمكنك متابعة الترجمة.",
    successSaveWorkFile: "تم حفظ ملف العمل بنجاح!",
    
    // Error messages
    errorFileLoad: "خطأ في تحميل الملف",
    errorTranslation: "حدث خطأ أثناء الترجمة!",
    errorSave: "خطأ في حفظ الملف",
    errorNoFile: "الرجاء اختيار ملف!",
    errorTranslationRunning: "الرجاء إيقاف الترجمة قبل تحميل ملف جديد!",
    errorInvalidFile: "يمكن تحميل ملفات .srt أو .wrk أو .mmm فقط!",
    errorNoSubtitles: "الملف لا يحتوي على ترجمات صالحة!",
    errorNoSrtFirst: "الرجاء تحميل ملف .srt أولاً قبل تحميل ملف .mmm!",
    errorNoValidText: "الملف لا يحتوي على نصوص صالحة أو أرقام الأسطر لا تتطابق مع الترجمات المحملة!",
    errorNoTranslation: "لا يوجد شيء للحفظ! الرجاء ترجمة الترجمات أولاً.",
    errorNoSubtitleToSave: "لا توجد ترجمات محملة للحفظ!",
    errorApiNotAvailable: "واجهة برمجة تطبيقات LM Studio غير متاحة. يرجى التحقق من تشغيل LM Studio في الخلفية.",
    errorRetranslation: "حدث خطأ أثناء إعادة الترجمة!",
    errorLoadWorkFile: "حدث خطأ أثناء تحميل ملف العمل. يرجى التحقق من تنسيق الملف!",
    errorServerConnection: "تعذر الاتصال بخادم LM Studio"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ar;
} else {
    // For browser environment
    window.ar = ar;
}
