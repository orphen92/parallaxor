Parallaxor - v0.1
=============

Parallaxor is a simple jQuery plugin which allows you to create beautiful parallax effects for your website with minimum code. It can be used to reposition any kind of element, in any direction, inside a container, based on user's scroll.  

Table of contents
-------------
* [Compatibility](#compatibility)
* [How does it work ?](#how-does-it-work-)
* [Installation](#installation)
* [Options](#options)
* [Examples](#examples)
* [License](#license)

Compatibility
-------------

I've only tested this plugin with latest desktop versions of Chrome 39.0.2171.95 (64-bit), Firefox 32.0.3, and Safari 8.0.2 (10600.2.5). I haven't tested this plugin on mobile devices.  
  
Please use the [tracker](https://github.com/alexandrubau/parallaxor/issues) to report any bugs. Thank you !

How does it work ?
-------------
Parallaxor uses the CSS property called `transform` in conjuction with `translate` to reposition the elements inside the container when the user scrolls. Example: `transform: translate(0, 100px)` - this CSS code will move an element to the right for 100px. It is important for the container to have the CSS properties provided here ( [parallaxor.min.css](https://raw.githubusercontent.com/alexandrubau/parallaxor/master/jquery.parallaxor.min.css) ) so don't forget to include the CSS file.

Installation
-------------
Download [parallaxor.min.js](https://raw.githubusercontent.com/alexandrubau/parallaxor/master/jquery.parallaxor.min.js) and [parallaxor.min.css](https://raw.githubusercontent.com/alexandrubau/parallaxor/master/jquery.parallaxor.min.css).  
Add the following line into the HEAD section of your website:  
```html
<link href="parallaxor.min.css" rel="stylesheet">
```
Add the next line at the end of the BODY section of your website, right before closing the tag:  
```html
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
        }
    }
});
```

Options
-------------
`top ( boolean - default: true )` - Determines if the layers inside the container should start moving after the container touches the top of the user's browser. This is useful if you use the parallax effect inside the header of your website.  
`layers ( object - default: {} )` - Object holding all the layers that you want to move inside the container. The **key** must be a CSS selector of one or many children inside the container, and the **value** must be an object holding any of the layer properties.  
`layer properties ( object - default: { distance: '100%', direction: 'down' } )` - In here you can specify how much the layer should move and in which direction. The **distance** represents how much you would like the layer to move inside the container when the container is inside the view range ( the user can see it in the browser ). It can be expressed in **pixels** or **percentage**. As a general rule, when you have elements that are bigger than container ( such as images ) you should use percentage. The **direction** can have 4 values: up, down, left, right.
  
Example:  
```javascript
$('#mycontainer').parallaxor({
    top     : false,
    layers  : {
        'img' : {
            distance    : '100%',
        },
        'h1, h2.mytitleclass' : {
            distance    : '100px',
            direction   : 'left'
        }
    }
});
```

Examples
-------------
For live examples check [here](http://www.commingsoon.com) ( comming soon ).

License
-------------
Released under the GNU General Public License ( http://www.gnu.org/copyleft/gpl.html ).
