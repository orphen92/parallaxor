Parallaxor
=============

Parallaxor is a simple jQuery plugin which allows you to create beautiful parallax effects for your website with minimum code. It can be used to reposition any element, in any direction, inside a container, based on user's scroll.  
Current version is 0.10

Table of contents
-------------
* [Compatibility](#compatibility)
* [Requirements](#requirements)
* [How does it work](#how-does-it-work)
* [Installation and usage](#installation-and-usage)
* [Options](#options)
* [Examples](#examples)
* [License](#license)

Compatibility
-------------

I've only tested this plugin with latest desktop versions of Chrome 39.0.2171.95 (64-bit), Firefox 32.0.3, and Safari 8.0.2 (10600.2.5). I haven't tested this plugin on mobile devices.  
  
Please use the [tracker](https://github.com/alexandrubau/parallaxor/issues) to report any bugs. Thank you !

Requirements
-------------

This plugin requires [jQuery](http://jquery.com) v1.11.2+ but it might work on older versions too. Make sure you include jQuery before the plugin.

How does it work
-------------
Parallaxor uses the CSS property called `transform` in conjuction with `translate` to reposition the elements inside the container when the user scrolls.  
Example: `transform: translate(0, 100px)` - this CSS code will move an element to the right for 100px.

Installation and usage
-------------
Download [parallaxor.min.js](https://raw.githubusercontent.com/alexandrubau/parallaxor/master/jquery.parallaxor.min.js) and [parallaxor.min.css](https://raw.githubusercontent.com/alexandrubau/parallaxor/master/jquery.parallaxor.min.css).  
Add the following line into the HEAD section of your website:  
```html
<link href="parallaxor.min.css" rel="stylesheet">
```
Add the next lines at the end of the BODY section of your website, right before closing the tag:  
```html
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="parallaxor.min.js"></script>
```
Activate the script: 
```javascript
$('#mycontainer').parallaxor({
    top     : false,
    layers  : {
        'h1'  : {
            distance    : '200px',
            direction   : 'right'
        },
        'h1, h2.mytitleclass' : {
            distance    : '100px',
            direction   : 'left'
        }
    }
});
```

Options
-------------
`top {bool|int}(default:true)`  
Represents the distance from the top of the browser after which the layers start moving.  

Here you have 3 cases:  
1. Parallax container is glued on the top of the browser, without any pixels in between your container and the top of the browser you can set this to `true` or `0` or `0px` ( see [first](#examples) example ).  
2. Parallax container is, for example, 100px from the top of the browser you can set this option to `100px` or `100`.  
3. If you want the layers inside the container to move as soon as the container is inside the view range of the browser set this option to `false` ( see [second](#examples) example ).  

`layers {object}(default:{})`  
Object holding all the layers that you want to move inside the container. The **key** must be a CSS selector of one or many children inside the container and the **value** must be an object holding any of the layer properties specified below.  

  `layer_properties {object}(default:{ distance: '100%', direction: 'down' })` - In here you can specify how much the layer should move and in which direction. The **distance** represents how much you would like the layer to move inside the container when the container is inside the view range ( the user can see it in the browser ). It can be expressed in **pixels** or **percentage**. As a general rule, when you have elements that are bigger than container ( such as images ) you should use percentage. The **direction** can have 4 values: up, down, left, right.

Examples
-------------
* [First](http://alexandrubau.github.io/parallaxor/examples/first/index.html)
* [Second](http://alexandrubau.github.io/parallaxor/examples/second/index.html)

License
-------------
Released under the [GNU General Public License]( http://www.gnu.org/copyleft/gpl.html ).
