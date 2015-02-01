var widgets = require('../modules/core.init-widgets');

function init () {

  widgets.initTwitterWidgets();
  widgets.initGists();

  $(window).scroll(function() {

    if ($('.social').visible(true) && !page_state.social_widgets) {
      widgets.initFacebookLikes();
      // widgets.initTwitterWidgets();
      widgets.initGoogleWidgets(); 
    }

    if ($('#disqus_thread').visible(true) && !page_state.widgets.disqus_loaded) {
      widgets.initDisqus();
    }

  });

}

function destroy () {}

module.exports = {
  init: init,
  destroy: destroy
}