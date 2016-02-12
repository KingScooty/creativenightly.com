---
title: How to lint your Sass/CSS properly with Stylelint
subtitle: What is linting? Why should we lint our stylesheets? Linting helps reduce silly errors in codebases, and improves coding quality by enforcing good coding rules, and practices.
draft: true
---

Stylesheet linting. Not many people do it. Many more people should---especially diverse teams that have a lot of hands touching the codebase.

In this article I'm going to talk about *why* we should lint our stylesheets, and *how* to implement stylesheet linting into our build pipelines for both vanilla CSS and Sass.

<!--more-->

Table of contents:

1. [Introduction](#introduction)
    1. [What is linting?](#what-is-linting)
    2. [Why should we lint our stylesheets?](#why-should-we-lint-our-stylesheets)
2. [Introducing Stylelint](#introducing-stylelint)
    1. [How to lint your CSS](#how-to-lint-your-css)
    2. [How to lint your Sass](#how-to-lint-your-sass)
3. [Extending Stylelint with plugins](#extending-stylelint-with-plugins)
    1. [Case study: Linting in practice](#case-study-linting-in-practice)

-----

##Introduction

###What is linting?

Linting is the process of checking the source code for Programmatic as well as Stylistic errors. This is most helpful in identifying some common and uncommon mistakes that are made during coding. They're essentially a spell checker for programming languages. While linting is useful when working alone, they really pay dividends when working in teams: where many (careless) hands touch the code.

A Lint---or a Linter---is a program or tool that supports linting (verifying code quality). They are available for most languages like C, Python, JavaScript, CSS,  etc.

###Why should we lint our stylesheets?

There are many reasons to lint stylesheets. It maintains code consistency, it highlights errors in the codebase, it helps reduce unnecessary code, and it also helps prevent lazy coding.

Let's take a look at a couple of examples.

~~~css
.no-space {
    display:block;
}           ⬆

.no-semicolon {
    position: relative ⬅
}
~~~

Linters are very good at spotting stylistic issues like these. Setting up stylistic linting rules aren't essential, but they help keep the code consistent. Also, I don't know about you, but these 2 stylistic errors above are a pet peeve of mine.

~~~css
.invalid-hex {
    color: #FFF00G;
}                ⬆
~~~

They're also very good at spotting errors like invalid hex colours, which may have resulted from a type error. Errors like this are capable of breaking important visual styling if not caught.

~~~css
.unnecessary-prefixes {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
~~~

There are a fair few CSS3 rules that don't need to be prefixed anymore in order to work. Linting spots these rules and helps to remove unnecessary and deprecated code. Linting prefixes is especially useful when paired with [Autoprefixer](https://github.com/postcss/autoprefixer){:target="\_blank"}---this lets you remove all prefixes, and only insert the ones you require for your target audience.

~~~css
.duplicate-rule {
    display: block;
    transition: opacity .2s;
    color: #444;
    background-color: #eee;
    transition: background-color .4s; ⬅
}
~~~

Duplicate rules are a common form of erroneous code. What if the developer meant for both opacity *and* background-colour to be transitioned? In the case above, the opacity transition is lost. Linting would highlight this error.

Convinced yet? If you are, great! Let's get you setup in the next section. If you're not, keep reading, and I'm sure I can convince you.


##Introducing Stylelint

[Stylelint](http://stylelint.io/){:target="\_blank"} is the latest and greatest in CSS linting; what's more, because it's powered by JavaScript instead of Ruby, it's much, *much* faster than [scss-lint](https://github.com/brigade/scss-lint){:target="\_blank"}.

> Stylelint is a mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.

It can handle both Sass and vanilla CSS linting, thanks to its [PostCSS](https://github.com/postcss/postcss){:target="\_blank"} underpinnings, and this is what makes it super cool.

> PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

The mantra of PostCSS is do one thing, and one thing well; so it's all about plugins. There's currently more than 200 plugins available for PostCSS, and because they're all written in JavaScript, they run *rapid fast*!


###How to lint your CSS

Let's start with linting vanilla CSS stylesheets. You'll need to install `gulp-postcss`, `postcss-reporter`, and `stylelint`. Let's do that now.

~~~sh
npm install gulp-postcss postcss-reporter stylelint --save-dev
~~~

The

~~~javascript
var gulp        = require('gulp');

var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var stylelint   = require('stylelint');

gulp.task("css-lint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "rule-no-duplicate-properties": true,
      "declaration-block-no-single-line": true,
      "rule-trailing-semicolon": "always",
      "selector-list-comma-newline-after": "always-multi-line",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      ['app/assets/css/**/*.css',
      '!app/assets/css/vendor/**/*.css']
    )
    .pipe(postcss(processors));
});
~~~

###How to lint your Sass

Linting Sass files is super easy with PostCSS. The only difference between linting CSS and Scss, is you need to make PostCSS understand the `.Scss` syntax, and that's as easy as installing `postcss-scss`, and changing one line in the task above.

~~~sh
npm install postcss-scss --save-dev
~~~

~~~javascript
  //[...]

  return gulp.src(
      ['app/assets/css/**/*.css',
      '!app/assets/css/vendor/**/*.css']
    )
    .pipe(postcss(processors), {syntax: syntax_scss});
});
~~~

Here's the setup in full:

~~~sh
npm install gulp-postcss postcss-reporter stylelint postcss-scss --save-dev
~~~

~~~javascript
var gulp        = require('gulp');

var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint   = require('stylelint');

gulp.task("scss-lint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "rule-no-duplicate-properties": true,
      "declaration-block-no-single-line": true,
      "rule-trailing-semicolon": "always",
      "selector-list-comma-newline-after": "always-multi-line",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      ['app/assets/css/**/*.css',
      '!app/assets/css/vendor/**/*.css']
    )
    .pipe(postcss(processors), {syntax: syntax_scss});
});
~~~

##Extending Stylelint with plugins

Just like PostCSS, Stylelint is extendable via plugins, which is awesome!

Let's run through a quick scenario where linting would help improve code readability, and help kick lazy devs up the butt when they try and hack an easy win into the codebase.

###Case Study: Linting in practice

####The project manager who likes to code

How about this for a scenario. A project manager is managing a new web app that's in development, and decides---in order to free up some valuable dev time on the project---to have a go at adding a feature. The feature is to add a box shadow to the hover state of a component, and to also add a hover state to the links of a child component.

*What's the worst that could happen?*

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">project manager: i know enough coding to be dangerous<br><br>*winks*<br><br>literally ruins entire codebase</p>&mdash; I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/696692323703336960">February 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Here is the code that the project manager adds to the project:

~~~sass
.component {
  position: relative;
  //[...]

  &:hover { ⬅
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);

    .component__child { ⬅
      li { ⬅
        a { ⬅
          &:hover { ⬅
            text-decoration: underline;
          }
        }
      }
    }
  }
}
~~~

Yuck!

####Selector nesting in Sass is bad---use a linter!

Selector nesting is a necessary evil when developing using Sass; it's really useful when used properly, and a one way trip to [specificity](https://css-tricks.com/specifics-on-css-specificity/){:target="\_blank"} hell if abused. Nesting is normally the result of lazy coding---and lazy coding results in code that is hard to read, and poorly written. The first `&:hover{...}` rule could be 10 lines below the parent component definition, making it really hard to decipher what it belongs to. However, more importantly, there nesting here is completely unnecessary.

This the CSS that the above rule compiles to:

~~~css
/* What the heck is this?! */
.component:hover .component_child li a:hover {}
~~~

If I worked on a team, and someone contributed something like this to the codebase, I'd be having serious, *serious* words.

The next dev that comes along and wants to override this cascading rule is going to have a tough time. With that in mind, I would advise against using nesting at all costs---unless you know what you're doing.

Lucky for us, there's a plugin for this! With Stylelint, we can set a max nesting limit to help swat away any nesting abuse.

~~~sh
npm install stylelint-statement-max-nesting-depth --save-dev
~~~

~~~javascript
gulp.task("scss-lint", function() {
  var stylelintConfig = {
    "plugins": [
      "stylelint-statement-max-nesting-depth"
    ],
    "rules": {
      //[...]
      "statement-max-nesting-depth": [3, { countAtRules: false }],
    }
  }

  //[..]
});
~~~

For teams that know what they're doing, i'd set the max limit to **3**. *(Set it lower for inexperienced teams)*.

With a max nesting limit set to 3, Stylelint would prompt the project manager to refactor the above code.

~~~sass
.component:hover {
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);

  .component__child {
    li {
      a:hover {
        text-decoration: underline;
      }
    }
  }  
}
~~~

This refactored version is much more readable, but still unacceptable. There is absolutely no need for any of this nesting! The linter knows this and forces the project manager to rethink their implementation in order to fix the build.

~~~sass
.component:hover {
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

.component__child {
  a:hover {
    text-decoration: underline;
  }
}  
~~~

If we set the max nesting limit to 2, the project manager would be forced to think even harder, and add a class to the anchor tag to remove even more nesting.

~~~sass
.component:hover {
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

.component__link:hover {}
~~~

Lovely! Without the build pipeline linting our stylesheets, and prompting for a refactor, this would never have been caught, and the codebase would gradually degrade in quality.

Hopefully by now I've convinced you that linting your stylesheets is a worthwhile investment. Linting is your friend. The investment is cheap, and it protects teams from the technical debt of a poorly written codebase.

Henceforth and lint!
