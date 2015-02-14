---
layout: post
title: Optimise Typekit for mobile and improve your Page Insights Score
subtitle: Here's two pretty interesting things you can do to optimise Typekit for mobile and improve your page insight score.

cover_image: article-images/2015-02-09-page_insights.png

excerpt: "Here's two pretty interesting things you can do to optimise Typekit for mobile and improve your page insight score"

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Creative Technologist @ Wildflame Studios
  image: ks.png
---

[Google Page Insights](https://developers.google.com/speed/pagespeed/insights/) is a really neat tool from Google that grabs a page of your site and reports back statistics on load performance and user experience. However, if you're using Typekit, Google Page Insights can be pretty mean &ndash; this is due to Typekit typically loading in as a render blocking script in the head. 

So how can we speed up Typekit for mobile users, while preserving the rich flashless experience on desktop?

###Asynchronous font loading

Font libraries like Typekit offer a method to load in their fonts asynchronously, thus allowing the rest of the page to render while the fonts download. **However, the downside to this is that annoying flash of unstyled text.** In some cases a well formed font stack can prevent this flash of text from being drastic &ndash; or even noticeable &ndash; but what if that's not an option?

###1. Stop render blocking *just for mobile*

**The aim of the game for mobile is speed.** I don't care what anyone else has to say on the matter. If you're a designer designing for mobile and thinking about anything else other than speed/performance, you're wrong! It's perfectly acceptable for the flash of unstyled fonts on mobile &ndash; chances are mobile visitors are here purely for the content, not the bells and whistles.

The trick here is to wrap the Typekit load script in a little if statement that detects what conditions to swap render blocking to async mode, before writing the required load script elements to the DOM.

In the example below, I've got for a simple browser width detction. Any browser *below* 800px wide on page load will get the async non-render blocking treatment.

{% gist a419eb8a4f820b5f60f2 %}

###2. Vend a seperate kit with OpenType features disabled

TypeKit now comes with OpenType features enabled for the majority of its fonts. 

> OpenType layout features are typographic extras built into fonts, involving substituting different glyphs or repositioning glyphs to achieve better typography. OpenType features include things such as kerning, ligatures, small caps, oldstyle figures, and many more things. Support for such goodies is part of CSS3.

This is all great news, **but these features come at a cost**, typically 20 kb+ *per font*. An overhead you can probably do without for smaller screens.

The trick here is create **2 different kits for mobile and desktop**. If we use the snippet above, all we need to do it add the kit code inside the if statements so that any mobile visitors will get the smaller Typekit file, and desktop users will get the larger file with all the extra features.

{% gist f8eb664f2ad02cab003d %}

###3. Bask in the glory of your improved score

Now all that's left to do is bask in the glory of your improved Page Insights score! Creative Nightly scores a whopping 95/100 for mobile and 84/100 for desktop. ***That's the difference async typekit makes!***