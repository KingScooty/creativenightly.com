---
title: Slushie is a pre-packaged gulp pipeline that just works
subtitle: Literally an entire Gulp pipeline for free, just add water.
---

Today I was working on a development pipeline tool for the Live team at BBC Sport. A tool that will essentially hook into their existing development pipeline, and provide a *pre-opinionated* workflow for processing `Sass` files. It's a fairly simple concept, but one that would hopefully give the front-end architects a chance to define a set of rules in one place, and iterate on it, that the rest of the developers can leverage without having to worry about any finer details.

We have a lot of developers on the team that don't want to have to worry about setting up a pipeline for handling Sass files for each and every component that is created---it's a detail that the championing front-end developers should take care of.

I have a tendency to write my pipeline tasks as simple functions, import them into a main file and *then* apply the gulp magic. It's a lot cleaner than faffing around with importing gulp tasks and sharing objects across files. It's also something I realised that not a lot of people are aware is possible. I've seen so countless articles online of people trying to split their gulpfiles up, but doing it in the messiest of ways, and using plugins in order to try and achieve it. ***Plugins!*** Just to split a file up! It's just JavaScript! Bonkers!

Then it hit me.

I could package up an entire gulp build pipeline in a similar way, that anyone could install it with npm, create a ***very*** barebones gulpfile, and leverage all the commands in the package for free! Absolutely free!

And when i say barebones, how about this for a gulpfile:

~~~js
var slushie = require('slushie');
// Override defaults here. It's as easy as just adding a drop of water!
var water = {};
slushie(water);
~~~

The config could be overridden wherever necessary to fit the needs, and boom! No need to setup a project or clone a boilerplate project/gulpfile down each time you setup. Just add a spot of water, and you're ready to go!

This is where Slushie was born!

It's still an early concept, so it's a little rough round the edges, and it might fall flat on its face, but I'm keen to give it a test drive, and I'd really like whoever reads this to give it a go, and provide feedback in the comments, and on the github issues page. Feature requests and pull requests are definitely welcome too!

The idea is to create a re-packaged pipeline that requires very little config and setting up by the end user to get going. No boilerplate, no nothing. Npm install, add 3 lines to a file, and boom! You're off!
