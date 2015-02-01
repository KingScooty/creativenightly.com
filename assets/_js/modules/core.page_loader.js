require('pjax');
var currentPage = require('./core.current_page_is');

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
    // refreshWidgets();
  },
  rewrite: function(document, area, host) {
    // Rewriting page parts
    var newBodyClass = $('body', document).attr('class');
    $('body').attr('class', newBodyClass);
  }
})

$(document).bind('pjax:fetch', function() {
  // Fetching new page
  require('./core.state').resetPageStates()
  currentPage.destroy();
});

$(document).bind('pjax:render', function () {
  currentPage.init();
});
