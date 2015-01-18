var $ = require('jquery');
require('pjax');
require('./plugins/isVisible');
var loadWidgets = require('./modules/loadWidgets');

$(function() {


  var widgetsLoaded = false;
  var disqusLoaded = false;

  function resetWidgetStates() {
    widgetsLoaded = false;
    disqusLoaded = false;
    $(window).unbind('scroll');
  }

  // Stagger loading of plugins to improve pageload/render performance
  var refreshWidgets = function() {

    loadWidgets.triggerAnalytics();

    if ($('#disqus_thread').length !== 0) {
      console.log('Disqus exists!');

      $(window).scroll(function() {
        // console.log('scrolling');
        // console.log($('#disqus_thread').visible(true));
        // console.log($('.social').visible(true));

        if ($('.social').visible(true) && !widgetsLoaded) {
          loadWidgets.loadFacebookLikes();
          loadWidgets.loadTwitterWidgets();
          loadWidgets.loadGoogleWidgets(); 
          widgetsLoaded = true;
        }

        if ($('#disqus_thread').visible(true) && !disqusLoaded) {
          loadWidgets.loadDisqus();
          disqusLoaded = true;
        }

      });

    }

  }

  $.pjax({
    area: '.site-body', 
    // callback: function() {
    //   console.log('page load callback - hopefully last?');
    // },
    load: {
      head: 'Base, meta, link'
      // css: true ,
      // script: true
    },
    Cache: {
      click: true,
      // Submit: false,
      popstate: true  
    },
    wait: 0,
    callback: function() {
      refreshWidgets();
    },
    rewrite: function(document, area, host) {
      // console.log('Rewriting page parts');
    }
  })

  $(document).bind('pjax:fetch', function() {
    // console.log('fetching new page');
    resetWidgetStates();
  });



  window.onload = function() {
    require('./modules/rhythm');
  }

});