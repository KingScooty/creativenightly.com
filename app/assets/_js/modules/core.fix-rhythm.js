function fixRhythm($el, height) {
  // var baseline = 16;
  // var remainder = height % baseline;

  var body_font_size_px   = parseFloat($('body').css('font-size'));
  var body_line_height_px = parseFloat($('body').css('line-height'));
  var body_line_height_rem = body_line_height_px / body_font_size_px;

  var baseline = body_line_height_px / 2;
  var remainder = height % baseline;
  var invertRemainder = baseline - remainder;

  // console.log('Line height:', baseline);
  // console.log('El height:', height);
  // console.log('Remainder:', invertRemainder);
  // console.log('Polling fix');

  if ($el.is('iframe')) {
    args = {
      'margin-bottom': invertRemainder + "px"
    }
  } else {
    args = {
      'padding-bottom': invertRemainder + "px"
    }  
  }

  if (remainder > 0) {
    $el.css(args);
    console.log($el);
  }

}

function initMonitorRhythm() {
  var elements = [
    '.gist',
    '.twitter-tweet',
    '#disqus_thread'
  ];

  window.rhythm_intervals = setInterval(loopWidgets, 2000);

  function loopWidgets() {
    $.each(elements, function(index, el) {
      $(el).each(function(index, el) {
        var $el = $(el);
        if ($el.is('.twitter-tweet')) {
          var height = $el.outerHeight();
        } else {
          var height = $el.height();
        }
        // console.log($el, height);
        if (($el.length !== 0) && (height > 0)) {
          // console.log('Fixing: ', $el);
          fixRhythm($el, height);
        }
      });
    });
  }

}

module.exports = initMonitorRhythm;


