---
title: Sublime Text 2 Theme Package Management
subtitle: Will Bond has created a delightful tool for managing packages; packages can include syntax highlighters for preprocessors such as LESS.
lastmod: 2013-02-12
---

Most devs are familiar with installing software packages on their systems via package managers, but did you know, if you're using [Sublime Text 2][1], you can do the same with your text editor too?

<!--more-->

##Sublime Package Control

[Will Bond][2] has created a delightful tool for managing packages; packages can include syntax highlighters for preprocessors such as LESS.

###Installation

Installation of the Sublime Text 2 Package Manager is done through the Sublime Text console. This is accessed via the **ctrl+`** shortcut. Once open, paste the following command into the console:

{% highlight bash %}
import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
{% endhighlight bash %}

##Installing a package

Let's go ahead and install a package or two to demonstrate just how easy it is.

###LESS syntax highlighter

After you have installed Package Control, restart Sublime Text 2 and bring up the Command Palette (`Command+Shift+p` on OS X, `Control+Shift+p` on Linux/Windows). Select Package Control: Install Package; wait while Package Control fetches the latest package list; type in LESS when the list appears, then hit enter to install.

###Sublime Text Themes / Colour Schemes

Bring up the Command Palette again (`Command+Shift+p` *or* `Control+Shift+p`) and goto Install Package. Search for **Dayle Rees Color Schemes** and hit enter to install.

Goto **Preferences -> Color Scheme** to select your new colour scheme.


Simples!

[1]: http://www.sublimetext.com/2
[2]: http://twitter.com/wbond
[3]: http://wbond.net/sublime_packages/package_control
