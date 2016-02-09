---
title: Jekyll Incorporated Features
subtitle: "What's in the box"
cover_image: blog-cover.jpg

excerpt: "Incorporated provides a great typography, responsive design, author details, semantic markup and more."
---

Incorporated provides a great typography, responsive design, author details, semantic markup and more.

You can set customize post covers, and other things directly in the post front matter:

{% highlight yaml %}
layout: post

title: Jekyll Incorporated Features
subtitle: "What's in the box"

# Setup post cover image in /images/
cover_image: blog-cover.jpg

excerpt: "Incorporated provides a great typography, responsive design, author details, semantic markup and more."

# Author details, including Google Plus authorship
author:
  name: Karri Saarinen
  twitter: karrisaarinen
  gplus: 100687498195339762535
  bio: Co-founder, Design
  image: ks.jpg

# Keep it as draft, not published in index.html or feed.xml
draft: false
{% endhighlight %}


1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list

* Unordered list can use asterisks
- Or minuses
+ Or pluses


| Tables        | Are           | Cool  |
| ------------- |---------------| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


Three or more...

---

Hyphens

***

Asterisks

___

Underscores

#### Configurable & Code Snipped Highlighting

/assets/stylesheets/main.scss:
{% highlight scss %}

/* Bodytext font */
$font: "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Font for headings */
$fontheadings: "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Text colors */
$text: #21272d;
$textmuted: #848484;
$accent: #2077b2;    
{% endhighlight %}

config.yml:
{% highlight yaml %}
inc:
  # Blog Information
  title:        "Jekyll Incorporated"
  subtitle:     "Modern Jekyll based blog for companies"
  cover_image:  blog-cover.jpg

  # Company information
  company:      Incorporated
  url:          http://incorporated.sendtoinc.com/
  facebook:     sendtoinc
  twitter:      sendtoinc
  about_link:   https://sendtoinc.com/about/

  # Product Information
  product_link: http://incorporated.sendtoinc.com/
  tagline:      "Get a modern blog for your company"

  # Comments
  disqus:
    # Eg. "exampleblog" Set to false to disable comments
    shortname:  false


  # Sharing settings
  sharing:
    twitter:    false
    facebook:   false
    gplus:      false
    hn:         false


 # Analytics     
  analytics:
    google:
      # eg. 'UA-123-12'
      id:       false    
{% endhighlight %}

**Zoomable images**

<div class="full zoomable"><img src="/images/incorporated.jpg"></div>

**Awesome quotes**

> “Effective companies tend to communicate more, their people are curious and they have opinions”

Stay tuned for updates.
