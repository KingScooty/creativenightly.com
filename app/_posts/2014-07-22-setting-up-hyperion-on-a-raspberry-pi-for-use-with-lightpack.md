---
title: Setting up Hyperion on a Raspberry Pi for use with Lightpack
subtitle: Get Lightpack working with a Raspberry Pi on Linux and take advantage of insanely low power useage.

cover_image: hyperion-raspberry-pi-lightpack.jpg

excerpt: "Get Lightpack working with a Raspberry Pi on Linux and take advantage of insanely low power useage."
---

##Installing Hyperion

Install the following prerequisites first using apt-get.

{% highlight sh %}
apt-get update
apt-get install libqtcore4 libqtgui4 libqt4-network libusb-1.0-0 libprotobuf7 ca-certificates
{% endhighlight %}

Next grab the install hyperion script from the hyprion github repo.

{% highlight sh %}
wget -N https://raw.github.com/tvdzwan/hyperion/master/bin/install_hyperion.sh
{% endhighlight %}

Installing hyperion is as simple as running the following command.

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
