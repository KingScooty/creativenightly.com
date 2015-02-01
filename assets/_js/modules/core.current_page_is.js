var routes = require('../_config');
var pages = require('../pages/_pages');

var init, destroy;

function init () {
  for (var key in routes) {
    if ($('body').hasClass('page--' + routes[key].name)) {
      pages[key].init();
      // header();
    }
  }
}

function destroy () {
  for (var key in routes) {
    if ($('body').hasClass('page--' + routes[key].name)) {
      pages[key].destroy();
      return true;
    }
  }
}

module.exports = {
  init: init,
  destroy: destroy 
}