
( function ( $ ) {
	'use strict';

	$.extend( $.ime.sources, {
		'ipa-sil': {
			name: 'International Phonetic Alphabet - SIL',
			source: 'fonipa/ipa-sil.js'
		},
		'te-transliteration': {
			name: 'లిప్యంతరీకరణ',
			source: 'te/te-transliteration.js'
		}
	} );

	$.extend( $.ime.languages, {
		en: {
			autonym: 'English',
			inputmethods: [ 'ipa-sil']
		},
		te: {
			autonym: 'తెలుగు',
			inputmethods: [ 'te-transliteration']
		}
	} );

}( jQuery ) );
