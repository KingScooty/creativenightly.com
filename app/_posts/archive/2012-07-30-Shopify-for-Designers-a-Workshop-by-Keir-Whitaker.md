---
title: Shopify for Designers - A Workshop by Keir Whitaker
subtitle: Notes i took down from attending the Shopify for Designers workshop presented by Keir Whitaker.
lastmod: 2013-02-10

hide: true
---


These are the notes i took from the Shopify for Designers workshop by [Keir Whitaker](http://twitter.com/keir) in Birmingham on the 30th July 2012.

*Apologies if they're a bit of an incoherent mess, i was trying to type fast and listen simultaenously :)*

<!--more-->

Keir was aproached to do some outreach for Shopify in the UK. *This workshop was free*, which was quite a nice touch, and also good advertising for the platform.

The following notes cover Shopify's main features, what Shopify is good for, and what it's bad for, Shopify's file structure, the Liquid templating engine and some examples / helpful code snippets for various scenarios.

####Shopify Site Examples:

- [A Book Apart](http://abookapart.com)
- [United Pixel Workers](http://unitedpixelworkers.com)
	- Great custom checkout styles to override the 'not so great' Shopify default styles.
- [Hard Graft](http://hardgraft.com)
	- Custom JavaScript interactive browsing experience.
- [Dodo Case](http://dodocase.com)


**Slug** term in Wordpress === **Handle** term in Shopify

Handles can allow for customised templates to be used to alter the experience on different pages.

####Reserves words:

- Products
- Collections
- Carts

Image handling: Max size is 1024x1024.

####Shopify Restrictions

The only restriction is the **Add to cart** form location.

####Product Variant Options

Options for variants of the same product. e.g. T-shirts.

- Colour
- Sizes

####Shopify as a Blogging Tool

Shopify is not that great for blogging - it offers *basic* functionality for blogging. Best example of its use is for a Press page - small snippets of text explaining what's new.

####JavaScript Customisation

Powerful API tools to allow for customisating the browser experience e.g. Variant options, Collection sorting etc.

####Collections

- Smart Collections - price, in stock, sold out (but a shipment is coming in)

####Partners Test Section

Throws in all the functionality one would ever need from a shop. Allows users to start fiddling about with the platform without having to pay for a license.

####Product features / fields

- Title
- URL & Handle - *Similar to the permalink field in Wordpress*
- WYSIWYG Editor
- Product properties / options
	- Product Type
	- Vendor
	- Size
- Tags
	- Custom Collections
		- Year for Music (1999)
		- Logical groupings for T-shirts
Collections
	- Front page collection to throw a product on the homepage.
- Inventory
	- SKUS
	- Weight

####Collections

- Title
- Description

*0-Many relationship - Products can be in as many or as little as 0 collections.*

####Smart Collections

Filters to determine what's in the selection - everything on sale in 1999 (product == sale in 1999).

####Page

- Template - page.FAQ, page.contact etc.

####Navigation

Custom nav lists equivalent to menus in Wordpress.

####Bundles

- Shopify Textmate Bundle - Allows you to edit and sync template files.
- Shopify Theme Tool - *In Beta so not available yet.*

####Theme Structures

- assets - *Basic dumping folder for stuff - **No nesting folders acceptable**.*
- config - *Used to offer more control to client in admin section.*
- layout
	- theme.liquid - *layout file - outerskin of the site e.g. base.html etc.*
- snippets - *include useful code snippets.*
- templates
	- 404.liquid
	- article.liquid - *blog detail page*
	- blog.liquid
	- cart.liquid
	- collection.liquid
	- index.liquid - *shop homepage*
	- page.liquid
	- product.liquid
	- search.liquid

####Layouts

Useful for injecting content into a base template that contains default elements used site-wide like, header and footer.

`{{ content_for_header }}` important hook for header.
`{{ content_for_layout }}` injects content into base layout.

##Liquid Templating Engine

####Output

{% highlight django %}
{% raw %}
{{ product.title }}
{{ product.price }}
{% endraw %}
{% endhighlight django %}

####Filters

*What goes in at the beginning, comes out altered at the end.*

{% highlight django %}
{% raw %}
{{ product.title | upcase }}
//Comes out as a string, turned into uppercase.

{{ 'logo.png' | asset_url | img_tag: 'Site Logo' }}
{{ 'style.css' | asset_url | stylesheet_tag }}
{% endraw %}
{% endhighlight django %}

####Logic

{% highlight django %}
{% raw %}
{% if product.available %}
Show Add to cart button here
{% else %}
Display message about when the product will be next available
{% endif %}

{% cycle 'one', 'two' %}
{% cycle 'one', 'two' %}
{% cycle 'one', 'two' %}

// one
// two
// one

// Operators == != > < >= <= or and

{% case handle %}
{% when 'cake' %}
This is a cake
{% else %}
This is not a cake
{% endcase %}
{% endraw %}
{% endhighlight django %}

####Loops

{% highlight django %}
{% raw %}
{% for image in product.images %}

{% if forloop.first %}

//Large first image.

{% else %}

//Small images for remaining items.

{% endif %}
{% endfor %}
{% endraw %}
{% endhighlight django %}

##Templates

####Variables

List of variables here on the [wiki page](http://wiki.shopify.com/Product.variables).

####Collection pagination

{% highlight django %}
{% raw %}
{% paginate collection.products by 12 %}

{% if collection.products.size == 0 %}

	<h1>No products, baby!</h1>

{% else %}

//Show products

{% if paginate.pages > 1 %}

	{{ paginate | default_pagination }}

{% endif %}
{% endraw %}
{% endhighlight django %}

####Feature Collections

Show products on homepage:

{% highlight django %}
{% raw %}
{% for product in collections.frontpage.products limit:3 %}
	//Show some products
{% endfor %}
{% endraw %}
{% endhighlight django %}

Special offers:

{% highlight django %}
{% raw %}
{% assign article = pages.frontpage %} //Assign variable by grabbing data from a page
{% if article.content != '' %}
	//Show some front page articles by injecting page data
{% endif %}
{% endraw %}
{% endhighlight django %}

####Theme Settings

Done by assiging variables to to name parameter on markup.

`name="text_color"`

####CSS.liquid - Dynamic CSS

{% highlight django %}
{% raw %}
body {
	color: {{ settings.text_color }};
	background-color: {{ settings.bg_color }};
}
{% endraw %}
{% endhighlight django %}

#### Alternate Layouts

{% highlight django %}
{% raw %}
{% layout bacon.liquid %}
{% endraw %}
{% endhighlight django %}

####Cart.js - cart JSON for sweet JS customisation

Going to `/cart.js` on a Shopify front end will give you access to a JSON file of the clients cart - nice for JavaScript dev customisation.

####Alternate "Add to Cart" methods

Cart Permalinks - use URLS to add items to a cart.

##The Shopify cheat sheet

The shopify cheat sheet is a fantastic little resource to have open when using Shopify's liquid templating engine.

[Shopify Cheat Sheet](http://cheat.markdunkley.com)
