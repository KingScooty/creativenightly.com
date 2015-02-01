function fixRhythm($el, height) {
  // var baseline = 16;
  // var remainder = height % baseline;

  var body_font_size_px   = parseFloat($('body').css('font-size'));
  var body_line_height_px = parseFloat($('body').css('line-height'));
  var body_line_height_rem = body_line_height_px / body_font_size_px;

  var baseline = body_line_height_px / 2;
  var remainder = height % baseline;
  var invertRemainder = baseline - remainder;

  console.log('Line height:', baseline);
  console.log('El height:', height);
  console.log('Remainder:', invertRemainder);

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
    console.log('Fixing height.');
  }

}

module.exports = fixRhythm;

// function isRenderedFixRhythm(el) {
//   var $el = el;
//   var editable = true; // set a flag
//   var elInitTest = setInterval(function() {

//   console.log('interval');

//     var elHeight = $el.outerHeight();
//     if ( elHeight > 0 ) {
//       if (editable) { 
//         editable = false;
//         clearInterval(elInitTest);

//         fixRhythm($el, elHeight);
//       }
//     }
//   }, 2000);

// }

// function isRendered($el) {
//   var initialHeight = $el.outerHeight;
//   if ($el.length !== 0) && ($el.outerHeight > 0) {
//     return true;
//   } else {
//     deferRendered($el);
//   }
// }

// function deferRendered($el) {
//   $('.site-body').bind('DOMSubtreeModified', function(e) {
//     if (e.target === $el) {
//       return true;
//     }
//   }
// }

// function fixDisqusRhythm() {

//   if ($('#disqus_thread').length !== 0) {

//     var $disqus = $('#disqus_thread');
//     isRenderedFixRhythm($disqus);
//   }

// }

// function fixTweetEmbedRhythm() {

//   var initialHeight = $('.twitter-tweet').outerHeight();

//   $('.twitter-tweet').bind('DOMSubtreeModified', function(e) {

//     if ($('.twitter-tweet.twitter-tweet-rendered').length !==0 ) {
//       var $tweet = $('.twitter-tweet.twitter-tweet-rendered');
//       if ($tweet.outerHeight() > initialHeight) {
//         isRenderedFixRhythm($tweet);
//       }
//     }
//   });

// }



