function getScripts(path, callback) {
  $.ajax({
    type: "GET",
    url: path,
    dataType: "script",
    cache: true
  }).done(function() {
    if (typeof callback == 'function') { 
    // make sure the callback is a function
      callback.call(this); // brings the scope to the callback
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
  var disqus_identifier = window.location.pathname;
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
  if (window.location.hostname != 'localhost') {
    _gs('track');
  }
}


// loadWidgets.triggerAnalytics();


function testVariables() {
  console.log('Logging page state from global');
  console.log(page_state);
}

module.exports = {
  initFacebookLikes: initFacebookLikes,
  initTwitterWidgets: initTwitterWidgets,
  initGoogleWidgets: initGoogleWidgets,
  initDisqus: initDisqus,
  triggerAnalytics: triggerAnalytics,
  initGists: initGists,
  testVariables: testVariables
}