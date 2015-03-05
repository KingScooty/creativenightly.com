---
layout: post
title: "Using Bower install hooks to prep CSS components for SASS workflows"
subtitle: "An upgrade, and integration server safe method to include CSS components in your SASS workflow and build pipeline."

excerpt: "An upgrade, and integration server safe method to include CSS components in your SASS workflow and build pipeline."

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Creative Technologist @ Wildflame Studios
  image: ks.png
---

Have you ever tried to import a vanilla CSS bower component into your SASS/SCSS workflow, with the intention of including said file in your optimise and build pipeline; only to find that the file is linked and ignored during the build process? 

**Yes, *me too*. In fact, it happened again, just this morning!**

*The CSS file in question was Nicolas Gallagher's [normalize.css](http://necolas.github.io/normalize.css/). There's plenty of overcomplicated SCSS versions of this, but they're so unecessary! Just let me import the damn CSS version into my main.scss file! **ARGH!***

It should be something so simple! All I'm asking is for that CSS file to be *physically* imported and included in my main style pipeline. Yet, what happens is the file gets ignored during the build process, and *referenced*.

***Rant over***.


Of course we can just *rename* the offending CSS file so that it now immiates an SCSS file, but we don't want to have to do that each and every time someone clones the project, or integration builds the project!

**So *what* can we do?**

##Say hello to Bower install hooks!

Having a little read of the Bower documentation, I came across their [hook docs](https://github.com/bower/bower/blob/master/HOOKS.md). They're nifty little hooks that can run *before* or *after* an install, and *before* an uninstall. ***Awesome!***

What we can do with these hooks is *rename* the CSS file to an SCSS file after the component has installed, and boom! It's ready to work in our build pipeline!

###Example: 
Checkout the following example. What we're doing here, is setting up a reference to a *postinstall* script in the *.bowerrc* file. In the *.bower-postinstall* file, we tell bower to rename normalize.css to normalize.scss. And this script will run after each install/upgrade!

{% gist 0022988332d617cf6098 %}

This is really neat, becuase it means you can upgrade your components, and you can use them on an integration server without having to rename them each time, or include them in your repository!