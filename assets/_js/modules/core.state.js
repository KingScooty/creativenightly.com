// Manage that state, yo.

function initPageState() {
  window.page_state = {
    widgets: {
      gist: false,
      twitter: {
        tweet : false,
        follow: false
      },
      facebook: false,
      google_plus: false,
      disqus: false
    },
    social_widgets: false
  };
}

function resetPageStates() {
  initPageState();
  $(window).unbind('scroll');
}

module.exports = {
  initPageState: initPageState,
  resetPageStates: resetPageStates
};