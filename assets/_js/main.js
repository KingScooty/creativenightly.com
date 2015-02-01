var $ = require('jquery');
require('./plugins/is-visible');

// Attach global page state variable to window.
require('./modules/core.state').initPageState();

$(function() {

  // window.onload = function() {
  //   // require('./modules/rhythm');
  // }

  var checkPage = require('./modules/core.current_page_is');
  checkPage.init();

  require('./modules/core.page_loader');

});