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
}

function loadDisqus() {
  var disqus_shortname = 'scottyvernon';
  var disqus_identifier = window.location.pathname;
  var disqus_url = 'http://www.creativenightly.com';
  var disqus_config = function () { 
    this.language = "en";
  };

  // (function() {
  //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
  //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  // })();

  DISQUS.reset({
    reload: true,
    config: function () {  
      this.page.identifier = disqus_identifier;  
      this.page.url = disqus_url + "/#!" + disqus_identifier;
    }
  });

  /* * * Disqus Reset Function * * */
    // DISQUS.reset({
    //   reload: true,
    //   config: function () {
    //     this.page.identifier = disqus_identifier;
    //     this.page.url = disqus_url;
    //     // this.page.title = newTitle;
    //     // this.language = newLanguage;
    //   }
    // });

  //Fix rhythm
  require('./rhythm');

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