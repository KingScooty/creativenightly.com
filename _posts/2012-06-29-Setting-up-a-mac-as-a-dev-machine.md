---
layout: post
title: Setting up a Mac on OS X 10.8 as a dev machine from scratch
subtitle: The following notes will cover how to set up a fresh Mac &ndash; on OS X Mountain Lion &ndash; as a lean mean coding machine.

cover_image: false

excerpt: "The following notes will cover how to set up a fresh Mac &ndash; on OS X Mountain Lion &ndash; as a lean mean coding machine."

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Creative Technologist @ Wildflame Studios
  image: ks.png
---

- *Last updated on the **16th February 2013***

Originally, these were the notes I took down when setting up the development environment on my new MacBook Air in June 2012, but it's now become a step by step guide to setting up a full development stack on Mac OS X 10.8 Mountain Lion. I'll aim to keep this post up to date with the latest dev environments / workflows as new tools are released in order to setup the leanest / efficient development machine possible.

The only prerequisite is an **up-to-date install of OS X 10.8 Mountain Lion**.

---------------------

1. [Install Homebrew](#1)
2. [Install Git](#2)
3. [Install RVM](#3)
  - [Install Ruby](#3.2)
    - [Install Sass](#3.3)
    - [Install Compass](#3.3)
4. [Install Node](#4)
  - [Install Yeoman](#4.1)
5. [Install MySQL](#5)
6. [Install CouchDB](#6)
7. [Configure Apache](#7)
  - [Setup Virtual Hosts](#7.2)

---------------------

#####Using Sublime Text 2 from the Command Line
Before we begin, i'd recommend enabling Sublime Text 2 Command Line support as, for some reason, this isn't available out of the box.

To setup the command line functionality, type the following into the terminal.

{% highlight bash %}
sudo ln -s "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl" /usr/bin/subl
{% endhighlight bash %}

---------------------


##<a id="1"></a> 1. Homebrew:

###1.1 Requirements:

Homebrew has two dependencies: **XQuartz**, and **Xcode***. 

*It's a common delusion that the entire 2.8gb install of Xcode is required, however, the only part of Xcode Homebrew requires, is the **Command Line Tools**.*

####XQuartz

As of the 26th July 2012, Apple has dropped X11 from its OS. OS X Mountain Lion does not come bundled with X11, and instead, Apple recommend developers install the more up to date open source XQuartz project, which it will continue to support.

[Download XQuartz here][13] then install it, log out, then log back in.

####Command Line Tools

Homebrew requires Xcode to be installed in order to work, but Xcode is massively bloated for what is actually required by homebrew to build apps.

[OSX-GCC-Installer][4] by [Kenneth Reitz][5] was a way round this bloat, but lacked the 10.6/7 SDKs due to licensing restrictions. Apple, however, took interest in this project and were keen to ship something official. 

Thus, Apple announced the **Command Line Tools for Xcode**. It's a 171 MB download that includes all of the tools Homebrew should ever need. Plus, Homebrew officially supports this package.

**[Download the Command Line Tools for Xcode here][7] and install it.**


###1.2 Installing Homebrew:

{% highlight bash %}
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
{% endhighlight bash %}

The script installs Homebrew to `/usr/local` so that you don’t need sudo when you brew install.

It's bad practice to install packages using sudo.

---

> Packages can run arbitrary scripts, which makes sudoing a package manager command as safe as a chainsaw haircut. Sure, it's fast and definitely going to cut through any obstacles, but you might actually want that obstacle to stay there. [— Isaac Z. Schlueter][8]

--------------------------

###1.3 Changing ownership of usr/local:

This step isn't required for brew, but since we're on the subject of sudo, i recommend changing ownership of `/usr/local` from `root` to `$user`. This will benefit you when using node's package manager, and will mean you won't have to use sudo when installing into `/usr/local`:

{% highlight bash %}
sudo chown -R $USER /usr/local
{% endhighlight bash %}

There is a massive debate about chown-ing `/usr/local`, and i agree with [Isaacs comments here][9].

---------------------

##<a id="2"></a> 2.0 Git:

{% highlight bash %}
brew install git
{% endhighlight bash %}

Next, to setup git. Run the following commands in the Terminal.

{% highlight bash %}
git config --global user.name "Your Full Name"
git config --global user.email "Your Email Address"
{% endhighlight bash %}

Make sure you use the same email address for Git, GitHub, and Heroku.

---------------------

##<a id="3"></a> 3.0 RVM:

RVM stands for Ruby Version Manager. It's a command line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems. It also installs gems to your `~/` **home** directory, instead of using the global root of your machine.

####RVM helps improve security

RVM helps ensure that all aspects of Ruby are completely contained within user space, strongly encouraging safer, non-root use. Use of RVM rubies thus provides a higher level of system security, and therefore reduces risk and cuts overall system downtime. Additionally, since all processes run at the user level, a compromised ruby process cannot compromise the entire system.

####Say goodbye to sudo gem installs

Yep, that's right! By using RVM, you won't have to `sudo` to install gems on your machine.

###3.1 Install the stable release version:

{% highlight bash %}
curl -L https://get.rvm.io | bash -s stable
{% endhighlight bash %}

Finish the installation by either running the following command, or closing all shell windows.

{% highlight bash %}
source /Users/USERNAME/.rvm/scripts/rvm
{% endhighlight bash %}

*Replace **username** with your Mac username.*

Before installing the latest version of ruby with rvm, we need to install `libksba`.

{% highlight bash %}
brew install libksba
{% endhighlight bash %}

###<a id="3.2"></a> 3.2 Then install Ruby 1.9.3 with:

{% highlight bash %}
rvm install 1.9.3
{% endhighlight bash %}

###<a id="3.3"></a> Now install **Sass** and **Compass**.

{% highlight bash %}
gem install sass
gem install compass
{% endhighlight bash %}

---------------------

##<a id="4"></a> 4.0 Node:

According to the node docs, Brew installs of node are known to be buggy, the node package manager is not included in the install etiher, so the node devs themselves reccommend using the Macintosh package installer:

[Download the Node Macintosh package installer][10]

#####Note (8th Feb 2013): 

Node devs recently made some changes so that Node no longer installs on OS X via homebrew if Xcode is **not** installed. We haven't installed Node via homebrew, however this issue *still* affects us. 

Next time you run **npm install** you may come across the following error:

{% highlight bash %}
xcode-select: Error: No Xcode is selected. Use xcode-select -switch <path-to-xcode>, or see the xcode-select manpage (man xcode-select) for further information.
{% endhighlight %}

To fix this, all you need to do is:

{% highlight bash %}
sudo xcode-select --switch /usr/bin
{% endhighlight %}

###<a id="4.1"></a> 4.1 Yeoman

Yeoman is a robust and opinionated set of tools, libraries, and a workflow that can help developers quickly build beautiful, compelling web apps. Tools included are, **Yo** (a scaffolding tool), **Grunt**, **Bower** and more.

{% highlight bash %}
npm install -g yo grunt-cli bower
{% endhighlight bash %}

---------------------

##<a id="5"></a> 5.0 MySQL:

####Sidenote - Debugging / $PATH issues

I actually had a few issues at this point with my new MacBook air and had to roll back the install of MySQL in order to fix a few issues... 

I ran `brew doctor` to discover that `/usr/bin` was ahead of `/usr/local/bin` in my $PATH.

In order to get round this, i needed to edit `/etc/paths` to fix the order. 

{% highlight bash %}
subl /etc/paths
{% endhighlight bash %}

*This isn't a file i recommend playing with often. However, i've mentioned it here, as it might come in handy to people needing to do a little DIY machine debugging.*

Opening a new terminal window and running `brew doctor` again should confirm this.

-------

###5.1 Install

{% highlight bash %}
brew install mysql
{% endhighlight bash %}

You're then requried to setup a few things. Run the following commands:

{% highlight bash %}
unset TMPDIR
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
{% endhighlight bash %}

Followed by the following: ***(you might also need to restart your machine to fix a conflict with Lion's copy of MySQL.)***

{% highlight bash %}
mysql.server start
{% endhighlight bash %}

Then use the alternative security script:

{% highlight bash %}
/usr/local/Cellar/mysql/5.5.25a/bin/mysql_secure_installation
{% endhighlight bash %}

Boom!

---------------------

##<a id="6"></a> 6.0 CouchDB:

CouchDB is a popular NoSQL database. 

*If you're not planning on developing node apps with persistent storate, **you can skip this step**.*

{% highlight bash %}
brew install couchdb
{% endhighlight bash %}

----------------------

##<a id="7"></a> 7.0 Configuring Apache and Virtual Hosts:

Type the following command in to edit the `httpd.conf` file in Sublime Text.

{% highlight bash %}
subl /etc/apache2/httpd.conf
{% endhighlight bash %}

###7.1 Enable PHP5

Find `line 111` and un-comment:

{% highlight apacheconf %}
LoadModule php5_module libexec/apache2/libphp5.so
{% endhighlight apacheconf %}

###<a id="7.2"></a> 7.2 Enable Virtual Hosts

Find and uncomment the following line. It can be found around `line 623`.
{% highlight apacheconf %}
Include /private/etc/apache2/extra/httpd-vhosts.conf
{% endhighlight apacheconf %}

###7.3 Creating a Virtual Hosts File

You then want to create a vhosts file, to store all your virtual hosts in. So enter the following commands in the Terminal.

{% highlight bash %}
touch /etc/apache2/other/vhosts.conf
subl /etc/apache2/other/vhosts.conf
{% endhighlight bash %}

And enter the following:

{% highlight apacheconf %}
#
# Virtual Hosts
#
NameVirtualHost *:80

#
# VirtualHost example:
# Almost any Apache directive may go into a VirtualHost container.
# The first VirtualHost section is used for all requests that do not
# match a ServerName or ServerAlias in any <VirtualHost> block.
#
<VirtualHost *:80>
    DocumentRoot "/Users/USERNAME/Sites/SITENAME"
    ServerAlias dev.*.xip.io
    ServerName dev.foo
</VirtualHost>
{% endhighlight apacheconf %}

Change **username**, **sitename**, **dev**, and **dev.foo** accordingly, and save the file.

###7.4 Pointing Localhost to a Virtual Host Server Name

Now we need to point localhost to the server name, in order to enable the virtual host.

{% highlight bash %}
subl /etc/hosts
{% endhighlight bash %}

And enter the following on a new line and save:

{% highlight apacheconf %}
#servername to match that in the vhosts.conf file
127.0.0.1   dev.foo
{% endhighlight apacheconf %}

###7.5 Restart Apache, and Lock 'N' Load!

Lastly in `System Settings` disable and re-enable `Web Sharing` in the `Sharing` panel.

Fire up your favourite web browser and enter the servername, you should be pointed to the doc root you entered in your vhosts file!

Neat, eh! 

Now, there are plenty more options you can set for logs etc, but i'll leave that out as not to over complicate this article.

---------------------

##8.0 Remaining packages:

There are a lot more packages that can be installed, and need less configuration than the ones mentioned above. I've put these in a .dotfile you can [download here][12], and can be batch executed calling:

{% highlight bash %}
./.brew
{% endhighlight bash %}


----------------------


[1]: http://www.alfredapp.com/
[2]: http://dropbox.com/
[3]: http://www.sublimetext.com/
[4]: https://github.com/kennethreitz/osx-gcc-installer/
[5]: http://kennethreitz.com/
[6]: http://kennethreitz.com/xcode-gcc-and-homebrew.html
[7]: http://developer.apple.com/downloads
[8]: http://howtonode.org/introduction-to-npm
[9]: https://gist.github.com/579814#gistcomment-28563
[10]: http://nodejs.org/#download
[11]: http://getcloudapp.com/
[12]: https://raw.github.com/KingScooty/dotfiles/master/.brew
[13]: http://xquartz.macosforge.org/landing/