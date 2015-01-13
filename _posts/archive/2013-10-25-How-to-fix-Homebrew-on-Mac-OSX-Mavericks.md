---
layout: post
title: How to fix Homebrew on Mac OS X Mavericks
subtitle: How to fix Homebrew on the newly released Apple operating system, Mac OS X Mavericks.
lastmod: 2013-10-25

cover_image: false

excerpt:

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Software Engineer @ Wildflame Studios
  image: ks.png
---

I’ve had lots of problems with homebrew since upgrading to Mavericks. The same problems also existed when trying to rbenv install and really anything else that compiles. The root cause of the issue ended up being a conflict Mountain Lion Command Line Tools and the ones provided by Maverick.

There's a chance you might be having various issues with homebrew after upgrading to OS X Mavericks. The root cause of the issue is a conflict with Mountain Lion Command Line Tools and the ones provided by Mavericks.

There is an simple solution to this. By running `xcode-select` (a tool that changes the path of the current active developer directory) it will fix the issue.

Open up the terminal and run:

{% highlight bash %}
xcode-select --install
{% endhighlight bash %}

This will bring up a dialog to install the Command Line Tools (which you will have to type in your password) and your Homebrew issues shall be fixed!