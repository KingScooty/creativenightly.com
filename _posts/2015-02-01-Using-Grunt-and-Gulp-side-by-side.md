---
layout: post
title: Using Grunt and Gulp together on the same project
subtitle: Sometimes, just sometimes, you need the power of both in the same project.
lastmod: 2015-02-01

cover_image: null

excerpt: "Sometimes, just sometimes,you need the power of both in the same project..."

author:
  name: Scotty Vernon
  twitter: KingScooty
  gplus: +ScottyVernon 
  bio: Founder, Software Engineer @ Wildflame Studios
  image: ks.png
---

***Disclaimer**: There are purists out there that will argue that [npm is perfectly capable doing what Grunt and Gulp do](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) (which I do agree with &ndash; to a point). Grunt and Gulp (and their plugins wrappers) are <s>fairly</s> very bloaty, but there's no denying what Grunt and Gulp provide in terms of ease of use and configuration.*

I'm a big fan of Gulp. It's much faster than Grunt (thanks to the use of streams to manipulate the data before outputting it to a file). Grunt, on the other hand, relies on a .tmp folder as a dumping place for files as they get transformed from plugin to plugin.

**However, due to this fact that Gulp is faster, I've fallen into the rather bad habbit of trying to do *everything* in Gulp, even if plugins have no support for it.**

##Why not use both together?

[Assemble](http://assemble.io) is a pretty rad static site generator &ndash; it follows similar principles to Ruby's Jekyll. The only problem is, the *stable* build only supports Grunt, *not Gulp*. The devs have an alpha build ([v0.5](https://github.com/assemble/assemble/tree/v0.5.0), and [v0.6](https://github.com/assemble/assemble/tree/v0.6.0)) that support Gulp, but it's unstable and still has *a lot* of features that aren't wired up.

So after about 2 months of struggling to get Assemble configured to behave *properly* with Gulp on various projects, I decided to just go back to using it with Grunt, and already, it's made **such a difference**!

###Using Assemble with Gulp (*the proper way*)

As you've probably guessed by this point, all of my tasks and watch tasks are wired up using Gulp. This poses a tricky situation when it comes to getting my Assemble Grunt task wired up nicely with the rest of my Gulp watch tasks; and since configuring Assemble directly in Gulp is not an option, we need a new solution.

####Introducing gulp-grunt

Not wanting to spend too much time getting everything wired up, I started searching for something that would help me link the two build tools together. Introducing [gulp-grunt](https://github.com/gratimax/gulp-grunt) a tool that will allow for running grunt tasks from gulp.

####So far so good! 

I've only been testing this workflow out for a few hours, but it's definitely an improvement &ndash; especially when working with Assemble or any other plugin that doesn't support Gulp (*e.g. rsync*).

**Here's an example** of getting a Grunt Assemble task wired into Gulp for watching and updating the browser with browsersync.
(*You'll notice that I've namespaced my Grunt tasks to avoid them clashing with anything in Gulp, so my Assemble task is **grunt-assemble***):


{% gist ffa08f15ab087d84d79d %}
