Copyright 2015 KingScooty / Creative Nightly


##HOME

```
section.site-nav
  header
    #navigation
      a.brand
      a.home
      a

#yield
  .blog-cover

  section
    .container
      h1
      h3

      a
        i.icon.icon-twitter
      a
        i.icon.icon-rss

article.container
  
  section.index //repeat for each article
    img.avatar
    div
      h2.title
        a prefetch?
      p
      .meta
        address
        time

  section.pagination
    a.btn.btn-outline
    a.btn.btn-outline

footer.site-footer
  .container
    nav
      a
      a
      a

    nav.social
      a
        i.icon.icon-twitter.black
      a
        i.icon.icon-rss.black
    p

```

##POST
```
...

#yield
  .article-cover
    div
      img.image

  article
    .container
      header
        .meta
          address
            a rel="author"
          time
        h1.title
        h2.subtitle

      section
        .social

      footer
        address
```

-----

##Tools

- Susy - http://susy.oddbird.net/

##5 CSS Categories:

- Base
- Layout
- Module
- State
- Theme

###Base:
- a
- p
- h1:h6
- inputs

###Layouts:
- Site Header
- Site Body
- Site footer
- Home
- Post

###Modules:

- branding
- link nav
    - primary nav
    - secondary nav
- button
    - primary
    - secondary
- content block
    - header
    - body
    - footer
- media object
    - img
    - text
- social share strip

###States:

###Theme Rules:
