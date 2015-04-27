var widgets = require('../modules/core.init-widgets');

function init () {
  // console.log('RUN INIT ON EVERY PAGE.');
  widgets.triggerAnalytics();
}
function destroy () {
  // console.log('RUN DESTROY ON EVERY PAGE');
  require('../modules/core.state').resetPageStates();
}

module.exports = {
  init: init,
  destroy: destroy
}