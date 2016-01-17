var widgets = require('../modules/core.init-widgets');
var fixRhythm = require('../modules/core.fix-rhythm');

function init (value) {

  // console.log('INIT POST!!!');

  // if (value === 'init') {
  //   fixRhythm();
  //   return true;
  // }

  fixRhythm();
  widgets.initTwitterWidgets();

  $(window).scroll(function() {

    if ($('.social').visible(true) && !page_state.social_widgets) {
      console.log('Initialising widgets.');
      widgets.initFacebookLikes();
      // widgets.initTwitterWidgets();
      widgets.initGoogleWidgets();
      page_state.social_widgets = true;
      console.log('scrolling social widgets');
    }

    if ($('#disqus_thread').visible(true) && !page_state.widgets.disqus.init) {
      widgets.initDisqus();
      console.log('scrolling disqus widgets');
    }

  });

  if (value !== 'init') {
    widgets.initGists();
    return true;
  }

}

function destroy () {
  console.log('DESTROY POST.');
}

module.exports = {
  init: init,
  destroy: destroy
}
