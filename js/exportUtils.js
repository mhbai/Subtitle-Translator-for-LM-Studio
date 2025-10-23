(function (globalScope) {
    'use strict';

    function ensureArray(value, name) {
        if (!Array.isArray(value)) {
            throw new Error(`${name} must be an array`);
        }
        return value;
    }

    function normalizeNumber(subtitle, index) {
        if (subtitle && subtitle.number !== undefined && subtitle.number !== null) {
            const number = String(subtitle.number).trim();
            if (number.length > 0) {
                return number;
            }
        }
        return String(index + 1);
    }

    function normalizeTimecode(subtitle) {
        if (subtitle && typeof subtitle.timecode === 'string') {
            return subtitle.timecode;
        }
        return '';
    }

    function normalizeOriginalText(subtitle) {
        if (subtitle && typeof subtitle.text === 'string') {
            return subtitle.text;
        }
        return '';
    }

    function normalizeTranslation(translations, index) {
        const value = translations[index];
        if (typeof value === 'string') {
            return value;
        }
        if (value === undefined || value === null) {
            return '';
        }
        return String(value);
    }

    function buildSrtContent({ subtitles = [], translations = [], exportFormat = 'translated-only' } = {}) {
        ensureArray(subtitles, 'subtitles');
        ensureArray(translations, 'translations');

        const lines = [];

        subtitles.forEach((subtitle, index) => {
            const subtitleNumber = normalizeNumber(subtitle, index);
            const timecode = normalizeTimecode(subtitle);
            const originalText = normalizeOriginalText(subtitle);
            const translatedText = normalizeTranslation(translations, index);

            lines.push(subtitleNumber);
            lines.push(timecode);

            if (exportFormat === 'bilingual' && originalText.trim().length > 0) {
                lines.push(originalText);
            }

            lines.push(translatedText);
            lines.push('');
        });

        return lines.join('\n');
    }

    globalScope.buildSrtContent = buildSrtContent;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { buildSrtContent };
    }
})(typeof window !== 'undefined' ? window : globalThis);
