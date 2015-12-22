---
title: Setting up and securing an Ubuntu VPS on Digital Ocean
subtitle: A guide on how to setup and secure a VPS on a clean install of Ubuntu 13.10 x64

cover_image: article-images/server-rack.jpg
cover_copyright: 'Photo Credit: <a href="https://www.flickr.com/photos/traftery/4773457853/">Tom Raftery</a> via <a href="http://compfight.com">Compfight</a> <a href="https://creativecommons.org/licenses/by-sa/2.0/">cc</a>'
tags: software

excerpt:
  <p>A guide on how to setup and secure a VPS on a clean install of Ubuntu 13.10 x64</p>
---

***This is a work in progress post, as i'm short on time to dabble with security. I'll add to it as i get time to set up my VPS***

##Basic Security

This part is extensive, and for good reason. Security is the most important part of configuring a web server. Below are several measures to make sure you’ve got a good foundation in place to safeguard your server.

###Change root password

Currently your root password is the default one that was sent to you when you registered your VPS. The first thing to do is change it to one of your choice.

{% highlight bash %}
passwd
{% endhighlight %}

###Create a new user

{% highlight bash %}
adduser <your username>
visudo
{% endhighlight %}

Add the following line and save:

{% highlight bash %}
<your username> ALL=(ALL:ALL) ALL
{% endhighlight %}

###Configure SSH

{% highlight bash %}
nano /etc/ssh/sshd_config
{% endhighlight %}

Edit the following lines and save:

{% highlight sh %}
Port <your port number>
Protocol 2
PermitRootLogin no
PermitEmptyPasswords no
UseDNS no
AllowUsers yourusername
{% endhighlight %}

You should choose a port number that is less than 1024, and not 22. Here's why.

reload ssh

Exit and login as new user:

exit
ssh -p <your port number> <your username>@<yourdomain.com>

###Update Ubuntu:

{% highlight sh %}
sudo apt-get update && sudo apt-get upgrade --show-upgraded
{% endhighlight %}

###Enable automatic security updates:

{% highlight sh %}
sudo apt-get install unattended-upgrades
sudo nano /etc/apt/apt.conf.d/10periodic
{% endhighlight %}

###Harden security of git user

Switch to git-shell for git user.

{% highlight sh %}
sudo chsh -s /usr/bin/git-shell git
{% endhighlight %}

{% highlight sh %}
sudo mkdir /home/git/git-shell-commands
sudo cp /usr/share/doc/git/contrib/git-shell-commands/list /home/git/git-shell-commands/
sudo cp /usr/share/doc/git/contrib/git-shell-commands/help /home/git/git-shell-commands/
sudo chown -R gituser /home/git/git-shell-commands
sudo chmod -R u+x /home/git/git-shell-commands
{% endhighlight %}

###Install nmap

Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification).

{% highlight sh %}
sudo apt-get install nmap
nmap -v -sT localhost
{% endhighlight %}
