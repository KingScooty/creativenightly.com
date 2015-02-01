var fixRhythm = require('./core.fix-rhythm');

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

    // isRenderedFixRhythm($('.twitter-tweet'));

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

  // isRenderedFixRhythm($('.gist'));
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

  // isRenderedFixRhythm($('#disqus_thread'))

  page_state.widgets.disqus.init = true;

}

function triggerAnalytics() {
  // console.log('Pushing analytics');
  if (window.location.hostname != 'localhost') {
    _gs('track');
  }
}


// function rhythm($el) {
//   var fixed = false;
//   $('.site-body').bind('DOMSubtreeModified', function(e) {
//     if (($el.is(e.target)) && !fixed) {
//       console.log('RENDERING', $el);
//       setTimeout(function() {
//         fixRhythm($el);
//       }, 2000);
//       fixed = true;
//     }
//   });
// }

// function isRenderedFixRhythm($el) {

//   if ($el.length !== 0) {

//     var editable = true;
//     var elInitTest = setInterval(function() {

//     console.log('interval');

//       var elHeight = $el.outerHeight();
//       if ( elHeight > 0 ) {
//         if (editable) { 
//           editable = false;
//           clearInterval(elInitTest);

//           fixRhythm($el, elHeight);
//         }
//       }
//     }, 2000);

//   }

// }

// function isRendered($el) {
//   var initialHeight = $el.outerHeight;
//   if ($el.length !== 0) && ($el.outerHeight > 0) {
//     return true;
//   } else {
//     deferRendered($el);
//   }
// }

// function deferRendered($el) {
//   $('.site-body').bind('DOMSubtreeModified', function(e) {
//     if (e.target === $el) {
//       return true;
//     }
//   }
// }


module.exports = {
  initFacebookLikes: initFacebookLikes,
  initTwitterWidgets: initTwitterWidgets,
  initGoogleWidgets: initGoogleWidgets,
  initDisqus: initDisqus,
  triggerAnalytics: triggerAnalytics,
  initGists: initGists
}