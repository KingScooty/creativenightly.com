// Manage that state, yo.

function initPageState() {
  window.page_state = {
    widgets: {
      gist: {
        init: false,
        rendered: false,
      },
      twitter: {
        tweet : {
          init: false,
          rendered: false
        },
        follow: {
          init: false,
          rendered: false
        }
      },
      facebook: {
        init: false,
        rendered: false
      },
      google_plus: {
        init: false,
        rendered: false
      },
      disqus: {
        init: false,
        rendered: false
      }
    },
    social_widgets: false
  };
}

function resetPageStates() {
  initPageState();
  $(window).unbind('scroll');
  clearInterval(window.rhythm_interval);
}

module.exports = {
  initPageState: initPageState,
  resetPageStates: resetPageStates
};