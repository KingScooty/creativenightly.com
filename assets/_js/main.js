;require('zepto');
// require('./rhythm');

$(function() {

  // $(".full img").on("click", function() {
  //   $(this).toggleClass("zoom");
  // });

  // $(window).load(function () {

    window.onload = function() {

      var $disqus = $('#disqus_thread');
      // var height = $disqus.height();

      function fixRhythm(height) {
        // var baseline = 16;
        // var remainder = height % baseline;

        var body_font_size_px   = parseFloat($('body').css('font-size'));
        var body_line_height_px = parseFloat($('body').css('line-height'));
        var body_line_height_rem = body_line_height_px / body_font_size_px;

        var baseline = body_line_height_px / 2;
        var remainder = height % baseline;
        var invertRemainder = baseline - remainder;

        console.log('Line height:', baseline);
        console.log('Disqus height:', height);
        console.log('Remainder:', invertRemainder);

        if (remainder > 0) {
          $disqus.css({
            'padding-bottom': invertRemainder + "px"
          });
          console.log('Fixing height.');
        }

      }

      var editable = true; // set a flag
      var disqusInitTest = setInterval(function() {
      // Initially Disqus renders this div with the height of 0px prior to the comments being loaded. So run a check to see if the comments have been loaded yet.
      // console.log('interval');

        var disqusHeight = $disqus.height();
        if ( disqusHeight > 0 ) {
          if (editable) { // To make sure that the changes you want to make only happen once check to see if the flag has been changed, if not run the changes and update the flag.
            editable = false;
            clearInterval(disqusInitTest);
            // console.log('hello? disqus loaded');
            // Your code here...
            fixRhythm(disqusHeight);
          }
        }
      }, 1000);

      // $('img').rhythm();
      // if ($('.media-window img').length !== 0) {
      //   var url = $('.media-window img').attr('src');

      //   $('.media-window').css(
      //     'background-image', "url(" + url + ")"
      //   );

      //   $('.media-window img').remove();
      // }
    }
      // $("img").keepTheRhythm();
  // });

});