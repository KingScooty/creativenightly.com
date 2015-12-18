---
title: Visual tweaks and enhancements to improve workflow in Sublime Text
subtitle: By making a few simple tweaks, the user experience and workflow within Sublime Text 2 can be improved.
lastmod: 2013-02-13

excerpt: By making a few simple tweaks, the user experience and workflow within Sublime Text 2 can be improved.
---

Sublime Text is my editor of choice for an abundance of reasons, but one key one is it's customisability. I'm constantly tweaking settings to tailor Sublime Text to suit my personal taste. The following settings are my favourite ones.

###1. Improved sidebar with Sidebar Enhancements

[Sidebar Enhancements](https://github.com/titoBouzout/SideBarEnhancements/) enables various enhancements and right click options in the Sublime Text sidebar. Most notably, '**move to trash**', '**move**', '**reveal**', 'open with'.

Download the package [here](https://github.com/titoBouzout/SideBarEnhancements/) and install it.

###2. See git diff in Sublime Text gutter with GitGutter

I only recently came across this plugin. Originally, i had to resort to **git difftool** everytime i wanted to inspect any changes to staged files &ndash; a rather cumbersome process.

![screenshot](https://raw.github.com/jisaacks/GitGutter/master/screenshot.png)

With [GitGutter](https://github.com/jisaacks/GitGutter), new lines, modified lines, and deleted lines all show up in the gutter of Sublime Text.


###3. Change the caret (cursor) style

There's a few hidden settings for altering the caret style in Sublime Text 2. The default is **blink**, but we can make it gently fade in and out by entering the following into your config file (CMD + ,):

```
"caret_style": "phase"
```

There's also a setting for making the caret wider, this is quite a useful feature when taking screenshots.

```
"caret_style": "wide"
```

###4. Highlight current line

I'm a little surprised Sublime Text doesn't enable this one by default &ndash; as i'm always losing my current position in a file when switching files &ndash; but nevertheless, to highlight the current line, enter the following into your config file:

```
"highlight_line": true
```

###5. Show folding arrows

Code folding is great, but half the time i forget the feature is even there! Not to mention i hate the time wasted waiting for the arrows to show up when i hover over the gutter.

To have the gutter arrows permanently visible, enter the following into your config file:

```
"fade_fold_buttons": false
```

###6. Bold folder labels

This is another visual cue that should be enabled by default. I find navigating the sidebar **much** easier when the folders are bold.

```
"bold_folder_labels": true
```

-----

Sound off in the comments if you know of any other tricks to improving user workflow in Sublime Text 2 :)
