// Felhasználói felület fordításai
const uiTranslations = {
    // Magyar
    hu: {
        // Főcím
        appTitle: "SRT Felirat Fordító",
        
        // Fájl betöltés
        fileUploadTitle: "Feliratfájl betöltése",
        fileInputLabel: "Fájl kiválasztása",
        browseButton: "Tallózás...",
        noFileSelected: "Nincs kijelölve fájl",
        fileInfo: "sor",
        
        // Fordítási szabadságfok
        temperatureTitle: "Fordítási szabadságfok",
        temperatureAccurate: "Pontos",
        temperatureBalanced: "Kiegyensúlyozott",
        temperatureCreative: "Kreatív",
        
        // Nyelvek
        languageTitle: "Nyelvek",
        sourceLanguage: "Forrásnyelv",
        targetLanguage: "Célnyelv",
        
        // Gombok
        startTranslation: "Fordítás indítása",
        stopTranslation: "Fordítás megállítása",
        resetTranslation: "Reset",
        saveTranslation: "Fordítás mentése",
        saveWorkFile: "Munkafájl mentése",
        saveSourceBlock: "Forrás blokkmentése",
        
        // Táblázat
        originalSubtitle: "Eredeti felirat",
        translatedSubtitle: "Fordított szöveg",
        actions: "Műveletek",
        retranslate: "Újrafordítás",
        
        // Állapot
        translationProgress: "Fordítás állapota",
        translationComplete: "Fordítás befejezve",
        translationStopped: "Fordítás leállítva",
        
        // Sikeres műveletek
        successTranslation: "A fordítás sikeresen befejeződött!",
        successLoadWorkFile: "Munkafájl sikeresen betöltve! A fordítás folytatható.",
        successSaveWorkFile: "Munkafájl sikeresen elmentve!",
        
        // Hibaüzenetek
        errorNoFile: "Kérjük, válasszon ki egy fájlt!",
        errorTranslationRunning: "Kérjük, először állítsa le a fordítást, mielőtt új fájlt töltene be!",
        errorInvalidFile: "Csak .srt, .wrk vagy .mmm kiterjesztésű fájlokat lehet betölteni!",
        errorNoSubtitles: "A fájl nem tartalmaz érvényes feliratokat!",
        errorNoSrtFirst: "Először töltsön be egy .srt fájlt, mielőtt .mmm fájlt töltene be!",
        errorNoValidText: "A fájl nem tartalmaz érvényes szövegeket vagy a sorszámok nem egyeznek a betöltött feliratokkal!",
        errorNoTranslation: "Nincs mit menteni! Kérjük, először fordítsa le a feliratokat.",
        errorNoSubtitleToSave: "Nincs betöltött felirat a mentéshez!",
        errorApiNotAvailable: "Az LM Studio API nem érhető el. Kérjük, ellenőrizze, hogy fut-e az LM Studio a háttérben.",
        errorTranslation: "Hiba történt a fordítás során!",
        errorRetranslation: "Hiba történt az újrafordítás során!",
        errorLoadWorkFile: "Hiba történt a munkafájl betöltése során. Ellenőrizze a fájl formátumát!"
    },
    
    // English
    en: {
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
        
        // Languages
        languageTitle: "Languages",
        sourceLanguage: "Source Language",
        targetLanguage: "Target Language",
        
        // Buttons
        startTranslation: "Start Translation",
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
        
        // Success messages
        successTranslation: "Translation completed successfully!",
        successLoadWorkFile: "Work file loaded successfully! You can continue the translation.",
        successSaveWorkFile: "Work file saved successfully!",
        
        // Error messages
        errorNoFile: "Please select a file!",
        errorTranslationRunning: "Please stop the translation before loading a new file!",
        errorInvalidFile: "Only .srt, .wrk or .mmm files can be loaded!",
        errorNoSubtitles: "The file does not contain valid subtitles!",
        errorNoSrtFirst: "Please load an .srt file first before loading an .mmm file!",
        errorNoValidText: "The file does not contain valid texts or the line numbers do not match the loaded subtitles!",
        errorNoTranslation: "Nothing to save! Please translate the subtitles first.",
        errorNoSubtitleToSave: "No subtitles loaded to save!",
        errorApiNotAvailable: "LM Studio API is not available. Please check if LM Studio is running in the background.",
        errorTranslation: "An error occurred during translation!",
        errorRetranslation: "An error occurred during retranslation!",
        errorLoadWorkFile: "An error occurred while loading the work file. Please check the file format!"
    },
    
    // Deutsch
    de: {
        appTitle: "SRT Untertitel-Übersetzer",
        fileUploadTitle: "Untertiteldatei hochladen",
        fileInputLabel: "Datei auswählen",
        browseButton: "Durchsuchen...",
        noFileSelected: "Keine Datei ausgewählt",
        fileInfo: "Zeilen",
        temperatureTitle: "Übersetzungstemperatur",
        temperatureAccurate: "Genau",
        temperatureBalanced: "Ausgewogen",
        temperatureCreative: "Kreativ",
        languageTitle: "Sprachen",
        sourceLanguage: "Quellsprache",
        targetLanguage: "Zielsprache",
        startTranslation: "Übersetzung starten",
        stopTranslation: "Übersetzung stoppen",
        resetTranslation: "Zurücksetzen",
        saveTranslation: "Übersetzung speichern",
        saveWorkFile: "Arbeitsdatei speichern",
        originalSubtitle: "Originaler Untertitel",
        translatedSubtitle: "Übersetzter Text",
        actions: "Aktionen",
        retranslate: "Neu übersetzen",
        translationProgress: "Übersetzungsfortschritt",
        translationComplete: "Übersetzung abgeschlossen",
        translationStopped: "Übersetzung gestoppt",
        successTranslation: "Übersetzung erfolgreich abgeschlossen!",
        successLoadWorkFile: "Arbeitsdatei erfolgreich geladen! Sie können mit der Übersetzung fortfahren.",
        successSaveWorkFile: "Arbeitsdatei erfolgreich gespeichert!",
        errorNoFile: "Bitte wählen Sie eine Datei aus!",
        errorTranslationRunning: "Bitte stoppen Sie die Übersetzung, bevor Sie eine neue Datei laden!",
        errorInvalidFile: "Es können nur .srt, .wrk oder .mmm Dateien geladen werden!",
        errorNoSubtitles: "Die Datei enthält keine gültigen Untertitel!",
        errorNoSrtFirst: "Bitte laden Sie zuerst eine .srt-Datei, bevor Sie eine .mmm-Datei laden!",
        errorNoValidText: "Die Datei enthält keine gültigen Texte oder die Zeilennummern stimmen nicht mit den geladenen Untertiteln überein!",
        errorNoTranslation: "Nichts zu speichern! Bitte übersetzen Sie zuerst die Untertitel.",
        errorNoSubtitleToSave: "Keine Untertitel zum Speichern geladen!",
        errorApiNotAvailable: "LM Studio API ist nicht verfügbar. Bitte überprüfen Sie, ob LM Studio im Hintergrund läuft.",
        errorTranslation: "Bei der Übersetzung ist ein Fehler aufgetreten!",
        errorRetranslation: "Bei der Neuübersetzung ist ein Fehler aufgetreten!",
        errorLoadWorkFile: "Beim Laden der Arbeitsdatei ist ein Fehler aufgetreten. Bitte überprüfen Sie das Dateiformat!"
    },
    
    // Español
    es: {
        appTitle: "Traductor de Subtítulos SRT",
        fileUploadTitle: "Cargar archivo de subtítulos",
        fileInputLabel: "Seleccionar archivo",
        browseButton: "Examinar...",
        noFileSelected: "Ningún archivo seleccionado",
        fileInfo: "líneas",
        temperatureTitle: "Temperatura de traducción",
        temperatureAccurate: "Preciso",
        temperatureBalanced: "Equilibrado",
        temperatureCreative: "Creativo",
        languageTitle: "Idiomas",
        sourceLanguage: "Idioma de origen",
        targetLanguage: "Idioma de destino",
        startTranslation: "Iniciar traducción",
        stopTranslation: "Parar traducción",
        resetTranslation: "Reiniciar",
        saveTranslation: "Guardar traducción",
        saveWorkFile: "Guardar archivo de trabajo",
        originalSubtitle: "Subtítulo original",
        translatedSubtitle: "Texto traducido",
        actions: "Acciones",
        retranslate: "Retraducir",
        translationProgress: "Progreso de la traducción",
        translationComplete: "Traducción concluida",
        translationStopped: "Traducción interrumpida",
        successTranslation: "¡Traducción concluida con éxito!",
        successLoadWorkFile: "¡Archivo de trabajo cargado con éxito! Puede continuar con la traducción.",
        successSaveWorkFile: "¡Archivo de trabajo guardado con éxito!",
        errorNoFile: "¡Por favor, seleccione un archivo!",
        errorTranslationRunning: "¡Por favor, pare la traducción antes de cargar un nuevo archivo!",
        errorInvalidFile: "¡Solo se pueden cargar archivos .srt, .wrk o .mmm!",
        errorNoSubtitles: "¡El archivo no contiene subtítulos válidos!",
        errorNoSrtFirst: "¡Por favor, cargue primero un archivo .srt antes de cargar un archivo .mmm!",
        errorNoValidText: "¡El archivo no contiene textos válidos o los números de línea no coinciden con los subtítulos cargados!",
        errorNoTranslation: "¡Nada que guardar! Por favor, traduzca los subtítulos primero.",
        errorNoSubtitleToSave: "¡No hay subtítulos cargados para guardar!",
        errorApiNotAvailable: "La API de LM Studio no está disponible. Por favor, compruebe si LM Studio está ejecutándose en segundo plano.",
        errorTranslation: "¡Se produjo un error durante la traducción!",
        errorRetranslation: "¡Se produjo un error durante la retraducción!",
        errorLoadWorkFile: "¡Se produjo un error al cargar el archivo de trabajo. Por favor, compruebe el formato del archivo!"
    },
    
    // Francia fordítás
    fr: {
        // Applikáció címe
        appTitle: "Traducteur de Sous-titres SRT",

        // Kártya címek
        fileUploadTitle: "Charger un fichier de sous-titres",
        temperatureTitle: "Liberté de traduction",
        languageTitle: "Langues",

        // Hőmérséklet leírások
        temperatureAccurate: "Précis",
        temperatureBalanced: "Équilibré",
        temperatureCreative: "Créatif",

        // Nyelv címkék
        sourceLanguage: "Langue source",
        targetLanguage: "Langue cible",

        // Gombok
        startTranslation: "Démarrer la traduction",
        stopTranslation: "Arrêter la traduction",
        resetTranslation: "Réinitialiser",
        saveTranslation: "Enregistrer la traduction",
        saveWorkFile: "Enregistrer le fichier de travail",

        // Táblázat fejlécek
        originalSubtitle: "Texte original",
        translatedSubtitle: "Texte traduit",
        actions: "Actions",

        // Újrafordítás gomb
        retranslate: "Retraduire",

        // Értesítések
        translationComplete: "Traduction terminée",
        translationStopped: "Traduction arrêtée",
        translationReset: "Traduction réinitialisée",
        translationSaved: "Traduction enregistrée",
        workFileSaved: "Fichier de travail enregistré",

        // Egyéb üzenetek
        fileInfo: "lignes",
        fileInputLabel: "Choisir un fichier",
        dragDropText: "ou déposez un fichier ici",

        // Hibaüzenetek
        errorFileLoad: "Erreur de chargement du fichier",
        errorTranslation: "Erreur lors de la traduction",
        errorSave: "Erreur d'enregistrement du fichier",
        errorNoFile: "Veuillez d'abord sélectionner un fichier",
        errorInvalidFile: "Format de fichier invalide",
        errorServerConnection: "Impossible de se connecter au serveur LM Studio"
    },

    // Olasz fordítás
    it: {
        // Applikáció címe
        appTitle: "Traduttore di Sottotitoli SRT",

        // Kártya címek
        fileUploadTitle: "Carica file sottotitoli",
        temperatureTitle: "Libertà di traduzione",
        languageTitle: "Lingue",

        // Hőmérséklet leírások
        temperatureAccurate: "Preciso",
        temperatureBalanced: "Bilanciato",
        temperatureCreative: "Creativo",

        // Nyelv címkék
        sourceLanguage: "Lingua di origine",
        targetLanguage: "Lingua di destinazione",

        // Gombok
        startTranslation: "Avvia traduzione",
        stopTranslation: "Ferma traduzione",
        resetTranslation: "Reimposta",
        saveTranslation: "Salva traduzione",
        saveWorkFile: "Salva file di lavoro",

        // Táblázat fejlécek
        originalSubtitle: "Testo originale",
        translatedSubtitle: "Testo tradotto",
        actions: "Azioni",

        // Újrafordítás gomb
        retranslate: "Ritradurre",

        // Értesítések
        translationComplete: "Traduzione completata",
        translationStopped: "Traduzione interrotta",
        translationReset: "Traduzione reimpostata",
        translationSaved: "Traduzione salvata",
        workFileSaved: "File di lavoro salvato",

        // Egyéb üzenetek
        fileInfo: "righe",
        fileInputLabel: "Scegli un file",
        dragDropText: "o trascina un file qui",

        // Hibaüzenetek
        errorFileLoad: "Errore durante il caricamento del file",
        errorTranslation: "Errore durante la traduzione",
        errorSave: "Errore durante il salvataggio del file",
        errorNoFile: "Si prega di selezionare un file prima",
        errorInvalidFile: "Formato file non valido",
        errorServerConnection: "Impossibile connettersi al server LM Studio"
    },

    // Portugál fordítás
    pt: {
        // Applikáció címe
        appTitle: "Tradutor de Legendas SRT",

        // Kártya címek
        fileUploadTitle: "Carregar arquivo de legendas",
        temperatureTitle: "Liberdade de tradução",
        languageTitle: "Idiomas",

        // Hőmérséklet leírások
        temperatureAccurate: "Preciso",
        temperatureBalanced: "Equilibrado",
        temperatureCreative: "Criativo",

        // Nyelv címkék
        sourceLanguage: "Idioma de origem",
        targetLanguage: "Idioma de destino",

        // Gombok
        startTranslation: "Iniciar tradução",
        stopTranslation: "Parar tradução",
        resetTranslation: "Reiniciar",
        saveTranslation: "Salvar tradução",
        saveWorkFile: "Salvar arquivo de trabalho",

        // Táblázat fejlécek
        originalSubtitle: "Texto original",
        translatedSubtitle: "Texto traduzido",
        actions: "Ações",

        // Újrafordítás gomb
        retranslate: "Retraduzir",

        // Értesítések
        translationComplete: "Tradução concluída",
        translationStopped: "Tradução interrompida",
        translationReset: "Tradução reiniciada",
        translationSaved: "Tradução salva",
        workFileSaved: "Arquivo de trabalho salvo",

        // Egyéb üzenetek
        fileInfo: "linhas",
        fileInputLabel: "Escolher arquivo",
        dragDropText: "ou arraste um arquivo aqui",

        // Hibaüzenetek
        errorFileLoad: "Erro ao carregar arquivo",
        errorTranslation: "Erro durante a tradução",
        errorSave: "Erro ao salvar arquivo",
        errorNoFile: "Por favor, selecione um arquivo primeiro",
        errorInvalidFile: "Formato de arquivo inválido",
        errorServerConnection: "Não foi possível conectar ao servidor LM Studio"
    }
};
