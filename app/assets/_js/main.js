var $ = require('jquery');
require('./plugins/is-visible');

function initCreativeNightly() {

  // Attach global page state variable to window.
  require('./modules/core.state').initPageState();

  var checkPage = require('./modules/core.current_page_is');
  checkPage.init('init');

  require('./modules/core.page_loader');

}

$(function() {
  initCreativeNightly();
});
