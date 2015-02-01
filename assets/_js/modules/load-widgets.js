var rhythm = require('./rhythm');

function loadFacebookLikes() {
  try{
      FB.XFBML.parse(); 
  }catch(ex){}
}

function loadTwitterWidgets() {
  twttr.widgets.load();
}

function loadGoogleWidgets() {
  gapi.plusone.go();
}

function loadGists() {
  require('./ajax-gist-embed');
  rhythm.fixGistRhythm();
}

function loadDisqus() {
  var disqus_shortname = 'scottyvernon';
  var disqus_identifier = window.location.pathname;
  var disqus_url = 'http://www.creativenightly.com';
  var disqus_config = function () { 
    this.language = "en";
  };

  DISQUS.reset({
    reload: true,
    config: function () {  
      this.page.identifier = disqus_identifier;  
      this.page.url = disqus_url + "/#!" + disqus_identifier;
    }
  });

  //Fix rhythm
  rhythm.fixDisqusRhythm();

}

function triggerAnalytics() {
  if (window.location.hostname != 'localhost') {
    _gs('track');
  }
}

module.exports = {
  loadFacebookLikes: loadFacebookLikes,
  loadTwitterWidgets: loadTwitterWidgets,
  loadGoogleWidgets: loadGoogleWidgets,
  loadDisqus: loadDisqus,
  triggerAnalytics: triggerAnalytics,
  loadGists: loadGists
}