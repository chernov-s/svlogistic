(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, Math, undefined) {

    $(document).ready(function () {

        //=require include/*.js

        var App = (function ($) {

            var debug = true;

            return {
                init: function () {
                    Navigation.init();

                    Scroll.init();

                    /*================================================
                     SLICK
                     https://github.com/kenwheeler/slick
                     =================================================*/

                    $('.slick-items').slick({
                        autoplay: true,
                        autoplaySpeed: 10000,
                        dots: true
                    });
                },

                /** @type {function(...*)} */
                log: function () {
                    if (debug)
                        console.log.apply(console, arguments)
                }
            }
        })($);
        App.init();
    });
});