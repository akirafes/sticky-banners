/*!
 * jquery.fixer.js 0.0.3 - https://github.com/yckart/jquery.fixer.js
 * Fix elements as `position:sticky` do.
 *
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com/) | @yckart
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/07/02
 **/

;(function($, window) {

    var $win = $(window);
    var defaults = {
        gap: 0,
        horizontal: false,
        calculateGap: false,
        onSticky: $.noop,
        onSticky1: $.noop,
        onSticky2: $.noop,
    };


    var supportSticky = function(elem) {
        var prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'], prefix;
        while (prefix = prefixes.pop()) {
            elem.style.cssText = 'position:' + prefix + 'sticky';
            if (elem.style.position !== '') return true;
        }
        return false;
    };

    $.fn.fixer = function(options) {
        options = $.extend({}, defaults, options);
        options.pegado = false;
        options.despegado = true;
        var hori = options.horizontal,
            cssPos = hori ? 'left' : 'top';

        return this.each(function() {
            var style = this.style,
                $this = $(this),
                $parent = $this.parent();

            if(options.calculateGap !== false) {
                options.gap = options.calculateGap();
            }

            if (supportSticky(this)) {
                style[cssPos] = options.gap + 'px';
                return;
            }

            $win.on('scroll', function() {
                var scrollPos = $win[hori ? 'scrollLeft' : 'scrollTop'](),
                    elemSize = $this[hori ? 'outerWidth' : 'outerHeight'](),
                    parentPos = $parent.offset()[cssPos],
                    parentSize = $parent[hori ? 'outerWidth' : 'outerHeight']();
                if(options.calculateGap !== false) {
                    options.gap = options.calculateGap();
                }

                if (scrollPos >= parentPos - options.gap && (parentSize + parentPos - options.gap) >= (scrollPos + elemSize)) {
                    style.position = 'fixed';
                    style[cssPos] = options.gap + 'px';
                    if(options.pegado == false && options.despegado == true) {
                        options.onSticky(scrollPos);
                        options.pegado = true;
                        options.despegado = false;
                    }

                } else if (scrollPos < parentPos) {
                    style.position = 'absolute';
                    style[cssPos] = 0;
                    options.onSticky1(scrollPos);
                } else {
                    style.position = 'absolute';
                    style[cssPos] = parentSize - elemSize + 'px';
                    if(options.despegado == false && options.pegado == true) {
                        options.onSticky2(scrollPos);
                        options.despegado = true;
                        options.pegado = false;
                    }
                    //options.onSticky2();
                }
            }).resize();
        });
    };

}(jQuery, this));
