---
title: "Using Bower install hooks to prep vanilla CSS components for SASS workflows"
subtitle: "An upgrade, and integration server safe method to include vanilla CSS components in your SASS workflow and build pipeline."

excerpt: "An upgrade, and integration server safe method to include vanilla CSS components in your SASS workflow and build pipeline."
---

Have you ever tried to import a vanilla CSS bower component into your SASS/SCSS workflow, with the intention of physically importing the contents of that file in to your main.scss file; only to find that the file is linked/referenced and ignored during the build process?

**Yes, *me too*. In fact, it happened again, just this morning!**

*The CSS file in question was Nicolas Gallagher's [normalize.css](http://necolas.github.io/normalize.css/). Now I know there are plenty of SCSS versions out there, but they normally try and do too much! Just let me physically import the CSS version into my main.scss file!

Of course we can just *rename* the offending CSS file so that it now immiates an SCSS file, but we don't want to have to do that each and every time someone clones the project, or integration builds the project!

**So *what* can we do to automate this?**

##Say hello to Bower install hooks!

Having a little read of the Bower documentation, I came across their [hook docs](https://github.com/bower/bower/blob/master/HOOKS.md). They're nifty little hooks that can run *before* or *after* an install, and *before* an uninstall. ***Awesome!***

What we can do with these hooks is *rename* the CSS file to an SCSS file after the component has installed, and boom! It's ready to work in our build pipeline!

###Example:
Checkout the following example. What we're doing here, is setting up a reference to a *postinstall* script in the *.bowerrc* file. In the *.bower-postinstall* file, we tell bower to rename normalize.css to normalize.scss. And this script will run after each install/upgrade!

{% gist 0022988332d617cf6098 %}

This is really neat, becuase it means you can upgrade your components, and you can use them on an integration server without having to rename them each time, or include them in your repository!

All that's left to do now, is import the component into your main.scss file, and you're away!

**Update 1:** If you're having any issues, make sure to run the following command in the terminal to ensure the file has the right permissions to run.

 ```
 chmod +x .bower-postinstall.sh
 ```
