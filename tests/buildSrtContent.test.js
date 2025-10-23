const assert = require('node:assert/strict');
const { buildSrtContent } = require('../js/exportUtils.js');

function normalizeNewlines(value) {
    return value.replace(/\r\n/g, '\n');
}

(function testTranslationsOnly() {
    const subtitles = [
        { number: 1, timecode: '00:00:01,000 --> 00:00:04,000', text: 'Hello world' },
        { number: 2, timecode: '00:00:05,000 --> 00:00:07,000', text: 'Second line' },
    ];
    const translations = ['Hola mundo', 'Segunda línea'];

    const result = normalizeNewlines(buildSrtContent({ subtitles, translations }));
    const expected = [
        '1',
        '00:00:01,000 --> 00:00:04,000',
        'Hola mundo',
        '',
        '2',
        '00:00:05,000 --> 00:00:07,000',
        'Segunda línea',
        '',
    ].join('\n');

    assert.equal(result, expected);
})();

(function testBilingualOutput() {
    const subtitles = [
        { number: 3, timecode: '00:00:08,000 --> 00:00:11,000', text: 'Line A\nLine B' },
        { number: 4, timecode: '00:00:12,000 --> 00:00:15,000', text: 'Single line' },
    ];
    const translations = ['Linea A\nLinea B', 'Línea única'];

    const result = normalizeNewlines(
        buildSrtContent({ subtitles, translations, exportFormat: 'bilingual' })
    );

    const expected = [
        '3',
        '00:00:08,000 --> 00:00:11,000',
        'Line A\nLine B',
        'Linea A\nLinea B',
        '',
        '4',
        '00:00:12,000 --> 00:00:15,000',
        'Single line',
        'Línea única',
        '',
    ].join('\n');

    assert.equal(result, expected);
})();

(function testSkipsEmptyOriginalInBilingual() {
    const subtitles = [
        { number: 5, timecode: '00:00:16,000 --> 00:00:18,000', text: '   ' },
    ];
    const translations = ['Only translation'];

    const result = normalizeNewlines(
        buildSrtContent({ subtitles, translations, exportFormat: 'bilingual' })
    );

    const expected = ['5', '00:00:16,000 --> 00:00:18,000', 'Only translation', ''].join('\n');

    assert.equal(result, expected);
})();

(function testInputValidation() {
    assert.throws(() => buildSrtContent({ subtitles: null, translations: [] }), /subtitles/);
    assert.throws(() => buildSrtContent({ subtitles: [], translations: null }), /translations/);
})();

console.log('buildSrtContent tests passed');
