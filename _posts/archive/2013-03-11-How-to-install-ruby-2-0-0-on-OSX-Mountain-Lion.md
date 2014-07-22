---
layout: post
title: How to install Ruby 2.0.0 with RVM on OSX 10.8 Mountain Lion
subtitle: 
lastmod: 2013-03-11

cover_image: false

excerpt:

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Software Engineer @ Wildflame Studios
  image: ks.png
---

If you've come across the any of the following errors while trying to install Ruby 2.0.0, you've come to the right place!

{% highlight bash %}
apple-gcc42 is not available in PATH

Error running 'env GEM_PATH=/Users/KingScooty/.rvm/gems/ruby-2.0.0-p0:/Users/KingScooty/.rvm/gems/ruby-2.0.0-p0@global:/Users/KingScooty/.rvm/gems/ruby-2.0.0-p0:/Users/KingScooty/.rvm/gems/ruby-2.0.0-p0@global GEM_HOME=/Users/KingScooty/.rvm/gems/ruby-2.0.0-p0 /Users/KingScooty/.rvm/rubies/ruby-2.0.0-p0/bin/ruby /Users/KingScooty/.rvm/src/rubygems-2.0.2/setup.rb', please read /Users/KingScooty/.rvm/log/ruby-2.0.0-p0/rubygems.install.log

 ERROR:  Could not find a valid gem 'sass' (>= 0), here is why:
      Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0      state=SSLv3 read server key exchange B: bad ecpoint (https://rubygems.org/latest_specs.4.8.gz)
{% endhighlight bash %}

The following should get you up and running with Ruby 2.0.0 in less than 5minutes!

You *must* install **libyaml** because Ruby 2.0.0 deprecated syck in favor of psych. I found that i also needed a variety of other packages during the install, so grab them too.

{% highlight bash %}
rvm get stable

brew update

brew install libyaml
brew install pkg-config 
brew install libxml2 
brew install libxslt

brew install openssl
brew link openssl --force

brew install sqlite

brew install apple-gcc42

rvm install 2.0.0 --with-gcc=gcc-4.2
{% endhighlight bash %}

#boom! :)