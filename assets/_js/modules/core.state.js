// Manage that state, yo.

var page_state = {
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

function initPageState() {
  window.page_state = page_state;
}

function resetPageStates() {
  initPageState();
  $(window).unbind('scroll');
}

module.exports = {
  initPageState: initPageState,
  resetPageStates: resetPageStates
};