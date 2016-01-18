---
title: Setting up Hyperion on a Raspberry Pi for use with Lightpack
subtitle: Get Lightpack working with a Raspberry Pi on Linux and take advantage of insanely low power useage.

cover_image: article-images/hyperion-raspberry-pi-lightpack.jpg

lastmod: 2016-01-08

excerpt:
  <p>Get Lightpack working with a Raspberry Pi on Linux and take advantage of insanely low power useage.</p>
---

###Introduction

I've tried quite a few different controllers for controlling LEDs on a Raspberry Pi. Most require a lot of resources, and don't scale well will an increase in LED numbers. I needed a controller that could handle 300+ LEDs without breaking a sweat. This is where Hyperion comes in.

Hyperion is an opensource 'AmbiLight' implementation. It's main selling points are:

* Low CPU load. For a led string of 50 leds the CPU usage will typically be below 2% on a non-overclocked Pi.
* Json interface which allows easy integration into scripts.
* A command line utility allows easy testing and configuration of the color transforms.
* Priority channels are not coupled to a specific led data provider which means that a provider can post led data and leave without the need to maintain a connection to Hyperion.
* HyperCon. A tool which helps generate a Hyperion configuration file. The tool will also remember your settings from the previous run.
* Black border detector.
* A scriptable effect engine.
* Boblight server interface to enable the use of clients written for Boblight.
* Generic software architecture to support new devices and new algorithms easily.

###Installing Hyperion

Install the following prerequisites first using apt-get.

{% highlight sh %}
apt-get update
apt-get install libqtcore4 libqtgui4 libqt4-network libusb-1.0-0 libprotobuf7 ca-certificates
{% endhighlight %}

Next grab the install Hyperion script from the Hyperion github repo.

{% highlight sh %}
wget -N https://raw.github.com/tvdzwan/hyperion/master/bin/install_hyperion.sh
{% endhighlight %}

Installing Hyperion is as simple as running the following command.

{% highlight sh %}
sh ./install_hyperion.sh
{% endhighlight %}

To get it working with Lightpack, you'll want to edit the default hyperion config file located at `/etc/hyperion.config.json` and change the **type** to "Lightpack".

{% highlight sh %}
nano /etc/hyperion.config.json

 "type"       : "lightpack",
 "output"     : “",
{% endhighlight %}

Next restart the server with the following command. If all goes well, you should see your Lightpack light up with rainbow colours, before mimicking the colours of your screen.

{% highlight sh %}
service hyperion restart
{% endhighlight %}

***Edit 8th January 2016*** &mdash; I've since moved away from using Lightpack. The cable mess it created along with the fact that despite being marketed as having 30 LEDs, you can only individually address 10 of them (rubbish!) resulted in me researching into alternate solutions.

I'm now running a fully custom setup using 300+ WS2801 LEDs &mdash; all individually addressable!

####My Setup

My hardware setup from a wiring perspective is fairly complex, but if anyone wants to me post a write up, tweet me at [@KingScooty](http://twitter.com/kingscooty) and let me know!

Amongst other things, it allows me to switch sources by simply turning a new device on, and the lights will automatically switch over to the new source. Here's a few live examples of my setup for anyone that's interested:

<iframe src="https://vine.co/v/izpiA1tebtm/embed/simple" width="600" height="600" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>

<iframe src="https://vine.co/v/izvprFTBYHw/embed/simple" width="600" height="600" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>
