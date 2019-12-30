( function ( $ ) {
	'use strict';

	$.extend( $.ime.sources, {
		'ipa-sil': {
			name: 'International Phonetic Alphabet - SIL',
			source: 'kaagitam.in/rules/fonipa/ipa-sil.js'
		},
		'te-transliteration': {
			name: 'లిప్యంతరీకరణ',
			source: 'kaagitam.in/rules/te/te-transliteration.js'
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
