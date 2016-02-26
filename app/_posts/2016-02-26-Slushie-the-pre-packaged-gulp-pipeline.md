---
title: Slushie, the pre-packaged gulp pipeline that just works
subtitle: Literally an entire Gulp pipeline for free, just add water.
---

A few days ago, I was working on a development pipeline tool for the Live team at BBC Sport. A tool that will essentially hook into their existing development pipeline, and provide a *pre-opinionated* workflow for processing `Sass` files. It's a fairly simple concept, but one that would hopefully give the front-end architects a chance to define a set of development rules in one place, and iterate on it, that the rest of the developers can leverage without having to worry about any finer details.

<!--more-->

We have a lot of developers on the team that don't want to have to worry about setting up a pipeline to handle Sass files for each and every component that is created---it's a detail that the championing front-end developers should take care of.

I have a tendency to write my pipeline tasks as simple functions, import them into a main file and *then* apply the gulp magic. It's a lot cleaner than faffing around with importing gulp tasks and sharing objects across files. It's also something I realised that not a lot of people are aware is possible. I've seen countless articles online of people trying to split their gulpfiles up, but doing it in the messiest of ways, and using plugins in order to try and achieve it. ***Plugins!*** Just to split a file up! It's just JavaScript! Bonkers!

Then it hit me.

I could package up an entire gulp build pipeline in a similar way, that anyone could install it with npm, create a ***very*** barebones gulpfile, and leverage all the commands in the package for free! Absolutely free!

The config could be overridden wherever necessary to fit the user's needs, and boom! No need to setup a project or clone a boilerplate project/gulpfile down each time you setup. Just add a spot of water, and you're ready to go!

This is where [Slushie](https://github.com/kingscooty/slushie){:target="\_blank"} was born!

~~~
npm install -g gulp
npm install slushie --save-dev
~~~

Create a `gulpfile.js` file in the base of your project, and add the following:

~~~js
var slushie = require('slushie');
slushie();
~~~

Slushie currently provides the following Sass related tasks to cover the entire workflow of development and output for production of stylesheets. The tasks include:

- Development
  - Linting
  - Sourcemaps
  - Autoprefixing
  - Watch
- Production
  - Linting
  - Autoprefixing
  - Optimisation *(Sorting, removing duplicates etc.)*
  - Minification

You should now be able to run `gulp`, `gulp watch`, `gulp sass:lint`, `gulp build:production`, and the tasks will automagically run! By default these tasks will look for any `.scss` files in the project, and output them into `/public`. The default config can be found [here](https://github.com/KingScooty/slushie/blob/master/defaults.js){:target="\_blank"}, and can be overridden by simply making changes to the `water` *(config)* object in your `gulpfile`;

~~~js
var slushie = require('slushie');
// Override defaults here. It's as easy as just adding a drop of water!
var water = {
  sass_development: {
    source: [
      'app/assets/scss/**/*.scss',
      '!app/assets/scss/**/_*.scss',
    },
    destination: './app/assets/css'
  }
};
slushie(water);
~~~

This is still an early concept, and for that reason, only Sass related tasks are bundled for now, but I'd really like whoever reads this to give it a go, and provide feedback in the comments, and on the [github issues](https://github.com/kingscooty/slushie/issues){:target="\_blank"} page. Feature requests and pull requests are definitely welcome too!

Slushie might be a silly idea, but I think there's definitely a place for tools like this. We have tools internally that handle the full pipeline (develop, build, test, deploy) in one neat one-click install package---The BBC Homepage team have a *beast* of a package written by [@minutz](https://twitter.com/mintuz){:target="\_blank"}, who I'm going to try and get on board for this project---but there doesn't seem to be anything like this in the open source world *(or at least, not that I've seen)*.

I know Slushie will save me a lot of time getting a simple pipeline setup without having to toy with boilerplate, and I'm sure there's a lot of you out there that feel the same!

<!--
The idea is to create a re-packaged pipeline that requires very little config and setting up by the end user to get going. No boilerplate, no nothing. Npm install, add 3 lines to a file, and boom! You're off!
-->
