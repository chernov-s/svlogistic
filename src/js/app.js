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

                    $('.js-home-slick').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true
                    });

                    $('.js-review').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        customPaging : function(slider, i) {
                            //var thumb = $(slider.$slides[i]).data();
                            return '<a>' + (i+1) + '</a>';
                        }
                    });

                    $('.js-auto-park').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    });

                    $('.js-slick-about').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        customPaging : function(slider, i) {
                            var _date = $(slider.$slides[i]).data("year");
                            return '<button>' + _date + '</button>';
                        }
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