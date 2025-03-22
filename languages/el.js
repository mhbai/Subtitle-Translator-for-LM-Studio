// Ελληνικά language file
const el = {
    // Main title
    appTitle: "Μεταφραστής Υποτίτλων SRT",
    
    // File upload
    fileUploadTitle: "Μεταφόρτωση αρχείου υποτίτλων",
    fileInputLabel: "Επιλογή αρχείου",
    browseButton: "Αναζήτηση...",
    noFileSelected: "Δεν έχει επιλεγεί αρχείο",
    fileInfo: "γραμμές",
    
    // Translation temperature
    temperatureTitle: "Ελευθερία μετάφρασης",
    temperatureAccurate: "Ακριβής",
    temperatureBalanced: "Ισορροπημένη",
    temperatureCreative: "Δημιουργική",
    
    // Translation mode and API key
    languageTitle: "Μετάφραση",
    translationModeTitle: "Λειτουργία μετάφρασης",
    apiKeyLabel: "Κλειδί API",
    showApiKeyButton: "Εμφάνιση",
    sourceLanguage: "Γλώσσα προέλευσης",
    targetLanguage: "Γλώσσα στόχου",
    
    // Buttons
    startTranslation: "Έναρξη μετάφρασης",
    continueTranslation: "Συνέχιση μετάφρασης",
    stopTranslation: "Διακοπή μετάφρασης",
    resetTranslation: "Επαναφορά",
    saveTranslation: "Αποθήκευση μετάφρασης",
    saveWorkFile: "Αποθήκευση αρχείου εργασίας",
    saveSourceBlock: "Αποθήκευση μπλοκ προέλευσης",
    
    // Table
    originalSubtitle: "Αρχικός υπότιτλος",
    translatedSubtitle: "Μεταφρασμένο κείμενο",
    actions: "Ενέργειες",
    retranslate: "Επαναμετάφραση",
    
    // Status
    translationProgress: "Πρόοδος μετάφρασης",
    translationComplete: "Ολοκλήρωση μετάφρασης",
    translationStopped: "Η μετάφραση διακόπηκε",
    translationReset: "Η μετάφραση επαναφέρθηκε",
    translationSaved: "Η μετάφραση αποθηκεύτηκε",
    workFileSaved: "Το αρχείο εργασίας αποθηκεύτηκε",
    
    // Success messages
    successTranslation: "Η μετάφραση ολοκληρώθηκε με επιτυχία!",
    translationCompleted: "Η μετάφραση ολοκληρώθηκε με επιτυχία!",
    successLoadWorkFile: "Το αρχείο εργασίας φορτώθηκε με επιτυχία! Μπορείτε να συνεχίσετε τη μετάφραση.",
    successSaveWorkFile: "Το αρχείο εργασίας αποθηκεύτηκε με επιτυχία!",
    
    // Error messages
    errorFileLoad: "Σφάλμα κατά τη φόρτωση του αρχείου",
    errorTranslation: "Παρουσιάστηκε σφάλμα κατά τη μετάφραση!",
    errorSave: "Σφάλμα κατά την αποθήκευση του αρχείου",
    errorNoFile: "Παρακαλώ επιλέξτε ένα αρχείο!",
    errorTranslationRunning: "Παρακαλώ διακόψτε τη μετάφραση πριν φορτώσετε νέο αρχείο!",
    errorInvalidFile: "Μόνο αρχεία .srt, .wrk ή .mmm μπορούν να φορτωθούν!",
    errorNoSubtitles: "Το αρχείο δεν περιέχει έγκυρους υπότιτλους!",
    errorNoSrtFirst: "Παρακαλώ φορτώστε πρώτα ένα αρχείο .srt πριν φορτώσετε ένα αρχείο .mmm!",
    errorNoValidText: "Το αρχείο δεν περιέχει έγκυρο κείμενο ή οι αριθμοί γραμμών δεν ταιριάζουν με τους φορτωμένους υπότιτλους!",
    errorNoTranslation: "Δεν υπάρχει τίποτα για αποθήκευση! Παρακαλώ μεταφράστε πρώτα τους υπότιτλους.",
    errorNoSubtitleToSave: "Δεν υπάρχουν φορτωμένοι υπότιτλοι για αποθήκευση!",
    errorApiNotAvailable: "Το API του LM Studio δεν είναι διαθέσιμο. Παρακαλώ ελέγξτε αν το LM Studio εκτελείται στο παρασκήνιο.",
    errorRetranslation: "Παρουσιάστηκε σφάλμα κατά την επαναμετάφραση!",
    errorLoadWorkFile: "Παρουσιάστηκε σφάλμα κατά τη φόρτωση του αρχείου εργασίας. Παρακαλώ ελέγξτε τη μορφή του αρχείου!",
    errorServerConnection: "Δεν είναι δυνατή η σύνδεση με τον διακομιστή LM Studio",
    
    // Κείμενα κινούμενης εικόνας φόρτωσης
    loadingGeneral: "Φόρτωση...",
    loadingFileProcessing: "Επεξεργασία αρχείου...",
    loadingTablePopulation: "Συμπλήρωση πίνακα...",
    loadingWorkFileProcessing: "Επεξεργασία αρχείου εργασίας...",
    loadingMmmFileProcessing: "Επεξεργασία αρχείου MMM...",
    loadingTranslation: "Μετάφραση...",
    loadingClickToClose: "Κάντε κλικ οπουδήποτε έξω για να κλείσετε",
    loadingBatchTranslation: "Μαζική μετάφραση σε εξέλιξη...",
    
    // Μηνύματα σφάλματος για λειτουργία μαζικής μετάφρασης
    errorNumberingRetry: "Σφάλμα αρίθμησης, επανάληψη προσπάθειας ({0}/{1})...",
    errorRateLimitExceeded: "Υπέρβαση ορίου ρυθμού API, αναμονή 10 δευτερολέπτων...",
    errorTranslationRetry: "Σφάλμα μετάφρασης, επανάληψη προσπάθειας ({0}/{1})...",
    errorTranslationFailed: "Η μετάφραση απέτυχε μετά από {0} προσπάθειες, συνέχεια...",
    
    // Ειδική λειτουργία μετάφρασης
    batchModeLabel: "Ειδική λειτουργία μετάφρασης μεγάλου πλαισίου"
};

// Export the language object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = el;
} else {
    // For browser environment
    window.el = el;
}
