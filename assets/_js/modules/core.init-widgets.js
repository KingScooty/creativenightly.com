function initFacebookLikes() {
  try{
      FB.XFBML.parse(); 
  }catch(ex){}
}

function initTwitterWidgets() {
  twttr.widgets.load();
  page_state.widgets.twitter.tweet_loaded = true;
  page_state.widgets.twitter.follow_loaded = true;
}

function initGoogleWidgets() {
  gapi.plusone.go();
  page_state.widgets.google_plus_loaded = true;
}

function initGists() {
  require('../plugins/ajax-gist-embed')();
  page_state.widgets.gist_loaded = true;
}

function initDisqus() {
  var disqus_shortname = 'scottyvernon';
  var disqus_identifier = window.location.pathname;
  var disqus_url = 'http://www.creativenightly.com';
  var disqus_config = function () { 
    this.language = "en";
  };

  if(typeof DISQUS === 'undefined'){

    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });

  } else {

    DISQUS.reset({
      reload: true,
      config: function () {  
        this.page.identifier = disqus_identifier;  
        this.page.url = disqus_url + "/#!" + disqus_identifier;
      }
    });

  }

  page_state.widgets.disqus_loaded = true;
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