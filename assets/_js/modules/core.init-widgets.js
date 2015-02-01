function getScripts(path, callback) {
  $.ajax({
    type: "GET",
    url: path,
    dataType: "script",
    cache: true
  }).done(function() {
    // make sure the callback is a function
    if (typeof callback == 'function') { 
      // brings the scope to the callback
      callback.call(this); 
    }
  });
}

function initFacebookLikes() {

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=1576288162589072";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  try{
    FB.XFBML.parse();
  } catch(ex) {}

}

function initTwitterWidgets() {

  if(typeof twttr === 'undefined'){
  getScripts("https://platform.twitter.com/widgets.js");
  } else {
    twttr.widgets.load();
    page_state.widgets.twitter.tweet.init = true;
    page_state.widgets.twitter.follow.init = true;
  }
}

function initGoogleWidgets() {

  if(typeof gapi === 'undefined'){
    getScripts("https://apis.google.com/js/plusone.js");
  } else {
    gapi.plusone.go();
    page_state.widgets.google_plus.init = true;
  }

}

function initGists() {
  require('../plugins/ajax-gist-embed')();
  page_state.widgets.gist.init = true;
}

function initDisqus() {
  var disqus_shortname = 'scottyvernon';
  var disqus_identifier = window.location.pathname.replace(/\/$/, '');
  var disqus_url = 'http://www.creativenightly.com';
  var disqus_config = function () { 
    this.language = "en";
  };

  if(typeof DISQUS === 'undefined'){

    getScripts("https://" + disqus_shortname + ".disqus.com/embed.js");

  } else {

    DISQUS.reset({
      reload: true,
      config: function () {  
        this.page.identifier = disqus_identifier;  
        this.page.url = disqus_url + "/#!" + disqus_identifier;
      }
    });

  }

  page_state.widgets.disqus.init = true;

}

function triggerAnalytics() {
  // console.log('Pushing analytics');
  if (window.location.hostname != 'localhost') {
    _gs('track');
  }
}


module.exports = {
  initFacebookLikes: initFacebookLikes,
  initTwitterWidgets: initTwitterWidgets,
  initGoogleWidgets: initGoogleWidgets,
  initDisqus: initDisqus,
  triggerAnalytics: triggerAnalytics,
  initGists: initGists
}