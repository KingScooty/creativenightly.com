---
title: How to lint your Sass/CSS properly with Stylelint
subtitle: Linting helps reduce silly errors in codebases, and improves coding quality by enforcing good coding rules, and practices.
draft: true
---

Similarly to how there's more than one way to skin a cat\*, there's also many different ways to lint your stylesheets, and some of the methods are much better than others. But first, let's cover what linting actually is, and some reasons *why* we should lint our stylesheets.

##Introduction

###What is linting?

ng coding. While linting is useful when working alone, they really pay dividends when working in teams: where many (careless) hands touch the code.

A Lint or a Linter is a program or tool that supports linting (verifying code quality). They are available for most languages like C, Python, JavaScript, CSS,  etc.

###Why should we lint our stylesheets?


~~~css
.no-space {
    display:block;
}           ⬆
~~~

~~~css
.no-semicolon {
    display: flex ⬅
}
~~~

~~~css
.invalid-hex {
    color: #FFF00G;
}                ⬆
~~~


~~~css
.unnecessary-prefixes {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
~~~

~~~css
.duplicate-rule {
    display: block;
    transition: opacity .2s;
    color: #f90;
    background-color: 333;
    transition: background-color .3s; ⬅
}
~~~


##Introducing Stylelint

[Stylelint](http://stylelint.io/){:target="\_blank"} is the latest and greatest in CSS linting; what's more, because it's powered by JavaScript instead of Ruby, it's much, *much* faster than [scss-lint](https://github.com/brigade/scss-lint){:target="\_blank"}.

> Stylelint is a mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.

It can handle both Sass and vanilla CSS linting, thanks to its [PostCSS](https://github.com/postcss/postcss){:target="\_blank"} underpinnings, and this is what makes it super cool.

> PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

The mantra of PostCSS is do one thing, and one thing well; so it's all about plugins. There's currently more than 200 plugins available for PostCSS, and because they're all in they're all written in JavaScript, they're *rapid fast*!


##Linting your CSS

Let's start with linting vanilla CSS stylesheets.

##Linting your Sass

##Extending Stylelint with plugins

Just like PostCSS, Stylelint is extendable via plugins, which is awesome! Let's run through a quick scenario where linting would help improve code readability, and help kick lazy devs up the butt when they try and hack an easy win into the codebase.

###Selector nesting in Sass is bad---use a linter!

Selector nesting is a root evil when using Sass, it's a one way trip to specificity hell if abused. I would advise against using nesting at all costs, unless you know what you're doing. Lucky for us, there's a plugin for that! With Stylelint, we can set a max nesting limit to help swat away any misuse.

How about this for a scenario. A project manager 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">project manager: i know enough coding to be dangerous<br><br>*winks*<br><br>literally ruins entire codebase</p>&mdash; I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/696692323703336960">February 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

~~~sass
.component {
  position: relative;

  &:hover {
    .component__child {
      a {} ⬅
    }  
  }
}
~~~

Nesting results in lazy coding, which is hard to read. With a max nesting limit set to 3, Stylelint would prompt the user to refactor the above code.

~~~sass
.component:hover {
  .component__child {
    a {}
  }  
}
~~~

This refactored version is much more readable. We could even go a step further, and add a class to the anchor tag to remove even more nesting.

~~~sass
.component:hover {
  .component__link {}
}
~~~

Lovely! Without the build pipeline linting our code, and prompting for a refactor, we may never have tidied this up.

*** *Disclaimer: No cats were harmed writing this article.***
