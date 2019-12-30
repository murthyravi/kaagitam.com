$(document).ready(function() {
  'use strict';
  var $ced, ime, $imeSelector, $langSelector;
  $ced = $('#ced');
  // Initialise IME on this element
  $ced.ime({
    showSelector: false,
  });
  // Get the IME object
  ime = $ced.data('ime');
  ime.enable();
  $('#bold').click(function() {
    document.execCommand('bold', false, null);
  });

  $('#italic').click(function() {
    document.execCommand('italic', false, null);
  });

  $('#underline').click(function() {
    document.execCommand('underline', false, null);
  });

  // language and input method list box widgets
  $langSelector = $('select#language');
  $imeSelector = $('select#imeSelector');

  ime.getLanguageCodes().forEach(function(lang) {
    $langSelector.append(
      $('<option/>')
        .attr('value', lang)
        .text(ime.getAutonym(lang)),
    );
  });
  $langSelector.on('change', function() {
    var lang = $langSelector.find('option:selected').val() || null;
    ime.setLanguage(lang);
  });

  $('.onoffswitch-label').click(function() {
    changeLang();
  });
  $('body').keyup(function(e) {
    if (e.ctrlKey && e.keyCode == 32) {
      changeLang();
    }
  });
  var cntrlIsPressed = false;
  $(document).keydown(function(event) {
    if (event.which == '17') cntrlIsPressed = true;
  });
  $(document).keyup(function(event) {
    cntrlIsPressed = false;
  });
  $('#ced').click(function() {
    if (cntrlIsPressed) {
	  rangy.init();
      var sel = rangy.getSelection();
      sel.expand('word');
      var word = sel.text();
      cntrlIsPressed = false;
	  window.open('http://andhrabharati.com/dictionary/index.php?w=' + word, '_blank');
    }
  });

  $ced.on('imeLanguageChange', function() {
    listInputMethods(ime.getLanguage());
  });
  function changeLang() {
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
  }
  function CopyToClipboard(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand('copy');
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand('copy');
      alert('text copied');
    }
  }

  function listInputMethods(lang) {
    $imeSelector.empty();
    ime.getInputMethods(lang).forEach(function(inputMethod) {
      $imeSelector.append(
        $('<option/>')
          .attr('value', inputMethod.id)
          .text(inputMethod.name),
      );
    });
    $imeSelector.trigger('change');
  }

  $imeSelector.on('change', function() {
    var inputMethodId = $imeSelector.find('option:selected').val();
    ime.load(inputMethodId).done(function() {
      ime.setIM(inputMethodId);
    });
  });
  $('#font').change(function() {
    $('#ced').removeClass();
    $('#ced').addClass($(this).val());
  });
  $('#font-sizes').change(function() {
    $('#ced').css('fontSize', $(this).val());
  });
  ime.setLanguage('te');
  $('.onoffswitch').data('lang', 'te');
  $('#ced').addClass('tenali');
});

$(document).ready(function() {
  setInterval(function() {
    data1 = $('#ced').text();
    data = data1.replace(' ', '%20');
    facebook = 'http://www.facebook.com/sharer.php?u=' + data;
    mail = 'mailto:?Subject=New Telugu Document&amp;Body=' + data;
    gplus = 'https://plus.google.com/share?url=' + data;
    linkedin = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + data;
    $('a.facebook').attr('href', facebook);
    $('a.mail').attr('href', mail);
    $('a.linkedin').attr('href', gplus);
    $('a.gplus').attr('href', linkedin);
  }, 5000);

  $('#input-file').change(function() {
    var fileToLoad = document.getElementById('input-file').files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      $('#ced').text(textFromFileLoaded);
    };

    fileReader.readAsText(fileToLoad, 'UTF-8');
  });
});
$(document).on('click', '.help', function() {
  $('.content').toggleClass('open');
});

function CopyToClipboard() {
  var range = document.getSelection().getRangeAt(0);
  range.selectNode(document.getElementById('ced'));
  window.getSelection().addRange(range);
  document.execCommand('copy');
}

function print_window() {
  window.print();
}
