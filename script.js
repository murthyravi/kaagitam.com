var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs');
$(document).ready(function () {
	'use strict';
	var $ced,
	ime,
	$imeSelector,
	$langSelector;
	const remote = require('electron').remote, 
    app = remote.require('electron').app;

	var basepath = app.getAppPath();
	$.ime.setPath(basepath + "/rules/");
	$ced = $('#ced');
	// Initialise IME on this element
	$ced.ime({
		showSelector: false
	});
	// Get the IME object
	ime = $ced.data('ime');
	ime.enable();
	$('#bold').click(function () {
		document.execCommand('bold', false, null);
	});

	$('#italic').click(function () {
		document.execCommand('italic', false, null);
	});

	$('#underline').click(function () {
		document.execCommand('underline', false, null);
	});

	// language and input method list box widgets
	$langSelector = $('select#language');
	$imeSelector = $('select#imeSelector');

	ime.getLanguageCodes().forEach(function (lang) {
		$langSelector.append(
			$('<option/>').attr('value', lang).text(ime.getAutonym(lang)));
	});
	$langSelector.on('change', function () {
		var lang = $langSelector.find('option:selected').val() || null;
		ime.setLanguage(lang);
	});

	$('.onoffswitch-label').click(function () {
		changeLang();
	});
        $('body').keyup(function (e) {
            if (e.ctrlKey && e.keyCode == 32) {
               changeLang();
            }
        });
	
	$ced.on('imeLanguageChange', function () {
		listInputMethods(ime.getLanguage());
	});
        function changeLang(){
                var lang = $('.onoffswitch').data('lang');
		if (lang == 'te') {
			lang = 'en';
			$('.onoffswitch-inner').addClass('active');
			$('.onoffswitch-switch').addClass('bt-active');
		} else {
			lang = 'te';
			$('.onoffswitch-inner').removeClass('active');
			$('.onoffswitch-switch').removeClass('bt-active');
		}
		ime.setLanguage(lang);
		$('.onoffswitch').data('lang', lang);
        };
	function CopyToClipboard(containerid) {
		if (document.selection) {
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand("copy");

		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().addRange(range);
			document.execCommand("copy");
			alert("text copied")
		}
	}

	function listInputMethods(lang) {
		$imeSelector.empty();
		ime.getInputMethods(lang).forEach(function (inputMethod) {
			$imeSelector.append(
				$('<option/>').attr('value', inputMethod.id).text(inputMethod.name));
		});
		$imeSelector.trigger('change');
	}

	$imeSelector.on('change', function () {
		var inputMethodId = $imeSelector.find('option:selected').val();
		ime.load(inputMethodId).done(function () {
			ime.setIM(inputMethodId);
		});
	});
	$('#font').change(function () {
		$('#ced').removeClass();
		$('#ced').addClass($(this).val());

	})
	$('#font-sizes').change(function () {
		$("#ced").css("fontSize", $(this).val());

	})
        ime.setLanguage('te');
        $('.onoffswitch').data('lang', 'te');
        $('#ced').addClass('guntur');
});

$(document).ready(function () {

	setInterval(function () {
		data1 = $('#ced').text();
		data = data1.replace(" ", "%20");
		facebook = "http://www.facebook.com/sharer.php?u=" + data;
		mail = "mailto:?Subject=New Telugu Document&amp;Body=" + data;
		gplus = "https://plus.google.com/share?url=" + data;
		linkedin = "http://www.linkedin.com/shareArticle?mini=true&amp;url=" + data;
		$('a.facebook').attr('href', facebook);
		$('a.mail').attr('href', mail);
		$('a.linkedin').attr('href', gplus);
		$('a.gplus').attr('href', linkedin);

	}, 5000);

	$('#input-file').change(function () {
		var fileToLoad = document.getElementById("input-file").files[0];

		var fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;
			$('#ced').text(textFromFileLoaded);
		};

		fileReader.readAsText(fileToLoad, "UTF-8");

	})

})
$(document).on('click', '.help', function () {
	$('.content').toggleClass("open");

})

function saveFile()
{
	var content = $('#ced').text();

	// You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
	dialog.showSaveDialog((fileName) => {
		if (fileName === undefined){
			console.log("You didn't save the file");
			return;
		}

    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
    });
}); 
}

function openFile(){
	dialog.showOpenDialog((fileNames) => {
		// fileNames is an array that contains all the selected
		if(fileNames === undefined){
			console.log("No file selected");
			return;
		}

		fs.readFile(fileNames[0], 'utf-8', (err, data) => {
			if(err){
				alert("An error ocurred reading the file :" + err.message);
				return;
			}

			// Change how to handle the file content
			$('#ced').text(data);
		});
	});
}

function CopyToClipboard() {
	var range = document.getSelection().getRangeAt(0);
	range.selectNode(document.getElementById("ced"));
	window.getSelection().addRange(range);
	document.execCommand("copy")
}

function print_window() {
	window.print();
}