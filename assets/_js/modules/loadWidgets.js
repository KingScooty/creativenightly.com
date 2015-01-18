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

function loadDisqus() {
  var disqus_shortname = 'scottyvernon';
  var disqus_identifier = 1544990;

  (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
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
  triggerAnalytics: triggerAnalytics
}