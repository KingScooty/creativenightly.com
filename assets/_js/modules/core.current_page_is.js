var routes = require('../_config');
var pages = require('../pages/_pages');

var init, destroy;

function init (value) {
  for (var key in routes) {
    if ($('body').hasClass('page--' + routes[key].name)) {
      pages[key].init(value);
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