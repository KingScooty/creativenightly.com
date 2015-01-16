require('zepto');
// require('./rhythm');

$(function() {

  // $(".full img").on("click", function() {
  //   $(this).toggleClass("zoom");
  // });

  // $(window).load(function () {

    window.onload = function() {

      // var $disqus = $('#disqus_thread');
      // var height = $disqus.height();

      // var baseline = 16;
      // var remainder = height % baseline;

      // if !(remainder) {
      //   $disqus.css({
      //     'padding-bottom': remainder + "px"
      //   });
      // }

      var editable = true; // set a flag
      var disqusInitTest = setInterval(function() {
      // Initially Disqus renders this div with the height of 0px prior to the comments being loaded. So run a check to see if the comments have been loaded yet.
      console.log('interval');

        var disqusHeight = $('#disqus_thread').height();
        if ( disqusHeight > 0 ) {
          if (editable) { // To make sure that the changes you want to make only happen once check to see if the flag has been changed, if not run the changes and update the flag.
            editable = false;
            clearInterval(disqusInitTest);
            console.log('hello? disqus loaded');
            // Your code here...
          }
        }
      }, 100);

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