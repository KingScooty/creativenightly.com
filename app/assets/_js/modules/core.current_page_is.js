var routes = require('../_config');
var pages = require('../pages/_pages');

var init, destroy;

function init (value) {
  for (var key in routes) {
    if ($('body').hasClass('page--' + routes[key].name)) {
      // console.log('hello?');
      pages[key].init(value);
      // console.log('WTF page are we initing?', pages[key]);
      // header();
    }
  }
}

function destroy () {
  for (var key in routes) {
    if ($('body').hasClass('page--' + routes[key].name)) {
      pages[key].destroy();
      // console.log('WTF page are we destroying?', pages[key]);
      return true;
    }
  }
}

module.exports = {
  init: init,
  destroy: destroy
}
