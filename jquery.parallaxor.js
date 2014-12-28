/**
 * Parallaxor - v0.10
 * Simple jQuery plugin which allows you to create 
 * beautiful parallax effects for your website
 * https://github.com/alexandrubau/parallaxor
 *
 * Copyright 2014 Alexandru Bau
 * Released under the GNU General Public License
 * http://www.gnu.org/copyleft/gpl.html
 */
;(function($, window, document, undefined){

    /**
     * The name of the plugin
     * @type {String}
     */
    var plugin_name = 'parallaxor';

    /**
     * The plugin namespace
     * @type {String}
     */
    var namespace   = 'plugin_' + plugin_name;

    /**
     * Variable holding default settings for this plugin
     * @type {Object}
     */
    var setting_defaults = {
        top     : 0,
        layers  : {}
    };

    /**
     * Variable holding default settings for layers
     * @type {Object}
     */
    var layer_defaults   = {
        distance    : '100%',
        direction   : 'down'
    };

    /**
     * Variable holding css classes for elements
     * @type {Object}
     */
    var css_class = {
        container   : plugin_name + '-container',
        layer       : plugin_name + '-layer'
    };

    /**
     * The Plugin object constructor
     * @param {Object} element The jQuery element
     * @param {Object} options The options object passed
     */
    function Plugin(element, options){

        // remember reference for myself which will be needed later
        var me = this;

        // apply plugin default settings
        this.settings   = $.extend({}, setting_defaults, options);

        // apply layer default settings
        $.each(this.settings.layers, function(key, value){
            me.settings.layers[key] = $.extend({}, layer_defaults, value);
        });

        // remember the container and the layers
        this.container  = $(element);   // make sure is a jQuery object
        this.layers     = [];           // this will be built later, check init()

        // initialize the plugin
        this.init();
    }

    /**
     * Here we use $.extend in order to avoid Plugin.prototype conflicts
     */
    $.extend(Plugin.prototype, {
        init: function () {

            // remember reference for myself which will be needed later
            var me = this;

            // add css class to container
            this.container.addClass(css_class.container);

            // iterate through all the layers, save the settings in data and add css class
            $.each(this.settings.layers, function(selector, settings){
                $.merge(me.layers, me.container.find(selector).data(namespace + '_layer', settings).addClass(css_class.layer));
            });

            // start binding events
            $(document).on('scroll', $.proxy(this.onDocumentScroll, this));
            $(document).on('ready', $.proxy(this.onDocumentReady, this));
            $(window).on('resize', $.proxy(this.onWindowResize, this));
        },

        /**
         * Method used to retreive the scroll distance of the document
         * We use this function because on OS X the normal function could return negative values
         * @return {int}
         */
        getDocumentScrollTop: function(){
            var scrollTop = $(document).scrollTop();
            return scrollTop >= 0 ? scrollTop : 0;
        },

        /**
         * Method called after the document has been loaded
         */
        onDocumentReady: function(){
            this.moveLayers();
        },

        /**
         * Method called each time we scroll the document
         */
        onDocumentScroll: function(){
            this.moveLayers();
        },

        /**
         * Method called when we resize the window
         */
        onWindowResize: function(){
            this.moveLayers();
        },

        /**
         * Method called each time we want to move the layers
         * @return {[type]} [description]
         */
        moveLayers: function(){

            // remember reference for myself which will be needed later
            var me = this;

            // check if the container is in view range
            if( !this.isInVisualRange() ){
                return;
            }

            // check if the container is above the specified top value ( if exists )
            if( !this.isAboveTop() ){
                return;
            }

            var viewRange, viewScroll, viewPercentage;

            // should we start scrolling after the container reaches the top ?
            if( this.settings.top === 0 || this.settings.top ){
                viewRange   = this.container.outerHeight(),
                viewScroll  = this.getDocumentScrollTop() - this.container.offset().top + parseInt(this.settings.top);
            } else {
                viewRange   = $(window).height() + this.container.outerHeight(),
                viewScroll  = this.getDocumentScrollTop() - this.container.offset().top + $(window).height();
            }

            // calculate the view percentage
            viewPercentage  = (viewScroll * 100 / viewRange);

            // make sure no funny business is happening
            if( viewPercentage < 0 || viewPercentage > 100 ){
                return;
            }
            
            // iterate through all the layers and apply the corresponding options
            $.each(this.layers, function(undefined, layer){

                // make sure that layer is a jQuery object
                layer = $(layer);

                // extract data variable and hold it for later use
                var data = layer.data('plugin_' + plugin_name + '_layer'),
                    distance;

                // check if distance is procentual or pixel
                if( me.isPercentual(data.distance) ){
                    distance = parseInt(data.distance)/100 * (layer.outerHeight() - me.container.outerHeight());
                } else {
                    distance = parseInt(data.distance);
                }

                // determine transformation based on direction
                var css_transform;
                switch(data.direction){
                    case 'up':
                        css_transform = 'translate(0, -' + (viewPercentage/100 * distance) + 'px)';
                    break;
                    case 'left':
                        css_transform = 'translate(-' + (viewPercentage/100 * distance) + 'px, 0)';
                    break;
                    case 'right':
                        css_transform = 'translate(' + (viewPercentage/100 * distance) + 'px, 0)';
                    break;
                    default: // case 'down':
                        css_transform = 'translate(0, ' + (viewPercentage/100 * distance) + 'px)';
                    break;
                }

                // apply the css style
                layer.css('transform', css_transform);
            });
        },

        /**
         * Method used for checking if the container is in visual range
         * @return {Boolean} 
         */
        isInVisualRange: function(){
            if( 
                this.container.offset().top + this.container.outerHeight() >= this.getDocumentScrollTop()
                &&
                this.getDocumentScrollTop() >= this.container.offset().top - $(window).height()
            ){
                return true;
            }
            return false;
        },

        /**
         * Checks if character % is found in the string
         * @param  {String}  distance The string to be examined
         * @return {Boolean}
         */
        isPercentual: function(distance){
            return distance.slice(-1) == '%';
        },

        /**
         * Method used for checking if the container is above the specified top value ( if exists )
         * @return {Boolean}
         */
        isAboveTop: function(){
            return this.getDocumentScrollTop() + parseInt(this.settings.top) > this.container.offset().top;
        }
    });

    /**
     * A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
     */
    $.fn[plugin_name] = function(options){

        this.each(function(){
            if( $.data(this, namespace) ){
                return true;
            }
            $.data(this, namespace, new Plugin(this, options));
        });
        
        return this; // chain jQuery functions
    };

})(jQuery, window, document);